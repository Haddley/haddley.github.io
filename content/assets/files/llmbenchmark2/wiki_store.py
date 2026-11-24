"""Part 7: keep the notes base up to date IN PLACE.
usage:
  wiki_store.py init                  build wiki_notes.json from the research agent's runs (one note per question id)
  wiki_store.py check                 re-fetch every cited page live; mark each note fresh, changed or unreachable
  wiki_store.py refresh               re-research only the changed notes and overwrite them (same id, old text kept in history)
  wiki_store.py simulate ID [ID...]   pretend the source changed for these notes (alters the stored quote), to test check and refresh
A note is never deleted by a check. A changed note keeps its old text in `history` until a person looks at it."""
import json,sys,os,re,time,hashlib,datetime
sys.argv_saved=list(sys.argv); sys.argv=['agent3.py','deepseek-flash','gate']
import agent3                      # reuse its page fetching and its research loop
from agent3 import norm,orig
sys.argv=sys.argv_saved
STORE='wiki_notes.json'; TODAY=datetime.date.today().isoformat()
def urls_of(tools):
    u=[]
    for name,a in tools:
        if name=='get_irc': u.append(f"https://www.law.cornell.edu/uscode/text/26/{str(a['section']).strip()}")
        elif name=='get_ucc': s=str(a['section']).strip(); u.append(f"https://www.law.cornell.edu/ucc/{s[0]}/{s}")
        elif name=='get_cfr': u.append(f"https://www.law.cornell.edu/cfr/text/{a['title']}/{str(a['section']).strip()}")
        elif name=='fetch_url': u.append(a['url'])
    return list(dict.fromkeys(u))
def cache_file(url): return 'cite_cache/page_'+re.sub(r'\W+','_',url)[:150]+'.txt'
def note_from(x,built):
    qs=[q for q in (x.get('quotes') or []) if isinstance(q,dict) and q.get('quote')][:2]
    urls=urls_of(x.get('tools') or []); keep=[]
    for u in urls:                      # keep only the pages whose text holds a quote: those are what can go stale
        c=cache_file(u)
        if os.path.exists(c) and any(norm(q['quote'][:300]) in norm(open(c).read()) for q in qs): keep.append(u)
    return {"i":x['i'],"verified":x['status']=='accepted',"rule":x['rule'].strip(),"quotes":[{"source":q.get('source',''),"quote":q['quote'][:300]} for q in qs],
            "urls":keep,"built":built,"checked":None,"state":"new","history":[]}
def load(): return json.load(open(STORE))
def save(s): json.dump(s,open(STORE,'w'),indent=1)
def init():
    f='agent_runs3/deepseek-flash__gate.jsonl'; built=datetime.date.fromtimestamp(os.path.getmtime(f)).isoformat()
    s={str(x['i']):note_from(x,built) for x in map(json.loads,open(f)) if x.get('rule')}
    save(s); print('notes',len(s),'with quotes',sum(1 for n in s.values() if n['quotes']))
def live(url):
    """Fetch a page fresh, bypassing the cache. Returns (text, status)."""
    c=cache_file(url); old=open(c).read() if os.path.exists(c) else None
    if os.path.exists(c): os.remove(c)
    t=agent3.page(url)
    if len(t)<80 and t.startswith(('NOT FOUND','ERROR','Blocked')):
        if old is not None: open(c,'w').write(old)   # keep the old copy
        return old,t
    return t,'ok'
def check():
    s=load(); pages={}; n_fresh=n_changed=n_unreach=0
    for k,n in s.items():
        if not n['quotes']: n['state']='no-quote'; n['checked']=TODAY; continue
        texts=[]
        for u in n['urls']:
            if u not in pages: pages[u]=live(u)
            t,st=pages[u]
            if st=='ok': texts.append(norm(t))
        if not texts: n['state']='unreachable'; n_unreach+=1
        else:
            allt=' '.join(texts); miss=[q['source'] for q in n['quotes'] if norm(q['quote']) not in allt]
            n['state']='changed' if miss else 'fresh'; n['missing']=miss
            if miss: n_changed+=1
            else: n_fresh+=1
        n['checked']=TODAY
    save(s); print(f'checked {len(pages)} pages: fresh {n_fresh}, changed {n_changed}, unreachable {n_unreach}, no quote {sum(1 for n in s.values() if n["state"]=="no-quote")}')
def refresh():
    s=load(); agent3.out='wiki_refresh_runs.jsonl'; ch=[k for k,n in s.items() if n['state']=='changed']
    for k in ch:
        n=s[k]; r=agent3.work(int(k)); new=note_from(r,TODAY)
        if not new['rule']: print('refresh failed for',k,'(old note kept)'); continue
        new['history']=n['history']+[{"replaced":TODAY,"rule":n['rule'],"quotes":n['quotes'],"was_verified":n['verified']}]
        new['state']='refreshed'; new['checked']=TODAY; s[k]=new
        print('refreshed',k,'verified' if new['verified'] else 'unverified','| old rule:',n['rule'][:70],'| new rule:',new['rule'][:70])
    save(s); print('refreshed',len(ch),'notes in place')
def simulate(ids):
    s=load()
    for k in ids:
        n=s[str(k)]; n['quotes'][0]['quote']='[simulated change] '+n['quotes'][0]['quote']; print('altered note',k)
    save(s)
if __name__=='__main__':
    c=sys.argv[1]
    {'init':init,'check':check,'refresh':refresh}.get(c,lambda:simulate(sys.argv[2:]))()
