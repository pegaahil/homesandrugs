'use strict';
const $ = id => document.getElementById(id);
let rug = window.RUGS[0], space = rug.spaces[0], rotated = false, favorites = [];
try { const saved = JSON.parse(localStorage.getItem('one-rug-favorites') || '[]'); if (Array.isArray(saved)) favorites = saved.filter(x => typeof x === 'string'); } catch (_) {}
const key = () => `${rug.id}:${space.id}`;
function status(message) { $('status').textContent = message; }
function element(tag, text, className) { const node = document.createElement(tag); if (text != null) node.textContent = text; if (className) node.className = className; return node; }
function favoriteState() { const saved = favorites.includes(key()); $('favorite').textContent = saved ? '♥ Saved' : '♡ Save'; $('favorite').setAttribute('aria-pressed', String(saved)); }
function render() {
  $('rug-title').textContent = rug.title; $('rug-id').textContent = `RUG ${rug.id.toUpperCase()}`;
  $('rug-facts').textContent = `${rug.material} · ${rug.widthCm} × ${rug.lengthCm} cm`;
  $('rug-photo').src = rug.image; $('rug-photo').alt = rug.alt; $('plan-rug').src = rug.image;
  $('space-tabs').replaceChildren(...rug.spaces.map((item, index) => { const b = element('button', `${String(index + 1).padStart(2,'0')} / ${item.id.replaceAll('-',' ')}`); b.setAttribute('aria-pressed', String(item.id === space.id)); b.onclick = () => { space = item; render(); }; return b; }));
  for (const id of ['mood','description','placement','caution']) $(id).textContent = space[id];
  $('space-title').textContent = space.name;
  $('palette').replaceChildren(...space.palette.map(color => {
    const b = element('button', null, 'swatch'); b.setAttribute('aria-label',`Copy ${color.name}, ${color.hex}`);
    const block = element('span', null, 'color-block'); block.style.background = color.hex;
    b.append(block, element('strong',color.name),element('small',color.hex));
    b.onclick = async () => { try { await navigator.clipboard.writeText(color.hex); status(`${color.name}: ${color.hex} copied.`); } catch (_) { status(`Copy this colour code: ${color.hex}`); } }; return b;
  }));
  $('furniture').replaceChildren(...space.furniture.map(t => element('li',t)));
  $('room-width').value = space.room.width; $('room-depth').value = space.room.depth;
  rotated = false; $('rotate').setAttribute('aria-pressed','false'); favoriteState(); renderPlan(); renderComparison();
}
function renderPlan() {
  const width = Number($('room-width').value), depth = Number($('room-depth').value);
  const valid = [width,depth].every(x => Number.isFinite(x) && x >= 2 && x <= 8);
  for (const id of ['room-width','room-depth']) { const input = $(id); const n = Number(input.value); input.setAttribute('aria-invalid',String(!Number.isFinite(n) || n < 2 || n > 8)); }
  $('room-plan').hidden = !valid;
  if (!valid) { $('scale-note').textContent = 'Enter a room width and depth between 2 and 8 metres.'; return; }
  const planWidth = Math.min(350 * width / depth, 350, Math.max(150, $('room-plan').parentElement.clientWidth - 50));
  $('room-plan').style.width = `${planWidth}px`; $('room-plan').style.height = `${planWidth * depth / width}px`;
  const rw = (rotated ? rug.lengthCm : rug.widthCm) / 100, rh = (rotated ? rug.widthCm : rug.lengthCm) / 100;
  const photo = $('plan-rug');
  // Rotate the image itself; preserve its original width:length ratio in either orientation.
  photo.style.width = `${rug.widthCm / 100 / width * planWidth}px`;
  photo.style.height = `${rug.lengthCm / 100 / width * planWidth}px`;
  photo.style.transform = `translate(-50%,-50%) rotate(${rotated ? 90 : 0}deg)`;
  const fits = rw <= width && rh <= depth; photo.hidden = !fits;
  $('scale-note').textContent = fits ? `Example room: ${width} × ${depth} m. Rug: ${rw.toFixed(2)} × ${rh.toFixed(2)} m (${(rw*rh/(width*depth)*100).toFixed(1)}% of floor area).` : 'The rug does not fit this room in the selected orientation. Increase the room size or rotate it.';
  $('furniture-marker').textContent = space.furniture[0];
}
function renderComparison() {
  const grid = element('div',null,'compare-grid');
  for (const item of rug.spaces) { const card = element('article',null,'compare-card'); const colors = element('div',null,'mini-colors'); colors.setAttribute('aria-label',item.palette.map(x=>x.name).join(', '));
    item.palette.forEach(c=>{const s=element('span');s.style.background=c.hex;colors.append(s);});
    const choose=element('button','Explore this space');choose.onclick=()=>{space=item;render();$('explore').scrollIntoView();document.querySelector('#space-tabs button')?.focus();};
    card.append(element('h3',item.name),colors,element('p',item.mood),element('p',item.placement),choose);grid.append(card);
  } $('compare-content').replaceChildren(grid);
}
$('rug-select').replaceChildren(...window.RUGS.map(r=>{const option=element('option',`${r.id.toUpperCase()} — ${r.title}`);option.value=r.id;return option;}));
$('rug-select').onchange = e => { rug = window.RUGS.find(r=>r.id===e.target.value); space = rug.spaces[0]; render(); };
$('favorite').onclick = () => { favorites = favorites.includes(key()) ? favorites.filter(x=>x!==key()) : [...favorites,key()];favoriteState();try{localStorage.setItem('one-rug-favorites',JSON.stringify(favorites));status('Selection updated on this device.');}catch(_){status('Selection updated for this visit; browser storage is unavailable.');} };
$('room-width').oninput = renderPlan; $('room-depth').oninput = renderPlan;
$('rotate').onclick = () => {rotated=!rotated;$('rotate').setAttribute('aria-pressed',String(rotated));renderPlan();};
$('compare-toggle').onclick = () => {const open=$('compare-content').hidden;$('compare-content').hidden=!open;$('compare-toggle').textContent=open?'Hide comparison':'Show comparison';$('compare-toggle').setAttribute('aria-expanded',String(open));};
$('export').onclick = () => {
  const text = [`ONE RUG, THREE SPACES`,`${rug.id.toUpperCase()} — ${rug.title}`,`Catalog: ${rug.material}, ${rug.widthCm} × ${rug.lengthCm} cm`,`Concept: ${space.name}`,space.mood,space.description,'',`Palette: ${space.palette.map(c=>`${c.name} ${c.hex}`).join(', ')}`,...space.furniture.map(t=>`- ${t}`),'',space.placement,space.caution,'', $('scale-note').textContent,`Rotation: ${rotated?'90 degrees':'0 degrees'}`,'Hypothetical styling concept; not a real installation or a provenance claim.',`Source: ${rug.sourceId}. See docs/sources.md.`].join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})); const a=element('a');a.href=url;a.download=`${rug.id}-${space.id}-concept.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Selected concept exported as a text file.');
};
$('print').onclick = () => window.print();
window.addEventListener('resize',renderPlan);render();

