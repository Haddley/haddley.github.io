"""Second judge: deepseek-v4-pro marks 60 random answers that gemma4:12b already judged, to see how well the two judges agree."""
import json,glob,random,os,urllib.request,re
from judge_prompt import PROMPT
orig=json.load(open('orig.json'))
def key():
    p=os.path.expanduser("~/Documents/GitHub/llm-accounting-benchmark/.env")
    for l in open(p):
        if l.startswith("DEEPSEEK_API_KEY="): return l.split("=",1)[1].strip().strip('"').strip("'")
K=os.environ.get("DEEPSEEK_API_KEY") or key()
items=[]
for p in sorted(glob.glob('judged/*__by__gemma4_12b.jsonl')):
    m=p.split('/')[1].split('__')[0]
    runs={json.loads(l)['i']:json.loads(l) for l in open(f'runs/{m}__reason.jsonl')}
    for l in open(p):
        j=json.loads(l); items.append((m,j,runs[j['i']]))
random.seed(7); sample=random.sample(items,60)
out=open('second_judge.jsonl','w')
for m,j,r in sample:
    o=orig[r['i']]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
    body={"model":"deepseek-v4-pro","messages":[{"role":"user","content":PROMPT.format(question=o['question'],options=opts,key=r['key'],reply=r['text'][:6000])}],"max_tokens":4000,"temperature":0,"thinking":{"type":"disabled"}}
    req=urllib.request.Request("https://api.deepseek.com/chat/completions",json.dumps(body).encode(),{"Content-Type":"application/json","Authorization":"Bearer "+K})
    txt=json.load(urllib.request.urlopen(req,timeout=600))["choices"][0]["message"]["content"]
    try: v=json.loads(re.search(r'\{.*\}',txt,re.S).group(0))
    except Exception: v={}
    out.write(json.dumps({"model":m,"i":r['i'],"gemma":{k:j.get(k) for k in('accuracy','completeness','clarity','verdict')},"v4":v})+"\n"); out.flush()
print('done')
