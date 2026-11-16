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
