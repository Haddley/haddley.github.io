---
title: "LLM Benchmarking, Part 2: Fifteen Models, 282 Questions"
description: "I ran 282 accounting multiple-choice questions through fifteen models, first answering at once with a single letter, then with brief reasoning, and measured which questions every model gets right."
date: "2026-11-13"
categories: ["AI", "Python"]
image: "/assets/images/llmbenchmark2/poster.svg"
tags: "benchmarking, evaluation, ollama, deepseek, accounting, qwen"
hidden: false
slug: "llmbenchmark2"
---

# LLM Benchmarking, Part 2: Fifteen Models, 282 Questions

In [LLM Benchmarking](/posts/llmbenchmark/) I wrote 30 questions that know their own answers, so that a few lines of code could mark them. This post runs the same idea on the 282 multiple-choice accounting questions from my older [llm-accounting-benchmark](https://github.com/Haddley/llm-accounting-benchmark).

## The questions

The 282 questions are the MMLU professional accounting test ([`cais/mmlu`](https://huggingface.co/datasets/cais/mmlu/viewer/professional_accounting), subject `professional_accounting`, test split). Each has four options and one right answer, so a letter checker can mark every one.

:::brain-power Before you read on
Would you expect a model with more parameters to get more of these questions right? Would you expect a model that is allowed to think to do better than one that must answer at once? Make a guess for each, then compare it with the results.
:::

## What I ran

Two passes, so that I could separate knowing from thinking:

- **One letter.** The prompt ends with "Reply with only the letter of the correct option". The model gets no room to work anything out.
- **Brief reasoning.** The prompt ends with "Think it through briefly, then end your reply with a final line in exactly this form: ANSWER: X". The model can reason, and the checker reads the last `ANSWER:` line.

In part 1 I asked every model to finish with a line in a fixed form, such as "ANSWER: B". The checker only has to find that line and read the letter after it, so it does not have to guess which option a long answer is pointing at.

The runner builds each prompt from the question, its four options and one of those two instructions, and sends it to Ollama with the temperature at 0. This is the core of [run.py](/assets/files/llmbenchmark2/run.py), shortened: the real file also resumes a stopped run and has a DeepSeek branch.

```python
INSTR = {
    "direct": "Reply with only the letter of the correct option (A, B, C or D) and nothing else.",
    "reason": "Think it through briefly, then end your reply with a final line in exactly this form: ANSWER: X (where X is A, B, C or D).",
}[mode]

for i, o in enumerate(orig):
    opts = "\n".join(f"{'ABCD'[k]}. {c}" for k, c in enumerate(o["choices"]))
    prompt = f"{o['question']}\n\nOptions:\n{opts}\n\n{INSTR}"
    body = {"model": model, "messages": [{"role": "user", "content": prompt}], "stream": False,
            "options": {"temperature": 0, "seed": 1, "num_predict": 12 if mode == "direct" else NUM_PREDICT}}
    reply = json.load(urllib.request.urlopen(request(body)))
    record = {"i": i, "key": "ABCD"[o["answer"]], "text": reply["message"]["content"]}
```

The "direct" pass caps the answer at 12 tokens, and the "reason" pass at the cap I set for that model.

I ran fifteen models at temperature 0. Thirteen ran locally through Ollama on my Mac, from a 3B Llama to the 72B Qwen2.5 and the 70B Llama 3.3. Two ran through the DeepSeek API: `deepseek-flash` and `deepseek-v4-pro`. For those two I turned thinking off in the one-letter pass.

The checker is [grade.py](/assets/files/llmbenchmark2/grade.py), shown here without the scoring table. It takes the last `ANSWER:` line, and only if there is none does it fall back to a longer reader, [reader.py](/assets/files/llmbenchmark2/reader.py), that looks for phrases such as "the correct answer is":

```python
def letter(text, mode):
    m = re.findall(r"ANSWER:\s*\**\s*\(?([A-D])\b", text, re.I)
    if m:
        return m[-1].upper()
    if mode == "direct":
        m = re.match(r"^\W*([A-D])\b", text.strip(), re.I)
        if m:
            return m.group(1).upper()
    return read(text)          # None when no letter can be found

right = sum(letter(r["text"], mode) == r["key"] for r in records)
```

An answer with no clear letter counts as wrong. Thinking models can spend their whole allowance thinking and never reach the last line, so the cap on the answer length matters. I gave the Qwen3 and Qwen3.8 models 4,000 tokens, `deepseek-r1` and `qwq` 6,000 tokens, and the rest 1,500. Models that were cut off are in the "no letter" column.

## The results

| Model | Reasoning: right of 282 | No letter | One letter: right of 282 | Reasoning time |
|---|---|---|---|---|
| deepseek-flash (API) | **97.9%** | 0 | 84.0% | 15 min |
| deepseek-v4-pro (API) | **97.5%** | 5 | 80.1% | 41 min |
| Qwen3.8 27B (MLX) | 93.6% | 1 | 73.0% | 129 min |
| QwQ 32B | 86.5% | 16 | no answer | 792 min |
| Qwen3 14B | 85.1% | 8 | 61.7% | 165 min |
| Qwen2.5 72B | 85.1% | 1 | 70.9% | 285 min |
| Llama 3.3 70B | 84.8% | 2 | 69.9% | 565 min |
| DeepSeek-R1 32B | 83.3% | 11 | no answer | 479 min |
| Qwen3 8B | 80.1% | 19 | 52.5% | 134 min |
| Qwen2.5 14B | 79.4% | 0 | 63.1% | 53 min |
| Gemma 3 27B | 78.4% | 1 | 62.4% | 103 min |
| gpt-oss 20B | 78.0% | 25 | no answer | 38 min |
| Gemma 3 12B | 63.5% | 1 | 52.8% | 43 min |
| Llama 3.1 8B | 51.4% | 23 | 47.9% | 34 min |
| Llama 3.2 3B | 46.8% | 19 | 41.1% | 14 min |

(Chance is 25%. In the one-letter pass, `deepseek-r1`, `qwq` and `gpt-oss` returned an empty reply to all 282 questions: they are thinking models, and the 12 tokens I allowed were spent thinking before any letter appeared. That pass tells me nothing about them, so the table says "no answer" and not 0%.)

Four things stand out.

**More parameters was not the main thing.** (A parameter is one of the numbers a model learned in training. "72B" means 72 billion of them.) The 72B Qwen2.5 and the 14B Qwen3 both score 85.1%. The 70B Llama 3.3 scores 84.8%, and the 27B Qwen3.8 beats all three by 8 points or more. A newer family at 14B matched an older family at 72B, and used about a fifth of the memory.

**Letting the model think was worth 10 to 25 points.** For the models that can do both, the reasoning pass beat the one-letter pass by 11 points for Gemma 3 12B, 14 for Qwen2.5 72B, 16 for Qwen2.5 14B, 21 for Qwen3.8 27B and 23 for Qwen3 14B. The small Llama models gained only 4 to 6. The one-letter numbers also show how little the 70B models know without thinking: both land near 70%.

**Thinking costs time, and more thinking is not always better.** QwQ 32B spent about 13 hours and 1,800 tokens an answer to reach 86.5%. Qwen3.8 27B took 2 hours and 800 tokens an answer to reach 93.6%. The long thinkers also hit my caps: gpt-oss 20B, Qwen3 8B and QwQ lost 25, 19 and 16 answers to "no letter", so their scores are a little lower than they would be with a larger cap.

**The hosted models were far ahead, and the "flash" one won.** `deepseek-flash` finished all 282 questions in 15 minutes and `deepseek-v4-pro` in 41, and the "flash" model scored 0.4 points higher. They are 1 question apart, and I would not read that as flash being better.

:::no-dumb-questions
**Q: Why not just use the best model?**

A: The best model is a paid API, and the question is what I can run on my own machine. The local choice that gave the most right answers was Qwen3.8 27B. Qwen3 14B matched the 72B models with far less memory.

**Q: Is 97.9% real? Could the test be in the training data?**

A: It could be. MMLU is a public test that has been online for years, and I cannot rule out that a model saw these questions. Read the table as a ranking on this test, not as a promise about your own books.
:::

## Do the models get the same questions right?

I wanted to know whether the models share their hard questions, or whether each one fails on its own. I took the 15 reasoning runs, which all have 282 answers, and counted for each question how many models got it right.

| Models right | 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 or fewer |
|---|---|---|---|---|---|---|---|---|---|
| Questions | 61 | 60 | 37 | 31 | 20 | 17 | 11 | 12 | 33 |

(The seven-or-fewer bucket is 4 + 13 + 5 + 7 + 1 + 2 + 1 + 0 questions, for 7, 6, 5, 4, 3, 2, 1 and 0 models.)

**61 questions (22%) were answered correctly by all 15 models, and no question was missed by all 15.**

The interesting part is who fails together. I measured how alike two models' right-and-wrong patterns are with phi: 1 means identical patterns and 0 means unrelated. Pairs from the same family score higher than pairs from different families. The 26 same-family pairs average 0.35 and the 79 different-family pairs average 0.25. (I counted DeepSeek-R1 32B with the Qwen models, because it is a distilled Qwen.) The most alike pair is Qwen2.5 14B and Qwen2.5 72B, at 0.50. The least alike is `deepseek-flash` against the 3B Llama, at 0.04. A model from the same family as one that is wrong is more likely to be wrong on the same question, and that is why a second opinion from another family is worth more than one from the same family.

:::under-the-hood What phi is
Phi answers one question: when one model gets a question wrong, is the other model more likely to get it wrong too? It is the ordinary correlation, applied to a list of right and wrong marks.

For two models I sort the 282 questions into four boxes:

| Qwen2.5 14B and Qwen2.5 72B | 72B right | 72B wrong |
|---|---|---|
| **14B right** | 211 | 13 |
| **14B wrong** | 29 | 29 |

Both models are right most of the time, so they would agree often even if they were unrelated. Phi removes that effect by comparing the diagonal (both right, both wrong) with the other two boxes, and scaling the result:

phi = (211 × 29 − 13 × 29) ÷ √(224 × 58 × 240 × 42) = 5,742 ÷ 11,444 = **0.50**

- **1** means the two models are right and wrong on exactly the same questions.
- **0** means that knowing one model's mark tells you nothing about the other's.
- **Below 0** would mean one tends to be right where the other is wrong. No pair here goes below 0.

Compare `deepseek-flash` with the 3B Llama. Llama is wrong on 150 of the 282 questions, and DeepSeek is wrong on only 6. If DeepSeek's mistakes had nothing to do with Llama's, I would expect about 3 of those 6 to be among Llama's 150, and 4 are. Phi is 0.04.
:::

The counting is a few lines of [overlap.py](/assets/files/llmbenchmark2/overlap.py), shortened here. It marks every answer right or wrong with the same `letter()` function, adds up the models that got each question right, and measures how alike two models are with phi:

```python
right = {}                                   # model -> {question number: True or False}
for path in glob.glob("runs/*__reason.jsonl"):
    records = [json.loads(line) for line in open(path)]
    if len(records) == 282:                  # only models that answered every question
        right[model_of(path)] = {r["i"]: letter(r["text"], "reason") == r["key"] for r in records}

count = [sum(right[m][i] for m in right) for i in range(282)]   # models right, per question
print(collections.Counter(count))            # how many questions had 15, 14, 13 ... models right

def phi(a, b):
    n11 = sum(right[a][i] and right[b][i] for i in range(282))              # both right
    n10 = sum(right[a][i] and not right[b][i] for i in range(282))          # only a right
    n01 = sum(right[b][i] and not right[a][i] for i in range(282))          # only b right
    n00 = 282 - n11 - n10 - n01                                             # both wrong
    d = math.sqrt((n11 + n10) * (n01 + n00) * (n11 + n01) * (n10 + n00))
    return (n11 * n00 - n10 * n01) / d
```

The questions that most models miss are interesting. Four stand out. Three were answered correctly by three or fewer models, and the fourth by only four:

- **A question about audit engagements.** "Which condition would most likely raise questions about the integrity of management?" The key says B, that the CPA is not permitted to see the senior managers' salaries. Fourteen of the 15 models chose C, substantial inventory write-offs just before each year end. Only `deepseek-flash` agreed with the key. I think C is a defensible answer, and I would not call the 14 wrong without seeing the source.
- **A question about compilations.** "Which factor would most likely cause an accountant not to accept an engagement to compile the financial statements of a nonissuer?" The key says B, that management does not investigate reports of asset misappropriation. Thirteen models chose C, that the entity plans to leave out nearly all the disclosures GAAP requires. Only the two DeepSeek models matched the key.
- **A bond question** about straight-line against effective interest amortisation, where six models never reached a letter and six chose A. Only `deepseek-flash` and Qwen3.8 27B got it right.
- **A question about comparing investment projects.** The question is "When comparing investment projects:" with four options. The key says C, "The IRR never changes the ranking of the projects". IRR is the internal rate of return, and it can rank projects differently from NPV, so I do not see how C is true. Only 4 of the 15 models chose C. I think the key is wrong here, but I have not checked the source.

:::watch-it A question that most models miss may have a bad key
When 14 of 15 models choose the same wrong answer, the question is either hard in the same way for every model, or the key is arguable. Both happen in this test. I cannot tell which from the models alone. Read the question, and check the source, before you decide what a "hard" question tells you.
:::

The two DeepSeek models miss different questions. `deepseek-flash` missed 6 and `deepseek-v4-pro` missed 7, and only 2 questions appear on both lists. Between them they got 271 questions right together, and missed 2 together.

## What I take from this

- **Model generation and the room to think mattered more than the number of parameters.** A 14B model from a newer family matched a 72B model from an older one, and letting every model reason added 10 to 25 points.
- **Models fail together.** 22% of the questions were easy for all fifteen, and none were impossible for all fifteen. A second opinion from a different family is worth more than a second run from the same one.
- **The answer cap shapes the result.** Models that think can hit the cap and lose the answer, so the bottom of the table is a little pessimistic for them.

:::bullet-points What to remember
- Ask for a fixed last line, such as "ANSWER: X", and the checker becomes one line of code.
- Run a one-letter pass and a reasoning pass. The gap shows how much the model gained by thinking.
- Count an answer with no letter as wrong, and say how many there were.
- When many models choose the same wrong answer, suspect the key before you suspect the models.
:::

## What comes next

I would like to add a judge model that scores the thinking as well as the letter, from a different family than the models it marks. I would also like to use the open-ended bank reconciliation prompts in the older project, which a letter checker cannot mark.

## The code

These are the files in full. To run one model: `python3 run.py qwen3:14b reason`, then `python3 grade.py` to score every answer file and `python3 overlap.py` to count how many models get each question right.

**run.py asks a model all 282 questions and saves its answers.**

```python
"""Run clean MMLU professional accounting (282, original keys) through Ollama. usage: run.py MODEL MODE [limit]
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
```

**reader.py finds a letter in an answer that has no ANSWER: line.**

```python
import re
L='[A-D]'
NEG=re.compile(r'(incorrect|wrong|not correct|not the|eliminate|rule out|ruled out|false|invalid|cannot be|can\'t be|isn\'t|is not)',re.I)
PATS=[
 # strongest: explicit final statements
 (r'(?:final answer|answer|correct (?:option|answer|choice)|correct mathematical choice|i would choose|i choose|i\'d choose|best (?:option|answer|choice)|the (?:answer|choice) is|therefore,? (?:the )?(?:answer|option|choice) is)\W{0,12}(?:is\W{0,6})?(?:option\W{0,3})?\(?\**('+L+r')\b(?!\w)',),
 (r'\\boxed\{\s*\\?(?:text\{)?\(?('+L+r')\b',),
 (r'\*\*\s*(?:option\s*)?('+L+r')\s*[.:)]?\s*[^\n*]{0,60}\*\*\s*$',),
]
def read(text):
    t=text.strip()
    if not t: return None
    low=t
    cands=[]
    for (p,) in PATS:
        for m in re.finditer(p,low,re.I|re.M):
            ctx=low[max(0,m.start()-40):m.end()+30]
            if re.search(r'(option|choice)\s*'+m.group(1)+r'\b[^.\n]{0,40}(incorrect|wrong|not)',ctx,re.I): continue
            cands.append((m.start(),m.group(1).upper()))
    if cands: return max(cands)[1]
    # last three lines fallback: line that starts with letter or "Option X"
    tail=[l for l in t.split('\n') if l.strip()][-3:]
    for l in reversed(tail):
        m=re.match(r'^\W*(?:option\s*)?\(?('+L+r')\)?[.:)\s]',l.strip(),re.I) 
        if m and not NEG.search(l[:40]): return m.group(1).upper()
        m=re.search(r'(?:option|choice)\s*\(?('+L+r')\b',l,re.I)
        if m and not NEG.search(l): return m.group(1).upper()
    return None
```

**grade.py scores every answer file.**

```python
import json,re,sys,glob,collections
sys.path.insert(0,'.')
from reader import read
def letter(t,mode):
    m=re.findall(r'ANSWER:\s*\**\s*\(?([A-D])\b',t,re.I)
    if m: return m[-1].upper()
    if mode=='direct':
        m=re.match(r'^\W*([A-D])\b',t.strip(),re.I)
        if m: return m.group(1).upper()
    return read(t)
rows=[]
for p in sorted(glob.glob('runs/*.jsonl')):
    mode=p.split('__')[1][:-6]; model=p.split('/')[1].split('__')[0]
    recs=[json.loads(l) for l in open(p)]
    n=len(recs); ok=sum(1 for r in recs if letter(r['text'],mode)==r['key']); nl=sum(1 for r in recs if letter(r['text'],mode) is None)
    secs=sum(r.get('secs',0) for r in recs); tok=sum(r.get('tokens') or 0 for r in recs)
    rows.append((ok/max(n,1),model,mode,n,ok,nl,secs,tok))
for r in sorted(rows,reverse=True): print(f"{r[1]:28s} {r[2]:7s} n={r[3]:3d} right={r[4]:3d} ({100*r[0]:.1f}%) noletter={r[5]:3d} time={r[6]/60:.1f}min tokens/answer={r[7]/max(r[3],1):.0f}")
```

**overlap.py counts how many models get each question right.**

```python
import json,glob,re,sys,collections,math
sys.path.insert(0,'.')
from grade import letter
M={}
for p in sorted(glob.glob('runs/*__reason.jsonl')):
    name=p.split('/')[1].split('__')[0]
    recs=[json.loads(l) for l in open(p)]
    if len(recs)<282: continue
    M[name]={r['i']:(letter(r['text'],'reason')==r['key']) for r in recs}
names=list(M); N=282
print(len(names),'models with all 282 reasoning answers')
cnt=[sum(M[n][i] for n in names) for i in range(N)]
K=len(names)
dist=collections.Counter(cnt)
print('\nHow many of the',K,'models get each question right:')
for k in range(K+1): print(f'  {k:2d} right: {dist[k]:3d} questions', '#'*(dist[k]//2))
print('\nall right:',dist[K],' all wrong:',dist[0],' (',round(100*dist[K]/N),'% all right,',round(100*dist[0]/N,1),'% nobody)')
# local only vs hosted
loc=[n for n in names if not n.startswith('deepseek_')]
cl=[sum(M[n][i] for n in loc) for i in range(N)]
print('\nlocal models only (',len(loc),'): all right',sum(1 for c in cl if c==len(loc)),' all wrong',sum(1 for c in cl if c==0))
# pairwise agreement: P(both right)/ phi correlation
def phi(a,b):
    x=[M[a][i] for i in range(N)];y=[M[b][i] for i in range(N)]
    n11=sum(1 for u,v in zip(x,y) if u and v);n10=sum(1 for u,v in zip(x,y) if u and not v);n01=sum(1 for u,v in zip(x,y) if not u and v);n00=N-n11-n10-n01
    d=math.sqrt((n11+n10)*(n01+n00)*(n11+n01)*(n10+n00))
    return (n11*n00-n10*n01)/d if d else 0
import itertools
cors=[(phi(a,b),a,b) for a,b in itertools.combinations(names,2)]
print('\nCorrelation of right/wrong between models (phi, 1 = identical pattern, 0 = unrelated):')
print('  mean',round(sum(c[0] for c in cors)/len(cors),2),' min',round(min(cors)[0],2),min(cors)[1:],' max',round(max(cors)[0],2),max(cors)[1:])
# expected under independence: for each question P(right)=per-model accuracy; compare observed "nobody right" etc
acc={n:sum(M[n].values())/N for n in names}
exp_all_wrong=sum(math.prod(1-acc[n] for n in names) for i in range(N))
exp_all_right=sum(math.prod(acc[n] for n in names) for i in range(N))
print('\nIf models were independent, expect',round(exp_all_wrong,1),'questions nobody gets right and',round(exp_all_right,1),'all right; observed',dist[0],'and',dist[K])
json.dump({'cnt':cnt,'names':names},open('overlap.json','w'))
```

## References

- [LLM Benchmarking](/posts/llmbenchmark/): part 1, with 30 questions and a checker
- [llm-accounting-benchmark](https://github.com/Haddley/llm-accounting-benchmark): the original project, now with a DeepSeek provider
- [cais/mmlu](https://huggingface.co/datasets/cais/mmlu): the test, `professional_accounting` subject
