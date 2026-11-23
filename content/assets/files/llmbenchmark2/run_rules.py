"""Rules experiment. usage: run_rules.py MODEL ARM   (ARM: none | rule | control)
none = the question alone; rule = the question with a short note that states the relevant rule; control = the question with the note written for a different question."""
import json,sys,os,time,urllib.request,re
model,arm=sys.argv[1],sys.argv[2]
orig=json.load(open('orig.json')); rules=json.load(open('rules.json'))
ids=sorted(int(k) for k in rules)
INSTR="Think it through briefly, then end your reply with a final line in exactly this form: ANSWER: X (where X is A, B, C or D)."
out=f"rules_runs/{model.replace('/','_').replace(':','_')}__{arm}.jsonl"
os.makedirs('rules_runs',exist_ok=True)
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
    for n,i in enumerate(ids):
        if i in done: continue
        o=orig[i]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
        note=""
        if arm=="rule": note=f"Background note: {rules[str(i)]}\n\n"
        if arm=="control": note=f"Background note: {rules[str(ids[(n+1)%len(ids)])]}\n\n"
        t=time.time()
        try: txt=call(f"{note}{o['question']}\n\nOptions:\n{opts}\n\n{INSTR}")
        except Exception as e: txt=""
        f.write(json.dumps({"i":i,"key":'ABCD'[o['answer']],"text":txt,"secs":round(time.time()-t,1)})+"\n"); f.flush()
print('done',model,arm)
