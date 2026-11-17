"""Judge the reasoning answers of one model. usage: judge.py JUDGE_MODEL ANSWER_FILE_STEM [limit]
For every answer the judge sees the question, the options, the correct letter and the model's reply, and returns
Accuracy, Completeness and Clarity (1 to 10) and a verdict: SOUND, SLIP, FLAWED or UNSUPPORTED."""
import json,sys,time,os,urllib.request
judge,stem=sys.argv[1],sys.argv[2]; limit=int(sys.argv[3]) if len(sys.argv)>3 else 0
orig=json.load(open('orig.json'))
src=f"runs_think/{stem}__reason.jsonl"
out=f"judged_think/{stem}__by__{judge.replace(':','_')}.jsonl"
os.makedirs('judged_think',exist_ok=True)
done={json.loads(l)['i'] for l in open(out)} if os.path.exists(out) else set()
PROMPT="""You are marking a student's answer to a multiple-choice accounting question. You are given the correct answer.

Question:
{question}

Options:
{options}

Correct answer: {key}

Student's reply:
\"\"\"
{reply}
\"\"\"

Mark the reply. Give three scores from 1 to 10:
- accuracy: is the reasoning and the figures right, and does it reach the correct answer?
- completeness: does it work through what is needed to justify its answer?
- clarity: is it easy to follow?
And a verdict, one of: SOUND (right thinking), SLIP (a small error), FLAWED (wrong thinking or wrong answer), UNSUPPORTED (a claim with no reasoning behind it).
Reply with JSON only: {{"accuracy": n, "completeness": n, "clarity": n, "verdict": "...", "reason": "one sentence"}}"""
def ask(prompt):
    body={"model":judge,"messages":[{"role":"user","content":prompt}],"stream":False,"format":"json","think":False,"options":{"temperature":0,"seed":1,"num_predict":300}}
    req=urllib.request.Request("http://localhost:11434/api/chat",json.dumps(body).encode(),{"Content-Type":"application/json"})
    return json.load(urllib.request.urlopen(req,timeout=900))["message"]["content"]
n=0
with open(out,'a') as f:
    for l in open(src):
        r=json.loads(l)
        if limit and n>=limit: break
        n+=1
        if r['i'] in done: continue
        o=orig[r['i']]
        opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
        t=time.time()
        try:
            raw=ask(PROMPT.format(question=o['question'],options=opts,key=r['key'],reply=(('[The student\'s private thinking]\n'+r.get('thinking','')[:7000]+'\n\n[The student\'s reply]\n') if r.get('thinking') else '')+r['text'][:3000]))
            j=json.loads(raw)
            rec={"i":r['i'],**{k:j.get(k) for k in("accuracy","completeness","clarity","verdict","reason")},"secs":round(time.time()-t,1)}
        except Exception as e:
            rec={"i":r['i'],"error":str(e)[:200]}
        f.write(json.dumps(rec)+"\n"); f.flush()
print('done',stem,judge)
