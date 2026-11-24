from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,datetime,re
root=Path(__file__).resolve().parents[1]
class Doc(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.links=[];self.images=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  for k in ['href','src']:
   if k in a:self.links.append(a[k])
  if tag=='img':self.images.append(a)
docs={p:Doc(p.read_text(encoding='utf-8')) for p in root.rglob('*.html') if 'data' not in p.parts}
checks=[]
def check(name,errors,detail):checks.append(dict(name=name,status='passed' if not errors else 'failed',detail=detail,errors=errors))
errors=[];count=0
for p,d in docs.items():
 for url in d.links:
  u=urlsplit(url)
  if u.scheme or url.startswith('//'):continue
  dest=(p.parent/unquote(u.path)).resolve() if u.path else p
  count+=1
  if not dest.exists():errors.append(f'{p.name}: missing {url}')
  elif u.fragment and dest in docs and unquote(u.fragment) not in docs[dest].ids:errors.append(f'{p.name}: missing anchor {url}')
check('Internal links and fragments',errors,f'{count} local references inspected')
check('Unique HTML IDs',[p.name for p,d in docs.items() if len(d.ids)!=len(set(d.ids))],f'{len(docs)} HTML pages inspected')
sources=json.loads((root/'data/sources.json').read_text(encoding='utf-8')); wiki=json.loads((root/'data/wiki.json').read_text(encoding='utf-8'));slides=json.loads((root/'data/slides.json').read_text(encoding='utf-8'))
ids={e['id'] for s in sources for e in s['excerpts']}
claims=[c for p in wiki for sec in p['sections'] for c in sec['claims']]
check('Evidence coverage',[c['text'] for c in claims if not c['refs'] or any(r not in ids for r in c['refs'])],f'{len(claims)} labelled claims; {len(ids)} evidence notes')
check('Source minimum',[] if len(sources)>=5 else ['Too few sources'],f'{len(sources)} sources, including one explicitly limited indexed record')
check('Slide count and Wiki mapping',[] if len(slides)==18 and all((root/(s['wiki']+'.html')).exists() and all(e in ids for e in s['evidence']) for s in slides) else ['Invalid slide mapping'],f'{len(slides)} slides: 15 teaching + 3 appendix')
check('Bilingual slide coverage',[str(s['number']) for s in slides if not s.get('title_en') or not s.get('body_en') or (s['note'] and not s.get('note_en'))], 'All 18 slides require English title/body and translated caveats alongside Traditional Chinese')
check('Image files and alt text',[p.name for p,d in docs.items() for a in d.images if not a.get('alt') or not (p.parent/a['src']).exists()], 'Embedded images use local files with nonempty alt text')
check('JPEG content signature',[p.name for p in (root/'assets').glob('*.jpg') if not p.read_bytes().startswith(b'\xff\xd8\xff')], 'Added after browser testing found HTML error responses saved as JPG')
check('No checkmark or cross-mark glyphs',[str(p.relative_to(root)) for p in docs if re.search('[\u2713\u2714\u2717\u2718\u2705\u274c\u274e]',p.read_text(encoding='utf-8'))],'HTML text scanned')
meta=json.loads((root/'assets/museum-metadata.json').read_text(encoding='utf-8'))
check('Museum permission metadata',[] if len(meta)==2 and all(x['isPublicDomain'] for x in meta) else ['Permission missing'],'Both Met API records explicitly isPublicDomain=true; source pages also reviewed')
check('Chinese language and review disclosure',[] if 'lang="zh-Hant"' in (root/'presentation.html').read_text(encoding='utf-8') and '尚未經人工' in (root/'presentation.html').read_text(encoding='utf-8') else ['Missing language/review disclosure'],'Traditional Chinese page language and review limit included')
result=dict(run_at=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),status='passed' if all(x['status']=='passed' for x in checks) else 'failed',checks=checks,limits=['Not an art-history accuracy certification','Does not replace human Chinese review','Browser interaction results recorded separately'])
(root/'data/check-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=True,indent=2))
raise SystemExit(0 if result['status']=='passed' else 1)
