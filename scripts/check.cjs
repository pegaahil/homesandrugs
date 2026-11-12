const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..');const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),context);
const rugs=context.window.RUGS;assert(Array.isArray(rugs)&&rugs.length);
const ids=new Set();for(const r of rugs){assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id)&&!ids.has(r.id));ids.add(r.id);
for(const k of ['title','alt','image','material','sourceId'])assert(typeof r[k]==='string'&&r[k].length,k);
assert(r.widthCm>0&&r.lengthCm>0);assert(fs.existsSync(path.join(root,r.image)));assert(r.spaces.length>=3);const sid=new Set();
for(const s of r.spaces){assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.id)&&!sid.has(s.id));sid.add(s.id);
for(const k of ['name','mood','description','placement','caution'])assert(typeof s[k]==='string'&&s[k].length,k);
assert(s.palette.length===3&&s.palette.every(c=>c.name&&/^#[A-Fa-f0-9]{6}$/.test(c.hex)));assert(s.furniture.length===3);assert([s.room.width,s.room.depth].every(n=>n>=2&&n<=8));}}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!/^https?:/.test(m[1]))assert(fs.existsSync(path.join(root,m[1])),`Missing ${m[1]}`);}
assert(fs.existsSync(path.join(root,'AGENTS.md')));console.log(`PASS: ${rugs.length} rug(s), ${rugs.reduce((n,r)=>n+r.spaces.length,0)} complete concepts; local references and data contracts valid.`);

