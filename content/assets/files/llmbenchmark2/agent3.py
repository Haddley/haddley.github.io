"""Wiki builder (Part 6). usage: agent3.py deepseek-flash gate [workers]
Runs the research agent on the build half of split.json and stores, for each accepted answer, a note: the general rule, the sources and the verified quotes. The answer key is never shown to the agent.
Research agent (from agent2.py). usage: agent.py MODEL ARM [workers]
MODEL: deepseek-flash or deepseek-v4-pro (hosted).
ARM:   research  accept the first final answer
       gate      a verifier may reject an answer, even a correct one, that its sources do not establish convincingly
       oracle    the answer key says 'wrong' and the agent researches again (a ceiling, not a method you can deploy)
The agent starts from the model's own one-letter answer, then reads primary sources (IRC, UCC, CFR) through tools."""
import json,sys,os,re,html,time,urllib.request,urllib.parse,urllib.error,threading
from concurrent.futures import ThreadPoolExecutor
model=sys.argv[1]; arm=sys.argv[2]; workers=int(sys.argv[3]) if len(sys.argv)>3 else 6
HOSTED=model.startswith('deepseek-')
verifier='deepseek-v4-pro' if model=='deepseek-flash' else 'deepseek-flash'
TOOL_BUDGET=8; MAX_ROUNDS={'research':1,'gate':3,'gatestrict':3,'oracle':3}[arm]
orig=json.load(open('orig.json')); _s=json.load(open(os.environ.get('IDS_FILE','agent_ids2.json'))); ids=json.load(open('split.json'))['build']; GROUP={i:'build' for i in ids}
_stem=('deepseek_'+model) if HOSTED else model.replace('/','_').replace(':','_')
direct={json.loads(l)['i']:json.loads(l) for l in open(f'runs/{_stem}__direct.jsonl')}
out=f"agent_runs3/{model.replace(':','_')}__{arm}.jsonl"; os.makedirs('agent_runs3',exist_ok=True); os.makedirs('cite_cache',exist_ok=True)
done={json.loads(l)['i'] for l in open(out)} if os.path.exists(out) else set()
lock=threading.Lock()
def key():
    k=os.environ.get("DEEPSEEK_API_KEY")
    if k: return k
    for l in open(os.path.expanduser("~/Documents/GitHub/llm-accounting-benchmark/.env")):
        if l.startswith("DEEPSEEK_API_KEY="): return l.split("=",1)[1].strip().strip('"\'')
K=key()
def ollama(m,messages,tools,max_tokens):
    conv=[]
    for x in messages:
        y=dict(x)
        if y.get('tool_calls'):
            y['tool_calls']=[{"function":{"name":t['function']['name'],"arguments":json.loads(t['function']['arguments'] or '{}')}} for t in y['tool_calls']]
        if y['role']=='tool': y={"role":"tool","content":y['content'],"tool_name":y.get('tool_name','')}
        y.pop('reasoning_content',None); conv.append(y)
    body={"model":m,"messages":conv,"stream":False,"options":{"temperature":0,"seed":1,"num_predict":max_tokens}}
    if tools: body["tools"]=tools
    if m.startswith('qwen3'): body["think"]=False
    try: r=json.load(urllib.request.urlopen(urllib.request.Request("http://localhost:11434/api/chat",json.dumps(body).encode(),{"Content-Type":"application/json"}),timeout=600))
    except Exception as e: r={"message":{"content":""},"prompt_eval_count":0,"eval_count":0}
    mm=r['message']; tc=[{"id":f"call_{k}","type":"function","function":{"name":t['function']['name'],"arguments":json.dumps(t['function'].get('arguments') or {})}} for k,t in enumerate(mm.get('tool_calls') or [])]
    msg={"role":"assistant","content":mm.get('content') or ''}
    if tc: msg["tool_calls"]=tc
    return {"choices":[{"message":msg}],"usage":{"total_tokens":(r.get('prompt_eval_count') or 0)+(r.get('eval_count') or 0)}}
def api(m,messages,tools=None,max_tokens=8000):
    if not m.startswith('deepseek-'): return ollama(m,messages,tools,max_tokens)
    messages=[{k:v for k,v in x.items() if k!='tool_name'} for x in messages]
    body={"model":m,"messages":messages,"max_tokens":max_tokens,"temperature":0}
    if tools: body["tools"]=tools
    for attempt in range(3):
        try:
            req=urllib.request.Request("https://api.deepseek.com/chat/completions",json.dumps(body).encode(),{"Content-Type":"application/json","Authorization":"Bearer "+K})
            return json.load(urllib.request.urlopen(req,timeout=900))
        except Exception as e: err=e; time.sleep(5)
    raise err
