"""Pull the AUTHORITY line from each answer, split it into citations, and check IRC and UCC sections against Cornell LII."""
import json,re,sys,glob,os,html,urllib.request,urllib.error,time
sys.path.insert(0,'.')
from grade import letter
orig=json.load(open('orig.json'))
def lii(url):
    f='cite_cache/'+re.sub(r'\W+','_',url)+'.txt'
    if os.path.exists(f): return open(f).read()
    try:
        s=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read().decode('utf8','ignore')
        t=re.search(r'<title>(.*?)</title>',s,re.S).group(1); t=html.unescape(re.sub(r'\s+',' ',t)).strip()
    except urllib.error.HTTPError as e: t='NOT FOUND' if e.code==404 else f'ERROR {e.code}'
    except Exception as e: t='ERROR'
    open(f,'w').write(t); time.sleep(0.4); return t
def cites(line):
    out=[]
    if re.search(r'Circular|Del\.|Delaware|Model Business|Treas|Reg\.',line,re.I) and not re.search(r'IRC|Internal Revenue|U\.?S\.?C',line,re.I): line=re.sub(r'§|section','',line,flags=re.I)
    for m in re.finditer(r'(?:IRC|I\.R\.C\.|Internal Revenue Code|Code Sec\.?|26 U\.?S\.?C\.?)[^;,\d§]{0,25}(?:§|sec\.?|section)?\s*§?\s*(\d{1,4}[A-Za-z]?)',line,re.I): out.append(('IRC',m.group(1)))
    for m in re.finditer(r'(?<![A-Za-z])(?:§|section|sec\.)\s*(\d{3,4}[A-Za-z]?)(?=[\s\(\),;.]|$)',line,re.I):
        if re.search(r'IRC|Internal Revenue|U\.?S\.?C',line):
            if ('IRC',m.group(1)) not in out: out.append(('IRC',m.group(1)))
    for m in re.finditer(r'UCC[^;,\d]{0,20}(\d)-(\d{3})',line,re.I): out.append(('UCC',f'{m.group(1)}-{m.group(2)}'))
    for m in re.finditer(r'AU-C[^;,\d]{0,12}(\d{3})',line,re.I): out.append(('AU-C',m.group(1)))
    for m in re.finditer(r'ASC\s*(\d{3})(?:-\d+)*',line,re.I): out.append(('ASC',m.group(1)))
    for m in re.finditer(r'IFRS\s*(\d+)',line,re.I): out.append(('IFRS',m.group(1)))
    return out
def check(kind,num):
    if kind=='IRC': return lii(f'https://www.law.cornell.edu/uscode/text/26/{num}')
    if kind=='UCC': return lii(f'https://www.law.cornell.edu/ucc/{num[0]}/{num}')
    return ''
if __name__=='__main__':
    for p in sorted(glob.glob('cite_runs/*.jsonl')):
        R=[json.loads(l) for l in open(p)]
        print('=====',p.split('/')[1])
        for r in R:
            a=re.findall(r'AUTHORITY:\s*(.*)',r['text']); line=a[-1] if a else ''
            cs=cites(line)
            res=[f'{k} {n}: '+check(k,n)[:70] if k in('IRC','UCC') else f'{k} {n}' for k,n in cs]
            print(r['i'],'right' if letter(r['text'],'reason')==r['key'] else 'WRONG','|',line[:80],'|',res)
