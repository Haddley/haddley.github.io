"""For the hardest questions (4 or fewer of 15 models right), ask the judge to say in one sentence where each wrong reply went wrong."""
import json,glob,sys,os,urllib.request
sys.path.insert(0,'.')
from grade import letter
judge=sys.argv[1]
orig=json.load(open('orig.json'))
R={}
for p in glob.glob('runs/*__reason.jsonl'):
    n=p.split('/')[1].split('__')[0]; r=[json.loads(l) for l in open(p)]
    if len(r)==282: R[n]=sorted(r,key=lambda x:x['i'])
cnt=[sum(letter(R[n][i]['text'],'reason')==R[n][i]['key'] for n in R) for i in range(282)]
hard=[i for i in range(282) if cnt[i]<=4]
PROMPT="""A student answered this multiple-choice accounting question wrongly. The correct answer is given.

Question:
{question}

Options:
{options}

Correct answer: {key}

Student's reply:
\"\"\"
{reply}
\"\"\"

In one or two sentences, say where the student's reasoning went wrong. Then give a category, one of: MISREAD (misread the question), COMMON-SENSE (chose what sounds suspicious or sensible instead of applying the rule), WRONG-RULE (applied the wrong rule or standard), ARITHMETIC (a calculation error), NO-ANSWER (never reached a choice).
Reply with JSON only: {{"why": "...", "category": "..."}}"""
def ask(prompt):
    body={"model":judge,"messages":[{"role":"user","content":prompt}],"stream":False,"format":"json","think":False,"options":{"temperature":0,"seed":1,"num_predict":300}}
    req=urllib.request.Request("http://localhost:11434/api/chat",json.dumps(body).encode(),{"Content-Type":"application/json"})
    return json.load(urllib.request.urlopen(req,timeout=900))["message"]["content"]
out=open('explain.jsonl','a')
for i in hard:
    o=orig[i]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
    for n in R:
        r=R[n][i]; ch=letter(r['text'],'reason')
        if ch==r['key'] or len(r['text'])<200: continue
        try:
            j=json.loads(ask(PROMPT.format(question=o['question'],options=opts,key=r['key'],reply=r['text'][:6000])))
            rec={"i":i,"model":n,"chose":ch,"key":r['key'],"why":j.get("why"),"category":j.get("category")}
        except Exception as e: rec={"i":i,"model":n,"error":str(e)[:150]}
        out.write(json.dumps(rec)+"\n"); out.flush()
print('done explain',len(hard),'hard questions')
