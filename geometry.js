(function(root){
 const valid=p=>p.length===4&&p.every(q=>q.every(Number.isFinite)&&q[0]>=0&&q[0]<=1&&q[1]>=0&&q[1]<=1)&&p.every((a,i)=>{const b=p[(i+1)%4],c=p[(i+2)%4];return(b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0])>.001;});
 function transform(p,w,h,scale=1,deg=0,dx=0,dy=0){const cx=p.reduce((n,q)=>n+q[0],0)/4,cy=p.reduce((n,q)=>n+q[1],0)/4,a=deg*Math.PI/180;return p.map(q=>{const x=(q[0]-cx)*w*scale,y=(q[1]-cy)*h*scale;return[cx+(x*Math.cos(a)-y*Math.sin(a))/w+dx,cy+(x*Math.sin(a)+y*Math.cos(a))/h+dy];});}
 function projector(p){const[a,b,c,d]=p,dx1=b[0]-c[0],dx2=d[0]-c[0],dy1=b[1]-c[1],dy2=d[1]-c[1],sx=a[0]-b[0]+c[0]-d[0],sy=a[1]-b[1]+c[1]-d[1],det=dx1*dy2-dx2*dy1,g=(sx*dy2-dx2*sy)/det,h=(dx1*sy-sx*dy1)/det;return(u,v)=>{const z=g*u+h*v+1;return[((b[0]-a[0]+g*b[0])*u+(d[0]-a[0]+h*d[0])*v+a[0])/z,((b[1]-a[1]+g*b[1])*u+(d[1]-a[1]+h*d[1])*v+a[1])/z];};}
 const api={valid,transform,projector};if(typeof module!=='undefined')module.exports=api;else root.RugGeometry=api;
})(typeof window!=='undefined'?window:this);
