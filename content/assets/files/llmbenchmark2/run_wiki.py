"""Part 6 test. usage: run_wiki.py MODEL ARM   ARM: none | wiki (verified notes) | wikiall (verified and unverified notes) | control (notes found for a different question)
MODEL: an Ollama model, or deepseek:deepseek-flash. Runs the held-out half of split.json only."""
import json,sys,os,time,urllib.request,random
sys.path.insert(0,'.')
from wiki_lib import *
model,arm=sys.argv[1],sys.argv[2]
test=split['test']
notes=build_notes(); ver=[n for n in notes if n['verified']]
R={'wiki':Retriever(ver),'control':Retriever(ver),'wikiall':Retriever(notes)}
INSTR="Think it through briefly, then end your reply with a final line in exactly this form: ANSWER: X (where X is A, B, C or D)."
out=f"wiki_runs/{model.replace('/','_').replace(':','_')}__{arm}.jsonl"; os.makedirs('wiki_runs',exist_ok=True)
done={json.loads(l)['i'] for l in open(out)} if os.path.exists(out) else set()
def key():
    k=os.environ.get("DEEPSEEK_API_KEY")
    if k: return k
    for l in open(os.path.expanduser("~/Documents/GitHub/llm-accounting-benchmark/.env")):
        if l.startswith("DEEPSEEK_API_KEY="): return l.split("=",1)[1].strip().strip('"\'')
def call(prompt):
    if model.startswith("deepseek:"):
        body={"model":model.split(":",1)[1],"messages":[{"role":"user","content":prompt}],"max_tokens":32000,"temperature":0}
        req=urllib.request.Request("https://api.deepseek.com/chat/completions",json.dumps(body).encode(),{"Content-Type":"application/json","Authorization":"Bearer "+key()})
        return json.load(urllib.request.urlopen(req,timeout=1800))["choices"][0]["message"].get("content") or ""
    body={"model":model,"messages":[{"role":"user","content":prompt}],"stream":False,"options":{"temperature":0,"seed":1,"num_predict":int(os.environ.get('NUM_PREDICT','12000'))}}
    req=urllib.request.Request("http://localhost:11434/api/chat",json.dumps(body).encode(),{"Content-Type":"application/json"})
    return json.load(urllib.request.urlopen(req,timeout=3600))["message"].get("content","")
with open(out,'a') as f:
    for n,i in enumerate(test):
        if i in done: continue
        o=orig[i]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices'])); note=""; used=[]
        if arm in R:
            j=test[(n+1)%len(test)] if arm=='control' else i
            used=R[arm].top(j,3)
            note="Background notes, found by searching a notes base. They may not apply to this question; use them only if they do:\n"+"\n".join(render(x) for x in used)+"\n\n"
        t=time.time()
        try: txt=call(f"{note}{o['question']}\n\nOptions:\n{opts}\n\n{INSTR}")
        except Exception as e: txt=""
        f.write(json.dumps({"i":i,"key":'ABCD'[o['answer']],"text":txt,"secs":round(time.time()-t,1),"notes":[x['i'] for x in used]})+"\n"); f.flush()
print('done',model,arm)
