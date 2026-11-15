(function(root){
 'use strict';
 const rgb=h=>h.match(/[a-f0-9]{2}/gi).map(n=>parseInt(n,16));
 const distance=(a,b)=>Math.hypot(...a.map((n,i)=>n-b[i]))/(255*Math.sqrt(3));
 const light=a=>(.2126*a[0]+.7152*a[1]+.0722*a[2])/255;
 function extract(pixels){const bins=new Map();for(let i=0;i<pixels.length;i+=4){if(pixels[i+3]<200)continue;const c=[pixels[i],pixels[i+1],pixels[i+2]],key=c.map(v=>Math.floor(v/32)).join(',');let b=bins.get(key);if(!b){b={count:0,sum:[0,0,0]};bins.set(key,b);}b.count++;c.forEach((v,j)=>b.sum[j]+=v);}
  const chosen=[];for(const b of [...bins.values()].sort((a,b)=>b.count-a.count)){const c=b.sum.map(v=>Math.round(v/b.count));if(chosen.every(q=>distance(c,q)>.12))chosen.push(c);if(chosen.length===3)break;}
  if(!chosen.length)return ['#dddddd','#999999','#555555'];while(chosen.length<3)chosen.push([...chosen[chosen.length-1]]);return chosen.map(c=>'#'+c.map(v=>v.toString(16).padStart(2,'0')).join(''));
 }
 function fits(r,w,l){return !w&&!l||(r.widthCm<=w&&r.lengthCm<=l)||(r.widthCm<=l&&r.lengthCm<=w);}
 function rank(catalog,colors,options={}){return catalog.filter(r=>fits(r,options.width||0,options.length||0)).map(r=>{const p=r.palette.map(rgb),roles=colors.map(h=>{const c=rgb(h);const nearest=p.reduce((a,b)=>distance(c,a)<distance(c,b)?a:b);return {similarity:1-distance(c,nearest),color:'#'+nearest.map(v=>v.toString(16).padStart(2,'0')).join('')};});const similarity=roles.reduce((s,r)=>s+r.similarity,0)/roles.length,contrast=Math.max(...p.map(c=>Math.max(0,1-Math.abs(Math.abs(light(c)-light(rgb(colors[2])))-.45)/.55))),color=options.mode==='contrast'?.65*similarity+.35*contrast:similarity,pattern=options.pattern==='any'||!options.pattern?null:(options.pattern===r.pattern?1:0),score=pattern===null?color*100:color*80+pattern*20;return {...r,score:Math.round(score),colorScore:Math.round(color*100),patternScore:pattern===null?null:pattern*20,roles};}).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));}
 const api={rgb,distance,extract,fits,rank};if(typeof module!=='undefined')module.exports=api;else root.RugMatch=api;
})(typeof window!=='undefined'?window:globalThis);