ALLOWED=('law.cornell.edu','ecfr.gov','irs.gov','sec.gov','govinfo.gov','uscode.house.gov','federalregister.gov','pcaobus.org','gao.gov','fasb.org','dart.deloitte.com','viewpoint.pwc.com')
def page(url,offset=0):
    host=urllib.parse.urlparse(url).netloc.lower()
    if not any(host==a or host.endswith('.'+a) for a in ALLOWED): return f'Blocked: only primary-source sites are allowed ({", ".join(ALLOWED)}).'
    f='cite_cache/page_'+re.sub(r'\W+','_',url)[:150]+'.txt'
    if os.path.exists(f): t=open(f).read()
    else:
        try:
            s=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read().decode('utf8','ignore')
            m=re.search(r'<main.*?</main>',s,re.S); s=m.group(0) if m else s
            s=re.sub(r'<script.*?</script>|<style.*?</style>','',s,flags=re.S); s=re.sub(r'<[^>]+>',' ',s)
            t=html.unescape(re.sub(r'\s+',' ',s)).strip()
        except urllib.error.HTTPError as e: t=f'NOT FOUND ({e.code})'
        except Exception as e: t='ERROR fetching page'
        open(f,'w').write(t); time.sleep(0.3)
    return t
def read(url,offset=0):
    t=page(url,offset)
    if len(t)<80 and (t.startswith('NOT FOUND') or t.startswith('ERROR') or t.startswith('Blocked')): return t
    return f"[characters {offset} to {min(offset+5000,len(t))} of {len(t)}]\n"+t[offset:offset+5000]
def run_tool(name,a):
    try:
        if name=='get_irc': return read(f"https://www.law.cornell.edu/uscode/text/26/{str(a['section']).strip()}",int(a.get('offset',0)))
        if name=='get_ucc': s=str(a['section']).strip(); return read(f"https://www.law.cornell.edu/ucc/{s[0]}/{s}",int(a.get('offset',0)))
        if name=='get_cfr': return read(f"https://www.law.cornell.edu/cfr/text/{a['title']}/{str(a['section']).strip()}",int(a.get('offset',0)))
        if name=='fetch_url': return read(a['url'],int(a.get('offset',0)))
        if name=='ecfr_search':
            u='https://www.ecfr.gov/api/search/v1/results?'+urllib.parse.urlencode({'query':a['query'],'per_page':5})
            r=json.load(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=30))
            return json.dumps([{"title":x['hierarchy']['title'],"section":x['hierarchy'].get('section'),"heading":x.get('full_text_excerpt','')[:200]} for x in r.get('results',[])])[:3000]
    except Exception as e: return f'tool error: {e}'
    return 'unknown tool'
def fn(name,desc,props,req): return {"type":"function","function":{"name":name,"description":desc,"parameters":{"type":"object","properties":props,"required":req}}}
TOOLS=[fn('get_irc','Read a section of the Internal Revenue Code (26 U.S.C.) from Cornell LII. Section number such as 1015.',{"section":{"type":"string"},"offset":{"type":"integer"}},["section"]),
 fn('get_ucc','Read a section of the Uniform Commercial Code from Cornell LII, such as 2-205 or 3-419.',{"section":{"type":"string"},"offset":{"type":"integer"}},["section"]),
 fn('get_cfr','Read a section of the Code of Federal Regulations from Cornell LII, for example title 26, section 1.1015-1.',{"title":{"type":"string"},"section":{"type":"string"},"offset":{"type":"integer"}},["title","section"]),
 fn('ecfr_search','Search the electronic CFR for regulations on a topic.',{"query":{"type":"string"}},["query"]),
 fn('fetch_url','Read a page from an allowed primary-source site (Cornell LII, eCFR, IRS, SEC, govinfo, uscode.house.gov, federalregister.gov, PCAOB, GAO, FASB, and the free technical guides of Deloitte DART and PwC Viewpoint).',{"url":{"type":"string"},"offset":{"type":"integer"}},["url"])]
SYSTEM=("You are an accounting and tax researcher. You answer a multiple-choice question by reading primary sources, not by memory. "
 f"You have {TOOL_BUDGET} tool calls in total. Prefer statutes and regulations. AICPA standards are behind a paywall, so look for the PCAOB, GAO, FASB and free professional guides that restate them. "
 "When you are ready, reply with JSON only, no other text: "
 '{"answer":"A|B|C|D","explanation":"two or three sentences","rule":"the general rule or standard that settles this kind of question, in one or two sentences, stated for any similar question and never mentioning the options or letters","quotes":[{"source":"citation","quote":"an exact passage copied from a page you read"}],"confidence":"high|medium|low"}. '
 "Every quote must be copied exactly from tool output you received. If the sources do not settle the question, say so in the explanation and give your best answer with low confidence.")
def norm(s): return re.sub(r'[^a-z0-9]+',' ',s.lower()).strip()
def parse(c):
    try: return json.loads(c[c.index('{'):c.rindex('}')+1])
    except Exception: return None
