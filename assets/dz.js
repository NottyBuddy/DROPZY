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


/* Three.js violet icosahedron and undulating plexus particle field */
(()=>{
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const boot=()=>{
  if(!window.THREE||document.getElementById('bt-plexus-bg'))return;
  const THREE=window.THREE,canvas=document.createElement('canvas');canvas.id='bt-plexus-bg';document.body.prepend(canvas);
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.setSize(innerWidth,innerHeight);renderer.setClearColor(0x000000,0);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,120);camera.position.set(0,0,17);
  const group=new THREE.Group();scene.add(group);
  const geo=new THREE.IcosahedronGeometry(3.0,2),wire=new THREE.WireframeGeometry(geo),mesh=new THREE.LineSegments(wire,new THREE.LineBasicMaterial({color:0xb66cff,transparent:true,opacity:.48}));group.add(mesh);
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(2.94,2),new THREE.MeshBasicMaterial({color:0x8b35d2,wireframe:true,transparent:true,opacity:.12}));group.add(core);
  const points=[],colors=[],count=1800;
  for(let i=0;i<count;i++){const x=(Math.random()-.5)*29,z=(Math.random()-.5)*18,y=(Math.random()-.5)*8;points.push(x,y,z);const c=new THREE.Color().setHSL(.76+Math.random()*.08,.78,.48+Math.random()*.25);colors.push(c.r,c.g,c.b)}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(points,3));pg.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  const particles=new THREE.Points(pg,new THREE.PointsMaterial({size:.035,vertexColors:true,transparent:true,opacity:.78,depthWrite:false}));scene.add(particles);
  const waveGeo=new THREE.BufferGeometry(),wavePts=[],waveCols=[],segmentsX=100,segmentsZ=34;
  for(let z=0;z<segmentsZ;z++)for(let x=0;x<segmentsX;x++){wavePts.push((x/(segmentsX-1)-.5)*28,0,(z/(segmentsZ-1)-.5)*13);waveCols.push(.62,.27,.92)}
  const indices=[];for(let z=0;z<segmentsZ-1;z++)for(let x=0;x<segmentsX-1;x++){const a=z*segmentsX+x,b=a+1,c=a+segmentsX,d=c+1;indices.push(a,b,b,d,d,c,c,a)}
  waveGeo.setAttribute('position',new THREE.Float32BufferAttribute(wavePts,3));waveGeo.setIndex(indices);
  const wave=new THREE.LineSegments(waveGeo,new THREE.LineBasicMaterial({color:0x873bd1,transparent:true,opacity:.25}));scene.add(wave);
  const bokeh=new THREE.Group();scene.add(bokeh);
  for(let i=0;i<22;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.12+Math.random()*.32,12,12),new THREE.MeshBasicMaterial({color:i%3===0?0xd69aff:0x762bb8,transparent:true,opacity:.07+Math.random()*.09}));m.position.set((Math.random()-.5)*25,(Math.random()-.5)*13,-2-Math.random()*9);bokeh.add(m)}
  const base=pg.attributes.position.array.slice(),waveBase=waveGeo.attributes.position.array.slice();let mx=0,my=0,tx=0,ty=0;
  window.addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5)*.65;ty=(e.clientY/innerHeight-.5)*-.45},{passive:true});
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7))});
  const clock=new THREE.Clock();
  const animate=()=>{requestAnimationFrame(animate);const t=clock.getElapsedTime();mx+=(tx-mx)*.018;my+=(ty-my)*.018;group.rotation.y=t*.075+mx;group.rotation.x=Math.sin(t*.16)*.13+my;mesh.rotation.z=Math.sin(t*.11)*.08;core.rotation.y=-t*.09;
   const p=pg.attributes.position.array;for(let i=0;i<count;i++){const k=i*3;p[k+1]=base[k+1]+Math.sin(base[k]*.34+t*.55+base[k+2]*.24)*.34+Math.cos(base[k+2]*.4-t*.32)*.18}pg.attributes.position.needsUpdate=true;
   const w=waveGeo.attributes.position.array;for(let i=0;i<w.length/3;i++){const k=i*3,x=waveBase[k],z=waveBase[k+2];w[k+1]=waveBase[k+1]+Math.sin(x*.42+t*.55+z*.35)*.48+Math.cos(z*.7-t*.38)*.25}waveGeo.attributes.position.needsUpdate=true;
   particles.rotation.y=mx*.22;particles.rotation.x=my*.18;bokeh.children.forEach((o,i)=>{o.position.y+=Math.sin(t*.25+i)*.0009;o.material.opacity=.045+.045*(.5+.5*Math.sin(t*.35+i))});camera.position.x=mx*.8;camera.position.y=my*.7;camera.lookAt(0,0,0);renderer.render(scene,camera)};
  animate();
 };
 if(window.THREE){boot();return}
 const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.onload=boot;s.onerror=()=>console.warn('Three.js background could not load');document.head.appendChild(s);
})();
