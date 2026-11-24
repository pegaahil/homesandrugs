EN = [
('Reading Persian rug motifs','Start with form, ask about context, and keep uncertainty visible.|Persian Rug Motifs: Forms, Context, and Meanings.|Five topics and a method for tracing information to its sources.','An introductory lesson. Traditional Chinese translations and descriptive terms have not been reviewed by a human specialist.'),
('Observe before interpreting','Observation: describe visible shapes.|Historical claim: check records for dates, materials and origin.|Interpretation: identify who proposed it and the supporting evidence.|Uncertain: do not draw a conclusion when evidence is insufficient.','These four categories are this project’s editorial rules, not classifications of rugs.'),
('Find the field and borders','The field (matn / متن) is the main area inside the borders.|Main borders, minor borders and narrow guard bands help locate a motif.|Describe where it is before describing what it resembles.',''),
('Motif, pattern and composition','Motif: one decorative unit.|Pattern: the arrangement and repetition of units.|Composition: the organization of the whole rug.','The five topics operate at different levels. They are not all single symbols.'),
('Boteh: a curved-tip teardrop','Persian: بته‌جقه (boteh-jegheh).|Look for a rounded outline and a curved tip.|Getty connects this form with paisley. Recognizing a shape does not establish the weaver’s intended meaning.',''),
('Herati / Mahi: read the whole repeat','هراتی / ماهی‌درهم (herāti / māhi darham).|Look for the combination of a diamond, central flower and surrounding curved leaves.|The “fish” name relates to the appearance of the leaves. It does not require a realistic fish image.',''),
('Shah Abbasi: more than one naming level','شاه‌عباسی (shāh-abbāsi).|A palmette is a stylized fan-like flower.|Shah Abbasi can also name a broader floral pattern. The name alone does not establish a date.',''),
('Islimi: follow the scroll','اسلیمی (eslimi / islimi), arabesque.|Follow branches and curves rather than concentrating on one flower.|In the museum example, blue scrolling bands coexist with small flowers. The museum labels its origin “probably Iran.”',''),
('Toranj and Lachak: centre and corners','ترنج و لچک (toranj va lachak).|Identify the central medallion, then examine how the corners echo it.|A medallion can itself contain smaller motifs.',''),
('Exercise: which level are you identifying?','Which topic concerns an entire repeating unit? Which concerns the centre and corners?',''),
('Historical context is not a fixed meaning','The V&A discusses perspective and deliberate imperfection as possible explanations for the Ardabil Carpet’s unequal lamps.|It also questions the evidence for perspective and does not name the individual proponents.|Say “the museum presents an interpretation,” rather than claiming certainty about the weaver’s intention.','This Wiki assigns no universal meaning to a motif and contains no fictional stories.'),
('Understanding materials, density and dyes','Materials: record the pile and foundation separately.|Knot density: state the measurement unit. Do not convert it directly into a price.|Dyes: consult documentation or analysis. Screen colour cannot prove chemical composition.','This is a framework for understanding and documentation, not an appraisal or buying recommendation.'),
('Condition, age and provenance','Condition: are losses, repairs and examination reports documented?|Age: is it supported by an inscription or analysis? Dye analysis led Cleveland to date one fragment to 1884–1928.|Provenance: who owned it? Keep uncertain transfers and dates visible.','A motif alone does not determine value. An old-looking appearance does not establish age.'),
('Exercise: read a museum object','Met 22.100.67: examine the fragment, then read the museum description.|What can you see? Which information requires a record?',''),
('Take away three habits','Describe form and layout first.|Consult traceable sources next.|Finally, explain what remains unknown.','You can compare another museum object next, but new claims must first enter the Wiki and be checked.'),
('Appendix 1: from sources to slides','Acquire public sources; create evidence notes; organize a linked Wiki; check claims and image rights; approve the outline; translate and lay out slides; test the HTML.|Insufficient citation returns to sources. Unclear terminology returns to the Wiki. Layout or link failures are repaired and retested.','After three unsuccessful revisions of a claim, mark it unresolved and refer it for human review.'),
('Appendix 2: this run’s checking record','Image screening: rejected an Egyptian Mamluk carpet as a Persian example.|Date comparison: found different Ardabil dates in an older reference and the V&A record. Used the current holding museum’s record and retained the discrepancy.|Public access is not permission to reuse: V&A images became external links.','The log records actual problems from this run, not invented test statistics.'),
('Appendix 3: reflection and next steps','The source-to-claim step needed the most editorial attention: origin, date and careful wording.|Cultural attribution, rights and qualifiers such as “probably” are now checked before layout.|One run cannot establish which node fails most often over time. Traditional Chinese still needs human review.','A future Rug Detective can reuse evidence IDs. Motif identification still needs human confirmation, and stories must be labelled fiction.')
]

def enrich(slides):
 import re
 for s,(title,body,note) in zip(slides,EN):
  s['title_en']=title
  s['body_en']=''.join('<p>'+p+'</p>' for p in body.split('|'))
  s['note_en']=note
  if s['number']==10:
   comparison=re.search(r'<div class="compare">.*?</div></div><details>',s['body'])
   if comparison:
    grid=comparison.group(0).removesuffix('<details>')
    s['body']=s['body'].replace(grid,'')
    s['visual']=grid
   s['body_en']+='<details><summary>Show answer</summary><p>Herati requires reading the whole repeat. Toranj / Lachak concerns the centre and corners. A small crop may omit the relationships needed for identification.</p></details>'
  if s['number']==14:
   s['body_en']+='<details><summary>Show evidence layers</summary><p>Observation: an incomplete outline and decoration. Museum record: early sixteenth century, Northwestern Iran. Reconstruction: probably above a larger central medallion. The fragment cannot establish the full design or the weaver’s intention.</p></details>'
  if s['number']==15:
   s['body_en']+='<p><a href="index.html">English Wiki</a> · <a href="glossary.html">Glossary</a> · <a href="sources.html">Source notes</a></p>'
  if s['number']==17:
   s['body_en']+='<p><a href="checking-log.html">Read the actual log and test results</a></p>'
