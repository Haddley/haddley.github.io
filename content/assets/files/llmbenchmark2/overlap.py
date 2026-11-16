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
