"""Citation experiment. usage: run_cite.py MODEL
Asks each model the 40 law and tax questions and to name the authority it relied on."""
import json,sys,os,time,urllib.request
model=sys.argv[1]
orig=json.load(open('orig.json')); ids=json.load(open('cite_ids.json'))
INSTR=("Think it through briefly, then end your reply with exactly two final lines.\n"
       "ANSWER: X (where X is A, B, C or D)\n"
       "AUTHORITY: the specific statute, section, regulation or standard you relied on, for example 'IRC section 1015' or 'UCC 2-205'. Name only authority that you are sure exists.")
out=f"cite_runs/{model.replace('/','_').replace(':','_')}.jsonl"
os.makedirs('cite_runs',exist_ok=True)
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
    for i in ids:
        if i in done: continue
        o=orig[i]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
        t=time.time()
        try: txt=call(f"{o['question']}\n\nOptions:\n{opts}\n\n{INSTR}")
        except Exception as e: txt=""
        f.write(json.dumps({"i":i,"key":'ABCD'[o['answer']],"text":txt,"secs":round(time.time()-t,1)})+"\n"); f.flush()
print('done',model)