def gate(q,opts,ans,seen):
    quotes=[x for x in (ans.get('quotes') or []) if isinstance(x,dict) and x.get('quote')]
    good=[x for x in quotes if norm(x['quote']) and norm(x['quote']) in seen]
    if not good: return False,'none of your quotes appears in the pages you read. Quote the exact words of the source.',{}
    if arm=='gatestrict':
        crit="It is convincing only if the quoted sources, taken alone, establish the chosen option and rule out the other options."
    else:
        crit="It is convincing if the quoted sources support the chosen option and nothing in them contradicts it. It does not need to rule out every other option."
    prompt=(f"Question:\n{q}\n\nOptions:\n{opts}\n\nA researcher answered {ans.get('answer')} with this explanation: {ans.get('explanation')}\n\n"
      "Quotes from primary sources:\n"+"\n".join(f"- ({x.get('source')}) {x['quote']}" for x in good)+
      f"\n\nIs this convincing? {crit} "
      'Reply with JSON only: {"convincing": true|false, "reason": "one or two sentences", "missing": "what the researcher should look for next"}')
    j=None
    for attempt in range(3):
        try:
            r=api(verifier,[{"role":"user","content":prompt}],max_tokens=12000); j=parse(r['choices'][0]['message']['content'])
            if j is not None and 'convincing' in j: break
        except Exception: pass
        j=None
    if j is None: return True,'verifier error, accepted without review',{'error':True}
    return bool(j.get('convincing')),(str(j.get('reason',''))+' '+str(j.get('missing',''))).strip(),j
def work(i):
    o=orig[i]; q=o['question']; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices'])); keyl='ABCD'[o['answer']]
    from grade import letter
    first=letter(direct[i]['text'],'direct')
    msgs=[{"role":"system","content":SYSTEM},{"role":"user","content":f"{q}\n\nOptions:\n{opts}\n\nA quick first guess, with no research, is {first}. Treat it as unverified: keep it only if the sources support it."}]
    seen=''; used=[]; calls=0; rounds=0; tokens=0; log=[]; final=None; status='unresolved'
    for turn in range(40):
        r=api(model,msgs,TOOLS if (not HOSTED and calls<TOOL_BUDGET) or HOSTED else None); tokens+=r['usage']['total_tokens']; m=r['choices'][0]['message']
        am={"role":"assistant","content":m.get('content') or ''}
        if m.get('reasoning_content'): am["reasoning_content"]=m['reasoning_content']
        if m.get('tool_calls'): am["tool_calls"]=m['tool_calls']
        msgs.append(am)
        if m.get('tool_calls'):
            for tc in m['tool_calls']:
                if calls>=TOOL_BUDGET: res='Tool budget used up. Give your final JSON answer now.'
                else:
                    calls+=1
                    try: a=json.loads(tc['function']['arguments'] or '{}')
                    except Exception: a={}
                    res=run_tool(tc['function']['name'],a); used.append([tc['function']['name'],a]); seen+=' '+norm(res)
                msgs.append({"role":"tool","tool_call_id":tc['id'],"tool_name":tc['function']["name"],"content":res})
            continue
        ans=parse(m.get('content') or '')
        if not ans or str(ans.get('answer','')).upper() not in list('ABCD'):
            msgs.append({"role":"user","content":'Reply with the JSON object only.'}); continue
        ans['answer']=str(ans['answer']).upper(); final=ans; rounds+=1
        if arm=='research': status='accepted'; break
        if arm=='oracle':
            if ans['answer']==keyl: status='accepted'; break
            fb='That answer is incorrect.'
        else:
            ok,why,j=gate(q,opts,ans,seen); log.append({'round':rounds,'answer':ans['answer'],'convincing':ok,'why':why})
            if ok: status='accepted'; break
            fb=f'A reviewer did not accept that answer: {why}'
        if rounds>=MAX_ROUNDS: status='unresolved'; break
        msgs.append({"role":"user","content":f"{fb} Research further (tool calls left: {max(TOOL_BUDGET-calls,0)}) and give a revised JSON answer. Keep your answer if the sources support it."})
    rec={"group":GROUP[i],"i":i,"key":keyl,"first":first,"final":(final or {}).get('answer'),"status":status,"rounds":rounds,"tool_calls":calls,"tokens":tokens,
         "confidence":(final or {}).get('confidence'),"rule":(final or {}).get('rule'),"tools":used,"explanation":(final or {}).get('explanation'),"quotes":(final or {}).get('quotes'),"gate_log":log}
    with lock:
        with open(out,'a') as f: f.write(json.dumps(rec)+"\n")
    return rec
if __name__=='__main__':
    todo=[i for i in ids if i not in done]
    if len(sys.argv)>4: todo=todo[:int(sys.argv[4])]
    with ThreadPoolExecutor(workers) as ex: list(ex.map(lambda i:(lambda r:r)(work(i)),todo))
    print('done',model,arm)
