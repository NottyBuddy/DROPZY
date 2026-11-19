/* Add slow ambient gradient forms behind every page */
(()=>{
 if(document.querySelector('.ambient-shapes'))return;
 const layer=document.createElement('div');layer.className='ambient-shapes';layer.setAttribute('aria-hidden','true');
 for(let n=0;n<3;n++)layer.appendChild(document.createElement('i'));
 document.body.prepend(layer);
})();
(()=>{const body=document.body;const navToggle=document.querySelector('[data-sidebar-toggle]');if(navToggle){navToggle.addEventListener('click',()=>{body.classList.toggle('sidebar-collapsed');localStorage.setItem('dz-nav-collapsed',body.classList.contains('sidebar-collapsed')?'1':'0')});if(localStorage.getItem('dz-nav-collapsed')==='1')body.classList.add('sidebar-collapsed')}const more=document.querySelector('[data-more]');if(more){more.addEventListener('click',()=>{const menu=document.querySelector('.more-menu');menu.classList.toggle('open');more.setAttribute('aria-expanded',menu.classList.contains('open')?'true':'false')});document.addEventListener('click',e=>{if(!e.target.closest('.more-wrap'))document.querySelector('.more-menu')?.classList.remove('open')})}const intro=document.querySelector('.intro');if(intro){const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const introAudio=new Audio('se_orita_instrumental_20261030222432.mp3');introAudio.preload='auto';introAudio.loop=false;introAudio.controls=false;introAudio.volume=1;const stopIntroAudio=()=>{introAudio.pause();introAudio.currentTime=0};let audioStarted=false;const startIntroAudio=()=>{if(audioStarted)return;introAudio.play().then(()=>{audioStarted=true}).catch(()=>{});};startIntroAudio();['pointerdown','touchstart','keydown'].forEach(ev=>window.addEventListener(ev,startIntroAudio,{once:true,passive:true}));setTimeout(stopIntroAudio,9000);setTimeout(()=>location.replace('discover.html'),reduce?1600:9000)}document.querySelectorAll('[data-search]').forEach(input=>input.addEventListener('keydown',e=>{if(e.key==='Enter'&&input.value.trim())location.href='discover.html?q='+encodeURIComponent(input.value.trim())}));document.querySelectorAll('[data-account]').forEach(b=>b.addEventListener('click',()=>alert('Account creation will be added later. Browsing remains open without login.')));document.querySelectorAll('.main').forEach(el=>el.classList.add('page-enter'));if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.language-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.transform='perspective(900px) rotateX('+((.5-y)*7)+'deg) rotateY('+((x-.5)*9)+'deg) translateY(-5px)'});card.addEventListener('pointerleave',()=>card.style.transform='')})}const bottomMore=document.querySelector('[data-bottom-more]');if(bottomMore){bottomMore.addEventListener('click',e=>{e.stopPropagation();const menu=document.querySelector('.beat-more-menu');menu.classList.toggle('open');bottomMore.setAttribute('aria-expanded',menu.classList.contains('open')?'true':'false')});document.addEventListener('click',e=>{if(!e.target.closest('.beat-more-wrap')){document.querySelector('.beat-more-menu')?.classList.remove('open');bottomMore.setAttribute('aria-expanded','false')}})} })();

/* Reliable touch-swipe navigation: drag across the dock and release on a destination */
(()=>{
 const dock=document.querySelector('.beat-bottom-nav'); if(!dock)return;
 let active=false,moved=false,pointer=null,startX=0,startY=0,current=null;
 const itemAt=(x,y)=>{
   const el=document.elementFromPoint(x,y);
   const item=el?.closest('.beat-bottom-nav > a, .beat-bottom-nav [data-bottom-more]');
   return item&&dock.contains(item)?item:null;
 };
 const clear=()=>dock.querySelectorAll('.dock-swipe-target').forEach(n=>n.classList.remove('dock-swipe-target'));
 dock.addEventListener('pointerdown',e=>{
   if(e.pointerType==='mouse')return;
   const item=itemAt(e.clientX,e.clientY); if(!item)return;
   active=true;moved=false;pointer=e.pointerId;startX=e.clientX;startY=e.clientY;current=item;
   clear();item.classList.add('dock-swipe-target');
 });
 document.addEventListener('pointermove',e=>{
   if(!active||e.pointerId!==pointer)return;
   if(Math.hypot(e.clientX-startX,e.clientY-startY)>10)moved=true;
   if(moved){e.preventDefault();const item=itemAt(e.clientX,e.clientY);if(item&&item!==current){current=item;clear();item.classList.add('dock-swipe-target');}}
 },{passive:false});
 document.addEventListener('pointerup',e=>{
   if(!active||e.pointerId!==pointer)return;
   const chosen=itemAt(e.clientX,e.clientY)||current;
   active=false;clear();
   if(moved&&chosen){
     e.preventDefault();
     if(chosen.matches('a'))location.assign(chosen.href);
     else chosen.click();
   }
   pointer=null;current=null;
 },true);
 document.addEventListener('pointercancel',e=>{if(active&&e.pointerId===pointer){active=false;clear();pointer=null;current=null;}},true);
})();


/* Hand-drawn navigation icon set */
(()=>{
 const paths={
 'discover.html':'<path d="M10.8 3.8a7 7 0 1 0 4.9 12l4.5 4.4"/><path d="m14.7 14.7 5.5 5.5"/><path d="M7.5 10.8h6.2M10.6 7.7v6.2"/>',
 'trending.html':'<path d="M4 18.5 9 13l3.2 3.1L20 7.5"/><path d="M14.5 7.5H20v5.5"/><path d="M4 21h16"/>',
 'genre.html':'<path d="m12 2.8 8.5 5v8.4l-8.5 5-8.5-5V7.8z"/><path d="m3.8 7.9 8.2 4.8 8.2-4.8M12 12.7v8.1"/><circle cx="12" cy="8" r="1.5"/>',
 'my-music.html':'<path d="M12 20.5S3.5 15.4 3.5 9.4a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 6-8.5 11.1-8.5 11.1Z"/><path d="M8 12.2h2l1.2-2.1 1.8 4 1.1-1.9H17"/>',
 'radio.html':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.7"/><path d="m5.6 5.6 2 2M18.4 5.6l-2 2"/>',
 'create.html':'<path d="M12 3v18M3 12h18"/><path d="m5.5 5.5 13 13m0-13-13 13"/>',
 'stemtracks.html':'<path d="M4 7h16M4 12h16M4 17h16"/><path d="M8 4v6m8-1v6m-5-1v6"/>',
 'settings.html':'<path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"/><path d="m19.4 13.8 1.1.9-1.5 2.6-1.4-.5a7.8 7.8 0 0 1-1.7 1l-.3 1.5h-3l-.3-1.5a7.8 7.8 0 0 1-1.7-1l-1.4.5-1.5-2.6 1.1-.9a7 7 0 0 1 0-2l-1.1-.9 1.5-2.6 1.4.5a7.8 7.8 0 0 1 1.7-1l.3-1.5h3l.3 1.5a7.8 7.8 0 0 1 1.7 1l1.4-.5 1.5 2.6-1.1.9a7 7 0 0 1 0 2Z"/>'
 };
 document.querySelectorAll('.side-nav a,.beat-bottom-nav a,.beat-more-menu a').forEach(a=>{
  const key=(a.getAttribute('href')||'').split('/').pop(),d=paths[key];if(!d)return;
  let icon=a.querySelector('svg');
  if(!icon){icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('aria-hidden','true');a.prepend(icon);}
  icon.innerHTML=d;
 });
})();
