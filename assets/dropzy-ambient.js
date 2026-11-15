/* DROPZY ambient motion + global usability helpers */
(()=>{
 if(window.__dropzyAmbientLoaded)return;window.__dropzyAmbientLoaded=true;
 const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const canvas=document.createElement('canvas');canvas.className='dropzy-ambient-canvas';canvas.setAttribute('aria-hidden','true');
 document.body.prepend(canvas);
 const ctx=canvas.getContext('2d',{alpha:true});
 let w=0,h=0,dpr=1,raf=0,points=[],pointer={x:-1000,y:-1000};
 const resize=()=>{dpr=Math.min(window.devicePixelRatio||1,1.5);w=window.innerWidth;h=window.innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(42,Math.max(18,Math.round(w*h/30000)));points=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5+.45,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.18,a:Math.random()*.38+.12,p:Math.random()*6.28}));};
 const draw=()=>{ctx.clearRect(0,0,w,h);for(let i=0;i<points.length;i++){const p=points[i];p.x+=p.vx;p.y+=p.vy;p.p+=.012;if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;if(p.y<-10)p.y=h+10;if(p.y>h+10)p.y=-10;const alpha=p.a*(.72+.28*Math.sin(p.p));ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(229,72,94,'+alpha+')';ctx.fill();for(let j=i+1;j<points.length;j++){const q=points[j],dx=p.x-q.x,dy=p.y-q.y,dist=Math.hypot(dx,dy);if(dist<105){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(220,65,88,'+((1-dist/105)*.07)+')';ctx.lineWidth=.7;ctx.stroke();}}const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);if(dist<115){p.x+=dx/dist*.018;p.y+=dy/dist*.018;}}raf=requestAnimationFrame(draw);};
 resize();window.addEventListener('resize',resize,{passive:true});
 window.addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;},{passive:true});
 if(ctx&&!reduce)draw();
 const progress=document.createElement('div');progress.id='dz-scroll-progress';document.body.append(progress);
 const top=document.createElement('button');top.id='dz-back-top';top.type='button';top.setAttribute('aria-label','Back to top');top.textContent='↑';document.body.append(top);
 const toast=document.createElement('div');toast.id='dz-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.append(toast);
 let toastTimer;window.dropzyToast=(message)=>{toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),2300);};
 const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';top.classList.toggle('visible',scrollY>420);};
 window.addEventListener('scroll',onScroll,{passive:true});onScroll();
 top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){const field=document.querySelector('.search');if(field){e.preventDefault();field.focus();}}if(e.key==='Escape'&&document.activeElement&&document.activeElement.matches('input'))document.activeElement.blur();});
 const search=document.querySelector('header .search');
 if(search){search.setAttribute('aria-label','Search DROPZY');search.setAttribute('placeholder','⌕  Search music');search.addEventListener('keydown',e=>{if(e.key==='Enter'&&search.value.trim()){e.preventDefault();window.location.href='search.html?q='+encodeURIComponent(search.value.trim());}});}
 const query=new URLSearchParams(location.search).get('q');
 if(query&&document.getElementById('mainstream-search')){const field=document.getElementById('mainstream-search');field.value=query;const go=document.getElementById('mainstream-go');if(go)setTimeout(()=>go.click(),180);}
 document.querySelectorAll('.mobile-dock a').forEach(a=>{if(a.href&&new URL(a.href,location.href).pathname===location.pathname)a.classList.add('active');});
 window.addEventListener('pagehide',()=>{if(raf)cancelAnimationFrame(raf);},{once:true});
})();