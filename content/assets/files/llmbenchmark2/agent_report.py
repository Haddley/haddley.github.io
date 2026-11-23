import json,statistics,collections
for m in ['deepseek-flash','deepseek-v4-pro']:
    for arm in ['research','gate','gatestrict','oracle']:
        try: R=[json.loads(l) for l in open(f'agent_runs/{m}__{arm}.jsonl')]
        except Exception: continue
        n=len(R)
        first=sum(r['first']==r['key'] for r in R); final=sum(r['final']==r['key'] for r in R)
        acc=[r for r in R if r['status']=='accepted']; unres=[r for r in R if r['status']!='accepted']
        acc_right=sum(r['final']==r['key'] for r in acc)
        # gate behaviour: answers rejected in round 1
        rej_right=rej_wrong=0
        for r in R:
            g=r['gate_log']
            if g and not g[0]['convincing']:
                if g[0]['answer']==r['key']: rej_right+=1
                else: rej_wrong+=1
        fixed=sum(1 for r in R if r['first']!=r['key'] and r['final']==r['key']); broke=sum(1 for r in R if r['first']==r['key'] and r['final']!=r['key'])
        print(f"{m:16s} {arm:9s} n={n} start {first}/{n} -> final {final}/{n} | fixed {fixed} broke {broke} | accepted {len(acc)} (right {acc_right}) unresolved {len(unres)} (right {sum(r['final']==r['key'] for r in unres)}) | round-1 rejections: correct {rej_right} wrong {rej_wrong} | calls {statistics.mean(r['tool_calls'] for r in R):.1f} rounds {statistics.mean(r['rounds'] for r in R):.1f} tokens {statistics.mean(r['tokens'] for r in R):.0f}")
