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
