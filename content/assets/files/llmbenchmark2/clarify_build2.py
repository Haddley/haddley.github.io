"""Part 7: make incomplete versions of exam questions. deepseek-flash removes one decisive fact; a second call, shown only the incomplete question, says whether it could still be answered with certainty. Keep only the ones it says cannot."""
import json,random,sys,urllib.request,os
def key():
    for l in open(os.path.expanduser("~/Documents/GitHub/llm-accounting-benchmark/.env")):
        if l.startswith("DEEPSEEK_API_KEY="): return l.split("=",1)[1].strip().strip('"\'')
def call(p):
    b={"model":"deepseek-flash","messages":[{"role":"user","content":p}],"max_tokens":4000,"temperature":0}
    r=urllib.request.Request("https://api.deepseek.com/chat/completions",json.dumps(b).encode(),{"Content-Type":"application/json","Authorization":"Bearer "+key()})
    c=json.load(urllib.request.urlopen(r,timeout=600))["choices"][0]["message"]["content"]; return json.loads(c[c.index('{'):c.rindex('}')+1])
orig=json.load(open('orig.json')); random.seed(7); ids=random.sample(range(len(orig)),240); out=[]
from concurrent.futures import ThreadPoolExecutor
def one(i):

    o=orig[i]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices'])); L='ABCD'[o['answer']]
    for t in range(3):
        try:
            r=call(f"Question:\n{o['question']}\n\nOptions:\n{opts}\n\nCorrect answer: {L}\n\nRewrite ONLY the question text so that one decisive fact is missing (a date, an amount, a legal status, a method, a condition; never just the name of a rule or authority) and the options can no longer be told apart with certainty. Keep the options as they are. Reply JSON only: {{\"incomplete\":\"rewritten question\",\"missing\":\"short phrase naming the missing fact\",\"fact\":\"the removed fact, as the person asking would say it in one sentence\"}}")
            j=call(f"Question:\n{r['incomplete']}\n\nOptions:\n{opts}\n\nCan you choose exactly one option with certainty from this text alone, without assuming anything not stated? Reply JSON only: {{\"certain\":true or false,\"answer\":\"A|B|C|D\"}}")
            return {"i":i,"key":L,**r,"judge_certain":bool(j.get('certain')),"judge_answer":j.get('answer')}
        except Exception as e: err=e
    print('skip',i,err,flush=True)
with ThreadPoolExecutor(8) as ex: out=[x for x in ex.map(one,ids) if x]
json.dump(out,open('clarify_questions_all.json','w'),indent=1)
keep=[x for x in out if not x['judge_certain']]; json.dump(keep,open('clarify_questions_candidates.json','w'),indent=1); print('candidates',len(keep),'of',len(out))
