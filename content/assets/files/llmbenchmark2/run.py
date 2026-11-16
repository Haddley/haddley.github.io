"""Run MMLU professional accounting (282 questions) through Ollama. usage: run.py MODEL MODE [limit]
MODE direct: reply with one letter. MODE reason: brief reasoning then 'ANSWER: X'."""
import json,sys,time,re,urllib.request,os
model,mode=sys.argv[1],sys.argv[2]; limit=int(sys.argv[3]) if len(sys.argv)>3 else 0
orig=json.load(open('orig.json'))
out=f"runs/{model.replace('/','_').replace(':','_')}__{mode}.jsonl"
os.makedirs('runs',exist_ok=True)
done={json.loads(l)['i'] for l in open(out)} if os.path.exists(out) else set()
INSTR={'direct':"Reply with only the letter of the correct option (A, B, C or D) and nothing else.",
       'reason':"Think it through briefly, then end your reply with a final line in exactly this form: ANSWER: X (where X is A, B, C or D)."}[mode]
def deepseek_key():
    k=os.environ.get("DEEPSEEK_API_KEY")
    if k: return k.strip()
    p=os.path.expanduser("~/Documents/GitHub/llm-accounting-benchmark/.env")
    if os.path.exists(p):
        for l in open(p):
            if l.startswith("DEEPSEEK_API_KEY="): return l.split("=",1)[1].strip().strip('"').strip("'")
    return None
def call_deepseek(prompt,num_predict):
    key=deepseek_key()
    if not key: sys.exit("DEEPSEEK_API_KEY not set (environment or llm-accounting-benchmark/.env)")
    name=model.split(":",1)[1]
    body={"model":name,"messages":[{"role":"user","content":prompt}],"max_tokens":num_predict}
    body["temperature"]=0
    if mode=="direct": body["thinking"]={"type":"disabled"}
    req=urllib.request.Request("https://api.deepseek.com/chat/completions",json.dumps(body).encode(),{"Content-Type":"application/json","Authorization":"Bearer "+key})
    r=json.load(urllib.request.urlopen(req,timeout=1800))
    return {"message":{"content":r["choices"][0]["message"].get("content") or "","thinking":r["choices"][0]["message"].get("reasoning_content") or ""},"eval_count":r.get("usage",{}).get("completion_tokens")}
def call(prompt,num_predict,think):
    if model.startswith("deepseek:"):
        return call_deepseek(prompt,num_predict if mode=="direct" else 8000)
    body={"model":model,"messages":[{"role":"user","content":prompt}],"stream":False,"options":{"temperature":0,"seed":1,"num_predict":num_predict}}
    if think is not None: body["think"]=think
    req=urllib.request.Request("http://localhost:11434/api/chat",json.dumps(body).encode(),{"Content-Type":"application/json"})
    return json.load(urllib.request.urlopen(req,timeout=1800))
n=0
with open(out,'a') as f:
    for i,o in enumerate(orig):
        if limit and n>=limit: break
        n+=1
        if i in done: continue
        opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
        prompt=f"{o['question']}\n\nOptions:\n{opts}\n\n{INSTR}"
        t=time.time()
        try:
            think=False if mode=='direct' else None
            try: r=call(prompt,12 if mode=='direct' else int(os.environ.get('NUM_PREDICT','1500')),think)
            except urllib.error.HTTPError as e:
                r=call(prompt,12 if mode=='direct' else int(os.environ.get('NUM_PREDICT','1500')),None)
            txt=r['message'].get('content','')
            rec={"i":i,"key":'ABCD'[o['answer']],"text":txt,"thinking_len":len(r['message'].get('thinking','') or ''),"tokens":r.get('eval_count'),"secs":round(time.time()-t,1)}
        except Exception as e:
            rec={"i":i,"key":'ABCD'[o['answer']],"text":"","error":str(e)[:200]}
        f.write(json.dumps(rec)+"\n"); f.flush()
print('done',model,mode)
