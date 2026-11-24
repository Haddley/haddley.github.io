"""Part 6: build a notes base from the research agent's runs and retrieve notes for a question (TF-IDF, no hand-picking)."""
import json,re,glob
import math,collections
orig=json.load(open('orig.json')); split=json.load(open('split.json'))
def stem(i): o=orig[i]; return o['question']+' '+' '.join(o['choices'])
def build_notes(files=('agent_runs3/deepseek-flash__gate.jsonl',)):
    notes=[]
    for f in files:
        for l in open(f):
            x=json.loads(l)
            if not x.get('rule'): continue
            qs=[q for q in (x.get('quotes') or []) if isinstance(q,dict) and q.get('quote')]
            notes.append({"i":x['i'],"verified":x['status']=='accepted',"rule":x['rule'].strip(),"quotes":[{"source":q.get('source',''),"quote":q['quote'][:300]} for q in qs[:2]]})
    return notes
def note_text(n): return n['rule']+' '+' '.join(q['source']+' '+q['quote'] for q in n['quotes'])
def render(n):
    s=f"- {n['rule']}"
    for q in n['quotes']: s+=f' (Source: {q["source"]}: "{q["quote"]}")'
    return s
STOP=set("the a an of and or to in on for is are was were be by with as at that this it its from which what following would should most least not no than if when who how does do did has have had will may can".split())
def toks(t): return [w for w in re.findall(r'[a-z0-9]+',t.lower()) if w not in STOP and len(w)>1]
class Tfidf:
    def __init__(self,docs):
        self.D=[collections.Counter(toks(d)) for d in docs]; n=len(docs); df=collections.Counter(w for d in self.D for w in d)
        self.idf={w:math.log((1+n)/(1+c))+1 for w,c in df.items()}; self.M=[self.vec(d) for d in self.D]
    def vec(self,c):
        v={w:(1+math.log(k))*self.idf.get(w,0) for w,k in c.items() if w in self.idf}; z=math.sqrt(sum(x*x for x in v.values())) or 1
        return {w:x/z for w,x in v.items()}
    def sims(self,text):
        q=self.vec(collections.Counter(toks(text))); return [sum(x*m.get(w,0) for w,x in q.items()) for m in self.M]
class Retriever:
    def __init__(self,notes):
        self.notes=notes; self.t=Tfidf([note_text(n)+' '+stem(n['i']) for n in notes]) if notes else None
    def top(self,i,k=3):
        if not self.notes: return []
        s=self.t.sims(stem(i)); return [self.notes[j] for j in sorted(range(len(s)),key=lambda j:-s[j])[:k]]
def leak_check():
    b,t=split['build'],split['test']; T=Tfidf([stem(i) for i in b])
    return {i:max(T.sims(stem(i))) for i in t}
