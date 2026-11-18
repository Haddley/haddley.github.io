"""Remove the cut-off (no letter) answers of a model from its answer and judge files so that run_think.py and judge_think.py redo them."""
import json,sys,shutil
sys.path.insert(0,'.')
from grade import letter
m=sys.argv[1]
f=f'runs_think/{m}__reason.jsonl'; g=f'judged_think/{m}__by__gemma4_12b.jsonl'
shutil.copy(f,f'runs_think/{m}__before_recap.bak'); shutil.copy(g,f'judged_think/{m}__before_recap.bak')
rows=[json.loads(l) for l in open(f)]
drop={r['i'] for r in rows if letter(r['text'],'reason') is None}
open(f,'w').write(''.join(json.dumps(r)+'\n' for r in rows if r['i'] not in drop))
J=[json.loads(l) for l in open(g)]
open(g,'w').write(''.join(json.dumps(j)+'\n' for j in J if j['i'] not in drop))
print(m,'dropped',len(drop),sorted(drop))
