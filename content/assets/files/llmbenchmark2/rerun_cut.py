"""Redo the cut-off (no letter) reasoning answers of non-thinking models with a larger allowance.
usage: rerun_cut.py MODEL [NUM_PREDICT]   (default 4000). Backs up the answer file first, drops the cut-off rows, then runs run.py to refill them."""
import json,sys,shutil,subprocess,os
sys.path.insert(0,'.')
import io,contextlib
with contextlib.redirect_stdout(io.StringIO()): from grade import letter
m=sys.argv[1]; npred=sys.argv[2] if len(sys.argv)>2 else '4000'
f=f"runs/{m.replace('/','_').replace(':','_')}__reason.jsonl"
shutil.copy(f,f.replace('.jsonl','__before_rerun.bak'))
rows=[json.loads(l) for l in open(f)]
drop={r['i'] for r in rows if letter(r['text'],'reason') is None}
open(f,'w').write(''.join(json.dumps(r)+'\n' for r in rows if r['i'] not in drop))
print(m,'dropped',len(drop),flush=True)
subprocess.run([sys.executable,'run.py',m,'reason'],env={**os.environ,'NUM_PREDICT':npred})
