"""Part 7. usage: clarify_run.py MODEL CONDITION   (MODEL: Ollama name or deepseek:deepseek-flash)
CONDITION: complete_ask (original question, may ask) | incomplete_forced (must answer) | incomplete_ask (may ask up to 2 questions; a simulated user replies)
The simulated user (deepseek-flash) sees the full original question and the removed fact, and answers only what is asked."""
import json,sys,os,re,urllib.request
model,cond=sys.argv[1],sys.argv[2]; Q=json.load(open('clarify_questions.json')); orig=json.load(open('orig.json'))
def key():
    for l in open(os.path.expanduser("~/Documents/GitHub/llm-accounting-benchmark/.env")):
        if l.startswith("DEEPSEEK_API_KEY="): return l.split("=",1)[1].strip().strip('"\'')
def chat(m,msgs,mt=12000):
    if m.startswith("deepseek:"):
        b={"model":m.split(":",1)[1],"messages":msgs,"max_tokens":32000,"temperature":0}
        r=urllib.request.Request("https://api.deepseek.com/chat/completions",json.dumps(b).encode(),{"Content-Type":"application/json","Authorization":"Bearer "+key()})
        return json.load(urllib.request.urlopen(r,timeout=1800))["choices"][0]["message"].get("content") or ""
    b={"model":m,"messages":msgs,"stream":False,"options":{"temperature":0,"seed":1,"num_predict":mt}}
    r=urllib.request.Request("http://localhost:11434/api/chat",json.dumps(b).encode(),{"Content-Type":"application/json"})
    return json.load(urllib.request.urlopen(r,timeout=3600))["message"].get("content","")
ASK="If a fact you need is missing from the question, reply with exactly one line in the form QUESTION: <what you need to know> and nothing else. Otherwise think it through briefly and end with a final line in exactly this form: ANSWER: X (where X is A, B, C or D)."
FORCE="Think it through briefly, then end your reply with a final line in exactly this form: ANSWER: X (where X is A, B, C or D). If something is missing, make your best assumption."
def letter(t):
    m=re.findall(r'ANSWER:\s*\**\s*([ABCD])',t or ''); return m[-1] if m else None
def user_reply(x,asked):
    o=orig[x['i']]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
    p=(f"You are a person who asked an accounting question. Your full question was:\n{o['question']}\nThe fact you left out of your first message: {x['fact']} (topic: {x['missing']}).\n\n"
       f"An adviser now asks you: \"{asked}\"\nAnswer in one or two plain sentences, using only facts in your full question. Do not mention the answer options and do not say which option is right. If the question asks for something your full question does not say, reply \"I do not know.\" "
       "Reply JSON only: {\"reply\":\"...\",\"asked_about_missing_fact\":true or false}")
    c=chat("deepseek:deepseek-flash",[{"role":"user","content":p}]); j=json.loads(c[c.index('{'):c.rindex('}')+1]); return j['reply'],bool(j['asked_about_missing_fact'])
out=f"clarify_runs/{model.replace('/','_').replace(':','_')}__{cond}.jsonl"; os.makedirs('clarify_runs',exist_ok=True)
done={json.loads(l)['i'] for l in open(out)} if os.path.exists(out) else set()
for x in Q:
    if x['i'] in done: continue
    o=orig[x['i']]; opts="\n".join(f"{'ABCD'[k]}. {c}" for k,c in enumerate(o['choices']))
    text=o['question'] if cond=='complete_ask' else x['incomplete']
    msgs=[{"role":"user","content":f"{text}\n\nOptions:\n{opts}\n\n{FORCE if cond=='incomplete_forced' else ASK}"}]
    asked=[]; hit=[]; ans=None; reply=''
    for turn in range(3):
        reply=chat(model,msgs); ans=letter(reply)
        m=re.search(r'QUESTION:\s*(.+)',reply or '')
        if ans or not m or cond=='incomplete_forced': break
        if turn==2: break
        a=m.group(1).strip(); asked.append(a); r,h=user_reply(x,a); hit.append(h)
        msgs+= [{"role":"assistant","content":reply},{"role":"user","content":f"{r}\n\nNow, if you still need something, ask one more QUESTION line; otherwise give your answer in the form ANSWER: X."}]
    if not ans and asked:   # asked twice and still no answer: force one
        msgs+=[{"role":"assistant","content":reply},{"role":"user","content":FORCE}]; reply=chat(model,msgs); ans=letter(reply)
    with open(out,'a') as f: f.write(json.dumps({"i":x['i'],"key":x['key'],"answer":ans,"asked":asked,"hit_missing_fact":hit,"final_reply":(reply or '')[-400:]})+"\n")
    print(x['i'],ans,len(asked),flush=True)
