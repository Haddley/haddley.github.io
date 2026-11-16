"""Planted-error test: change one number in answers the checker marked right and the judge rated SOUND, then judge the damaged copy.
The damage: the first figure after an equals sign has its last digit changed. The final ANSWER line is left alone."""
import json,random,re,urllib.request,glob,sys
sys.path.insert(0,'.')
from grade import letter
from judge_prompt import PROMPT
orig=json.load(open('orig.json'))
def ask(prompt):
    body={"model":"gemma4:12b","messages":[{"role":"user","content":prompt}],"stream":False,"format":"json","think":False,"options":{"temperature":0,"seed":1,"num_predict":300}}
    req=urllib.request.Request("http://localhost:11434/api/chat",json.dumps(body).encode(),{"Content-Type":"application/json"})
    return json.loads(json.load(urllib.request.urlopen(req,timeout=900))["message"]["content"])
def damage(t):
    m=re.search(r'=\s*\$?(\d[\d,]*\.?\d*)',t)
    if not m: return None
    num=m.group(1); i=m.start(1)+len(num)-1
    while not t[i].isdigit(): i-=1
    new=str((int(t[i])+3)%10)
    return t[:i]+new+t[i+1:]
cands=[]
for mname in ['qwen3.8_27b-mlx','qwen2.5_72b','llama3.3_70b','gemma3_27b','qwen2.5_14b']:
    runs={json.loads(l)['i']:json.loads(l) for l in open(f'runs/{mname}__reason.jsonl')}
    for l in open(f'judged/{mname}__by__gemma4_12b.jsonl'):
        j=json.loads(l); r=runs[j['i']]
        if j.get('verdict')=='SOUND' and letter(r['text'],'reason')==r['key'] and damage(r['text']): cands.append((mname,j,r))
print(len(cands),'candidates')
random.seed(3); pick=random.sample(cands,min(40,len(cands)))
out=open('plant.jsonl','w')
for m,j,r in pick:
    o=orig[r['i']]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
    d=ask(PROMPT.format(question=o['question'],options=opts,key=r['key'],reply=damage(r['text'])[:6000]))
    out.write(json.dumps({"model":m,"i":r['i'],"orig":{k:j[k] for k in('accuracy','verdict')},"damaged":d})+"\n")
print('done')
