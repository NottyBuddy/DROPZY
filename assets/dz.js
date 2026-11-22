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
 'discover.html':'<path d="M10.8 3.5a7.3 7.3 0 1 0 5.1 12.2l4.6 4.6"/><path d="m15.6 15.6 4.9 4.9"/><path d="M8 10.8h5.8"/>',
 'trending.html':'<path d="M4 18.5 9.2 13l3.3 3.1L20.5 7"/><path d="M14.5 7h6v6"/>',
 'genre.html':'<path d="m12 2.8 8.7 5v8.4l-8.7 5-8.7-5V7.8z"/><path d="m3.7 7.9 8.3 4.8 8.3-4.8M12 12.7v8.1"/>',
 'my-music.html':'<path d="M20.5 8.8c0 5.2-8.5 10.8-8.5 10.8S3.5 14 3.5 8.8a4.6 4.6 0 0 1 8.5-2.4 4.6 4.6 0 0 1 8.5 2.4Z"/><path d="M8 12h2l1.2-2.2 1.8 4.2 1.2-2H17"/>',
 'radio.html':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><path d="m8 8 8 8m0-8-8 8"/>',
 'create.html':'<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/>',
 'stemtracks.html':'<path d="M4 7h16M4 12h16M4 17h16"/><path d="M8 4v6m8-1v6m-5-1v6"/>',
 'settings.html':'<circle cx="12" cy="12" r="3.2"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z"/>'
 };;
 document.querySelectorAll('.side-nav a,.beat-bottom-nav a,.beat-more-menu a').forEach(a=>{
  const key=(a.getAttribute('href')||'').split('/').pop(),d=paths[key];if(!d)return;
  let icon=a.querySelector('svg');
  if(!icon){icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('aria-hidden','true');a.prepend(icon);}
  icon.innerHTML=d;
 });
})();


/* Ambient animated gradient background is CSS-only for lower GPU and network cost. */

/* Persistent global appearance control in every page header */
(()=>{
 const root=document.documentElement;
 const read=()=>{try{return localStorage.getItem('beat-treat-theme')||'dark'}catch(e){return 'dark'}};
 const apply=theme=>{
  root.dataset.theme=theme;
  try{localStorage.setItem('beat-treat-theme',theme)}catch(e){}
  const button=document.querySelector('.appearance-toggle');
  if(button){
   const light=theme==='light';
   button.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');
   button.setAttribute('aria-pressed',light?'true':'false');
   button.title=light?'Switch to dark mode':'Switch to light mode';
   button.innerHTML=(light
    ?'<svg class="appearance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"/></svg>'
    :'<svg class="appearance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>')
    +'<span class="appearance-label">'+(light?'Light':'Dark')+'</span><span class="appearance-track" aria-hidden="true"><i class="appearance-knob"></i></span>';
  }
 };
 apply(read());
 const topbar=document.querySelector('.topbar');
 if(topbar&&!topbar.querySelector('.appearance-toggle')){
  const button=document.createElement('button');
  button.type='button';button.className='appearance-toggle';
  button.addEventListener('click',()=>apply(root.dataset.theme==='light'?'dark':'light'));
  topbar.appendChild(button);apply(read());
 }
})();

/* Bind the real, server-rendered appearance buttons on every page */
(()=>{
 const root=document.documentElement;
 const getTheme=()=>{try{return localStorage.getItem('beat-treat-theme')||'dark'}catch(e){return 'dark'}};
 const render=()=>{
  const light=root.dataset.theme==='light';
  document.querySelectorAll('.appearance-toggle').forEach(button=>{
   button.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');
   button.setAttribute('aria-pressed',light?'true':'false');
   button.title=light?'Switch to dark mode':'Switch to light mode';
   button.innerHTML=(light
    ?'<svg class="appearance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"/></svg>'
    :'<svg class="appearance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>')
    +'<span class="appearance-label">'+(light?'Light':'Dark')+'</span><span class="appearance-track" aria-hidden="true"><i class="appearance-knob"></i></span>';
  });
 };
 root.dataset.theme=getTheme();
 render();
 document.querySelectorAll('.appearance-toggle').forEach(button=>{
  button.addEventListener('click',()=>{
   const next=root.dataset.theme==='light'?'dark':'light';
   root.dataset.theme=next;
   try{localStorage.setItem('beat-treat-theme',next)}catch(e){}
   render();
  });
 });
})();


/* Consistent theme persistence, page transitions and per-theme brand artwork */
(()=>{
 const root=document.documentElement, key='beat-treat-theme';
 const read=()=>{try{return localStorage.getItem(key)==='light'?'light':'dark'}catch(e){return 'dark'}};
 const paint=theme=>{
  root.dataset.theme=theme;
  document.querySelectorAll('.appearance-toggle').forEach(button=>{
   const light=theme==='light';
   button.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');
   button.setAttribute('aria-pressed',light?'true':'false');
   button.title=light?'Switch to dark mode':'Switch to light mode';
   button.innerHTML=(light
    ?'<svg class="appearance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"/></svg>'
    :'<svg class="appearance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>')
    +'<span class="appearance-label">'+(light?'Light':'Dark')+'</span><span class="appearance-track" aria-hidden="true"><i class="appearance-knob"></i></span>';
  });
  document.querySelectorAll('img[src*="dz-mark"]').forEach(img=>{
   const next=theme==='light'?'assets/dz-mark-light.svg?v=1':'assets/dz-mark.svg?v=4';
   if(!img.src.endsWith(next))img.src=next;
  });
 };
 // Capture once so older page-specific handlers cannot double-toggle or desync.
 document.addEventListener('click',e=>{
  const button=e.target.closest('.appearance-toggle');if(!button)return;
  e.preventDefault();e.stopImmediatePropagation();
  const next=root.dataset.theme==='light'?'dark':'light';
  root.classList.add('theme-transition');
  try{localStorage.setItem(key,next)}catch(err){}
  paint(next);
  requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove('theme-transition')));
 },true);
 window.addEventListener('pageshow',()=>paint(read()));
 window.addEventListener('storage',e=>{if(e.key===key)paint(read())});
 paint(read());
})();


/* Step 2 — global player interface shell (no catalogue or audio source) */
(()=>{
 if(document.querySelector('.bt-player')||(document.querySelector('.intro')&&!document.querySelector('.app-shell')))return;
 const dock=document.createElement('section');
 dock.className='bt-player';
 dock.setAttribute('aria-label','Music player');
 dock.innerHTML=`
  <button class="bt-player-main" type="button" data-player-open aria-label="Open player">
   <span class="bt-player-art" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
   <span class="bt-player-copy"><strong>Nothing playing</strong><small>Select audio when a source is connected</small></span>
   <span class="bt-player-state">PLAYER</span>
  </button>
  <div class="bt-player-actions">
   <button type="button" class="bt-player-control" disabled aria-label="Previous track">‹</button>
   <button type="button" class="bt-player-play" disabled aria-label="Play">▶</button>
   <button type="button" class="bt-player-control" disabled aria-label="Next track">›</button>
   <button type="button" class="bt-player-expand" data-player-open aria-label="Expand player">⌃</button>
  </div>
  <div class="bt-player-progress" aria-hidden="true"><i></i></div>`;
 const overlay=document.createElement('div');
 overlay.className='bt-player-overlay';
 overlay.hidden=true;
 overlay.innerHTML=`
  <div class="bt-player-backdrop" data-player-close></div>
  <section class="bt-player-sheet" role="dialog" aria-modal="true" aria-labelledby="bt-player-title">
   <header class="bt-player-sheet-head"><span class="bt-player-kicker">NOW PLAYING</span><button type="button" data-player-close aria-label="Close player">×</button></header>
   <div class="bt-player-hero"><div class="bt-player-art bt-player-art-large" aria-hidden="true"><i></i><i></i><i></i><i></i></div><h2 id="bt-player-title">Nothing playing</h2><p>No audio selected</p></div>
   <div class="bt-player-timeline"><span>--:--</span><input type="range" min="0" max="100" value="0" disabled aria-label="Track progress"><span>--:--</span></div>
   <div class="bt-player-sheet-controls"><button disabled aria-label="Previous track">‹</button><button class="bt-player-sheet-play" disabled aria-label="Play">▶</button><button disabled aria-label="Next track">›</button></div>
   <div class="bt-player-volume"><span>Volume</span><input type="range" min="0" max="100" value="70" aria-label="Volume"></div>
   <div class="bt-player-tabs" role="tablist" aria-label="Player panels"><button class="active" type="button" role="tab" aria-selected="true" data-player-tab="queue">Queue</button><button type="button" role="tab" aria-selected="false" data-player-tab="lyrics">Lyrics</button></div>
   <div class="bt-player-tab-content" data-player-panel="queue"><strong>Your queue is empty</strong><p>Tracks will appear here when audio is available.</p></div>
   <div class="bt-player-tab-content" data-player-panel="lyrics" hidden><strong>Lyrics unavailable</strong><p>Choose a track with a supported lyrics source to view synced lyrics.</p></div>
  </section>`;
 document.body.append(dock,overlay);
 const open=()=>{overlay.hidden=false;document.body.classList.add('bt-player-open');overlay.querySelector('button[data-player-close]').focus()};
 const close=()=>{overlay.hidden=true;document.body.classList.remove('bt-player-open');dock.querySelector('[data-player-open]').focus()};
 dock.querySelectorAll('[data-player-open]').forEach(b=>b.addEventListener('click',open));
 overlay.querySelectorAll('[data-player-close]').forEach(b=>b.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)close()});
 overlay.querySelectorAll('[data-player-tab]').forEach(tab=>tab.addEventListener('click',()=>{
  overlay.querySelectorAll('[data-player-tab]').forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active))});
  overlay.querySelectorAll('[data-player-panel]').forEach(p=>p.hidden=p.dataset.playerPanel!==tab.dataset.playerTab);
 }));
})();


/* Step 3 — Discover search and Trending filters; UI-only, no catalogue */
(()=>{
 const search=document.querySelector('[data-search]');
 if(search){
  const grid=document.querySelector('.language-grid');const cards=grid?[...grid.querySelectorAll('.language-card')]:[];const panel=search.closest('.panel');let status=panel&&panel.querySelector('[data-search-status]');
  if(!status&&panel){status=document.createElement('p');status.className='bt-search-status';status.dataset.searchStatus='';status.setAttribute('role','status');status.setAttribute('aria-live','polite');panel.append(status)}
  const apply=raw=>{const q=(raw||'').toLocaleLowerCase().trim();let shown=0;cards.forEach(card=>{const match=!q||(card.textContent||'').toLocaleLowerCase().includes(q);card.hidden=!match;if(match)shown++});if(status)status.textContent=q?(shown?shown+' matching category found.':'No category matches '+raw.trim()+'. Song and artist results need a connected catalogue.'):'Search categories by language. Song and artist results need a connected catalogue.';if(grid)grid.classList.toggle('bt-search-empty',!!q&&shown===0);const url=new URL(location.href);if(q)url.searchParams.set('q',raw.trim());else url.searchParams.delete('q');history.replaceState({},'',url.pathname+url.search+url.hash)};
  const initial=new URLSearchParams(location.search).get('q')||'';if(initial)search.value=initial;search.addEventListener('input',()=>apply(search.value));search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();apply(search.value);search.blur()}},true);panel&&panel.querySelectorAll('.suggestions button').forEach(button=>button.addEventListener('click',()=>{search.value=button.textContent.trim();apply(search.value);search.focus()}));apply(initial);
 }
 const filters=document.querySelector('[data-trending-filters]');if(filters){const buttons=[...filters.querySelectorAll('button')];const status=document.querySelector('[data-trending-status]');buttons.forEach(button=>{button.type='button';button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{buttons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});if(status){const strong=document.createElement('strong');strong.textContent=button.textContent.trim()+' selected';const span=document.createElement('span');span.textContent='Regional chart layout is ready. Live chart data will appear after a music catalogue is connected.';status.replaceChildren(strong,span)}})})}
})();


/* Step 4 — My Music library and browser-local playlists; no sample tracks */
(()=>{
 const root=document.querySelector('[data-library]');if(!root)return;
 const key='beat-treat-playlists-v1',tabs=[...root.querySelectorAll('[data-library-tab]')],panels=[...root.querySelectorAll('[data-library-panel]')],grid=root.querySelector('[data-playlist-grid]'),empty=root.querySelector('[data-playlist-empty]'),dialog=root.querySelector('[data-playlist-dialog]'),form=root.querySelector('[data-playlist-form]'),input=root.querySelector('#bt-playlist-name'),error=root.querySelector('[data-playlist-error]');
 let playlists=[];try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))playlists=saved.filter(p=>p&&typeof p.id==='string'&&typeof p.name==='string').slice(0,100)}catch(e){}
 let editing=null;
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(playlists));return true}catch(e){return false}};
 const show=name=>{tabs.forEach(t=>{const active=t.dataset.libraryTab===name;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active))});panels.forEach(p=>p.hidden=p.dataset.libraryPanel!==name)};
 const escape=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const render=()=>{grid.replaceChildren();playlists.forEach(item=>{const card=document.createElement('article');card.className='bt-playlist-card';card.innerHTML='<span class="bt-playlist-art" aria-hidden="true">♫</span><div class="bt-playlist-info"><strong>'+escape(item.name)+'</strong><small>0 tracks · Your playlist</small></div><div class="bt-playlist-actions"><button type="button" data-edit="'+escape(item.id)+'" aria-label="Rename '+escape(item.name)+'">Rename</button><button type="button" data-delete="'+escape(item.id)+'" aria-label="Delete '+escape(item.name)+'">Delete</button></div>';grid.append(card)});empty.hidden=playlists.length>0;root.querySelector('[data-playlist-count]').textContent=playlists.length?playlists.length+' playlist'+(playlists.length===1?'':'s'):'No playlists yet'};
 const open=(item)=>{editing=item?item.id:null;root.querySelector('#bt-playlist-title').textContent=item?'Rename playlist':'Create playlist';input.value=item?item.name:'';form.querySelector('.bt-dialog-save').textContent=item?'Save changes':'Create';error.textContent='';if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');setTimeout(()=>input.focus(),0)};
 const close=()=>{if(typeof dialog.close==='function'&&dialog.open)dialog.close();else dialog.removeAttribute('open')};
 tabs.forEach(t=>t.addEventListener('click',()=>show(t.dataset.libraryTab)));
 root.querySelectorAll('[data-library-jump]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.libraryJump)));
 root.querySelectorAll('[data-create-playlist]').forEach(b=>b.addEventListener('click',()=>open(null)));
 root.querySelectorAll('[data-playlist-close]').forEach(b=>b.addEventListener('click',close));
 form.addEventListener('submit',e=>{e.preventDefault();const name=input.value.trim();if(!name){error.textContent='Enter a playlist name.';return}if(editing){const item=playlists.find(p=>p.id===editing);if(item)item.name=name}else playlists.unshift({id:'pl-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),name});if(!save()){error.textContent='Could not save in this browser. Check available storage and try again.';return}render();show('playlists');close()});
 grid.addEventListener('click',e=>{const edit=e.target.closest('[data-edit]'),del=e.target.closest('[data-delete]');if(edit){const item=playlists.find(p=>p.id===edit.dataset.edit);if(item)open(item)}if(del){const item=playlists.find(p=>p.id===del.dataset.delete);if(item&&confirm('Delete playlist “'+item.name+'”?')){playlists=playlists.filter(p=>p.id!==item.id);save();render()}}});
 dialog.addEventListener('click',e=>{if(e.target===dialog)close()});
 render();show('all');
})();
/* Step 5 — Radio preference builder; recommendations remain catalogue-dependent */
(()=>{
 const root=document.querySelector('[data-radio]');if(!root)return;
 const moodButtons=[...root.querySelectorAll('[data-mood]')],typeButtons=[...root.querySelectorAll('[data-station]')],energy=root.querySelector('[data-radio-energy]'),energyLabel=root.querySelector('[data-energy-label]'),moodLabel=root.querySelector('[data-radio-mood-label]'),summary=root.querySelector('[data-radio-summary]'),message=root.querySelector('[data-radio-message]');
 const storageKey='beat-treat-radio-preferences-v1';let mood='',station='';
 const energyName=value=>value<30?'Soft':value<70?'Balanced':'High energy';
 const update=()=>{const value=Number(energy.value);energyLabel.textContent=energyName(value);moodLabel.textContent=mood||'Choose one mood';summary.textContent=mood&&station?mood+' · '+station:'Set your preferences';message.textContent=mood&&station?'Your radio setup is ready to save. Live stations are not connected yet.':'Select a mood and station style to prepare your radio setup.'};
 moodButtons.forEach(b=>b.addEventListener('click',()=>{mood=mood===b.dataset.mood?'':b.dataset.mood;moodButtons.forEach(x=>{const on=x.dataset.mood===mood;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on))});update()}));
 typeButtons.forEach(b=>b.addEventListener('click',()=>{station=station===b.dataset.station?'':b.dataset.station;typeButtons.forEach(x=>{const on=x.dataset.station===station;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on))});update()}));
 energy.addEventListener('input',update);
 try{const saved=JSON.parse(localStorage.getItem(storageKey)||'null');if(saved){mood=typeof saved.mood==='string'?saved.mood:'';station=typeof saved.station==='string'?saved.station:'';energy.value=String(Math.max(0,Math.min(100,Number(saved.energy)||0)));moodButtons.forEach(b=>{const on=b.dataset.mood===mood;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});typeButtons.forEach(b=>{const on=b.dataset.station===station;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))})}}catch(e){}
 root.querySelector('[data-radio-save]').addEventListener('click',()=>{if(!mood||!station){message.textContent='Choose both a mood and a station style first.';return}try{localStorage.setItem(storageKey,JSON.stringify({mood,station,energy:Number(energy.value)}));message.textContent='Preferences saved in this browser. Radio playback is waiting for a catalogue connection.'}catch(e){message.textContent='Could not save preferences in this browser. Check available storage and try again.'}});
 update();
})();
/* Step 6 — Mix Lab control surface; intentionally no audio engine */
(()=>{
 const root=document.querySelector('[data-mixlab]');if(!root)return;
 const deckButtons=[...root.querySelectorAll('[data-decks]')],decks=[...root.querySelectorAll('[data-deck]')],modeButtons=[...root.querySelectorAll('[data-mix-mode]')],state=root.querySelector('[data-mix-state]'),note=root.querySelector('[data-mix-note]');
 deckButtons.forEach(b=>b.addEventListener('click',()=>{const count=Number(b.dataset.decks);deckButtons.forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on))});decks.forEach(d=>{d.hidden=d.dataset.deck==='C'&&count!==3});state.textContent=count+'-deck studio · No audio loaded'}));
 modeButtons.forEach(b=>b.addEventListener('click',()=>{modeButtons.forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on))});note.textContent=b.dataset.mixMode==='guided'?'Guided mode selected. Suggested mix values are unavailable until audio analysis is connected.':'Manual mode selected. Controls are interface previews only; no audio processing is active.'}));
 root.querySelectorAll('[data-deck-action]').forEach(b=>b.addEventListener('click',()=>{const active=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(active));b.classList.toggle('active',active);const deck=b.closest('[data-deck]');state.textContent='Deck '+deck.dataset.deck+' '+b.dataset.deckAction+(active?' enabled':' disabled')+' · Preview only'}));
 const tempo=root.querySelector('[data-tempo]'),key=root.querySelector('[data-keyshift]'),cross=root.querySelector('[data-crossfade]');
 const update=()=>{const t=Number(tempo.value),k=Number(key.value),x=Number(cross.value);root.querySelector('[data-tempo-value]').textContent=(t>0?'+':'')+t+'%';root.querySelector('[data-key-value]').textContent=(k>0?'+':'')+k;root.querySelector('[data-master-readout]').textContent=x<45?'Deck A focused':x>55?'Deck B focused':'Balanced mix'};
 [tempo,key,cross].forEach(input=>input.addEventListener('input',update));
 root.querySelector('[data-mix-reset]').addEventListener('click',()=>{tempo.value=0;key.value=0;cross.value=50;root.querySelectorAll('[data-deck] input[type="range"]').forEach(i=>i.value=i.dataset.deckGain!==undefined?75:50);root.querySelectorAll('[data-deck-action]').forEach(b=>{b.setAttribute('aria-pressed','false');b.classList.remove('active')});update();state.textContent='Studio controls reset · No audio loaded';note.textContent='Mix settings reset. Controls remain visual previews until audio processing is connected.'});
 update();
})();

/* Free in-app music catalogue: public, streamable Audius tracks, strict language matching */
(()=>{
 const app=document.querySelector('.app-shell');if(!app)return;
 const LANGS={
  Hindi:{queries:['Hindi song','Hindi vocal song','Hindi bhajan','Hindi ghazal','Hindi folk song'],terms:['hindi','हिंदी']},
  Punjabi:{queries:['Punjabi song','Punjabi vocal song','Punjabi folk song','Punjabi bhajan'],terms:['punjabi','ਪੰਜਾਬੀ']},
  Telugu:{queries:['Telugu song','Telugu vocal song','Telugu folk song','Telugu devotional song'],terms:['telugu','తెలుగు']},
  Marathi:{queries:['Marathi song','Marathi vocal song','Marathi bhajan','Marathi folk song'],terms:['marathi','मराठी']},
  Haryanvi:{queries:['Haryanvi song','Haryanvi vocal song','Haryanvi ragni','Haryanvi folk song'],terms:['haryanvi','हरियाणवी','हरयाणवी']},
  Bhojpuri:{queries:['Bhojpuri song','Bhojpuri vocal song','Bhojpuri folk song','Bhojpuri bhajan'],terms:['bhojpuri','भोजपुरी']},
  Rajasthani:{queries:['Rajasthani song','Marwari song','Rajasthani vocal song','Rajasthani folk song'],terms:['rajasthani','राजस्थानी','marwari','मारवाड़ी']}
 };
 const API='https://api.audius.co/v1';
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const seconds=n=>{n=Math.max(0,Math.floor(Number(n)||0));return Math.floor(n/60)+':'+String(n%60).padStart(2,'0')};
 let language=new URLSearchParams(location.search).get('lang');
 if(!LANGS[language])language='Hindi';
 let query=new URLSearchParams(location.search).get('q')||'';
 let results=[],queue=[],current=-1,loading=false,requestNo=0,playTrack=()=>{};
 const audio=new Audio();audio.preload='none';audio.crossOrigin='anonymous';
 let section=document.querySelector('[data-music-catalog]');
 if(!section){
  section=document.createElement('section');section.className='bt-catalog';section.dataset.musicCatalog='';
  const anchor=document.querySelector('.language-grid')||document.querySelector('[data-trending-status]')||document.querySelector('.page-head');
  if(anchor)anchor.insertAdjacentElement('afterend',section);else app.querySelector('.main')?.append(section);
 }
 section.innerHTML='<div class="bt-catalog-head"><div><p class="eyebrow">FREE · AD-FREE</p><h2>Indian music library</h2><p class="bt-catalog-note">Vocal songs only · No instrumentals, beats or karaoke. In-app playback, no ads and no external redirects.</p></div><span class="bt-source-mark">IN-APP ONLY</span></div><div class="bt-language-pills" data-catalog-languages></div><div class="bt-catalog-state" data-catalog-state role="status" aria-live="polite">Loading free tracks…</div><div class="bt-track-list" data-catalog-list></div>';
 const pills=section.querySelector('[data-catalog-languages]'),state=section.querySelector('[data-catalog-state]'),list=section.querySelector('[data-catalog-list]');
 Object.keys(LANGS).forEach(name=>{const b=document.createElement('button');b.type='button';b.textContent=name;b.dataset.lang=name;b.addEventListener('click',()=>selectLanguage(name,true));pills.append(b)});
 const setState=(title,detail='')=>{state.replaceChildren();const strong=document.createElement('strong');strong.textContent=title;state.append(strong);if(detail){const p=document.createElement('p');p.textContent=detail;state.append(p)}};
 const languageMatches=t=>{
  const fields=[t.title,t.description,t.tags,t.orig_filename,t.permalink].filter(Boolean).join(' ').toLocaleLowerCase();
  const allowed=LANGS[language].terms.some(term=>fields.includes(term));
  const otherLanguage=/\b(english|tamil|kannada|malayalam|bengali|gujarati|odia|urdu|arabic|korean)\b/.test(fields);
  return allowed&&!otherLanguage;
 };
 const paintPills=()=>pills.querySelectorAll('button').forEach(b=>{const on=b.dataset.lang===language;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
 const render=()=>{
  list.replaceChildren();
  results.forEach((t,i)=>{
   const row=document.createElement('article');row.className='bt-track-row';
   const art=document.createElement('img');art.className='bt-track-art';art.alt='';art.loading='lazy';art.src=t.artwork?.['150x150']||t.artwork?.['480x480']||'';
   const copy=document.createElement('div');copy.className='bt-track-copy';
   const title=document.createElement('strong');title.textContent=t.title||'Untitled track';
   const artist=document.createElement('span');artist.textContent=t.user?.name||t.user?.handle||'Independent artist';
   const meta=document.createElement('small');meta.textContent=(t.source||'Audius')+' · '+language+' · '+seconds(t.duration);
   copy.append(title,artist,meta);
   const play=document.createElement('button');play.type='button';play.className='bt-track-play';play.textContent='▶';play.setAttribute('aria-label','Play '+(t.title||'track'));play.addEventListener('click',()=>{queue=results.slice();playTrack(i)});
   row.append(art,copy,play);list.append(row);
  });
  setState(results.length?results.length+' eligible vocal '+language+' songs found':'No eligible vocal '+language+' songs found',results.length?'Tap a track to play inside this player. Downloads are not offered.':'No verified, licensed vocal songs with clear '+language+' metadata were found. Instrumentals and unverified uploads are not substituted.');
 };
 async function load(){
  const ticket=++requestNo;loading=true;results=[];list.replaceChildren();paintPills();setState('Finding free '+language+' vocal songs…');
  const safeLicense=t=>{
   const l=String(t.license||'').toLowerCase().trim().replace(/[_\\s]+/g,'-');
   if(!l||/all-rights-reserved|non.?commercial|by-nc/.test(l))return false;
   return /open-music-license|public-domain|^cc0$|creativecommons.org\\/(?:licenses\\/(?:by|by-sa|by-nd)\\/|publicdomain\\/(?:zero|mark)\\/)|creative-commons-attribution(?:-sharealike|-noderivatives)?/.test(l);
  };
  const suspiciousUpload=t=>/mp3cut|savetube|ytshorts|youtube|official\\s+video|\\bmovie\\b|\\bfilm\\b|soundtrack|song\\s+from|\\bstatus\\b|ringtone|\\bshorts?\\b|mp3\\s*download|full\\s+album|full\\s+movie|video\\s+song|rip|remastered\\s+movie/i.test([t.title,t.orig_filename,t.description].filter(Boolean).join(' '));
  const vocalOnly=t=>{const fields=[t.title,t.description,t.tags,t.orig_filename,t.subject].filter(Boolean).join(' ').toLocaleLowerCase();if(/instrumental|karaoke|backing track|type beat|beat only|drum loop|music loop|background score|soundtrack|underscore|no vocals|without vocals|minus one|dj intro|8d audio/i.test(fields))return false;return /\\b(song|vocal|vocals|lyrics|singer|sung|live performance|bhajan|qawwali|ghazal|geet|gana|gaana|folk song|original song|ragni|ragini|lok geet)\\b|गीत|गाना|भजन|गायन|गायक|गायिका|ਗੀਤ|ਗਾਣਾ|పాట|పాటలు|गाणे|गाणी|लोकगीत/.test(fields)};
  const audioTrack=t=>t&&t.is_available!==false&&t.is_delete!==true&&t.is_streamable===true&&t.is_stream_gated!==true&&t.access?.stream!==false&&t.stream?.url&&t.access?.stream===true&&safeLicense(t)&&!suspiciousUpload(t)&&vocalOnly(t)&&languageMatches(t);
  const archiveTerms={Hindi:'Hindi',Punjabi:'Punjabi',Telugu:'Telugu',Marathi:'Marathi',Haryanvi:'Haryanvi',Bhojpuri:'Bhojpuri',Rajasthani:'Rajasthani'};
  async function archiveSearch(){
   const term=archiveTerms[language];
   const q='mediatype:audio AND (title:"'+term+'" OR description:"'+term+'" OR subject:"'+term+'") AND licenseurl:*';
   const searchUrl='https://archive.org/advancedsearch.php?'+new URLSearchParams({q, 'fl[]':'identifier,title,creator,description,subject,language,licenseurl',rows:'35',page:'1',output:'json'});
   const sr=await fetch(searchUrl,{headers:{Accept:'application/json'}});
   if(!sr.ok)throw new Error('Archive search unavailable');
   const sj=await sr.json(),docs=sj.response?.docs||[];
   const allowedUrl=u=>{const x=String(u||'').toLowerCase();return /creativecommons.org\\/(licenses\\/(by|by-sa|by-nd)\\/|publicdomain\\/(zero|mark)\\/)/.test(x)};
   const candidates=docs.filter(d=>d.identifier&&allowedUrl(d.licenseurl)&&!suspiciousUpload(d)&&vocalOnly(d));
   const resolved=await Promise.all(candidates.slice(0,16).map(async d=>{
    try{
     const mr=await fetch('https://archive.org/metadata/'+encodeURIComponent(d.identifier),{headers:{Accept:'application/json'}});
     if(!mr.ok)return null;
     const m=await mr.json(),meta=m.metadata||{};
     const license=meta.licenseurl||d.licenseurl||'';
     if(!allowedUrl(license))return null;
     const allText=[d.title,d.description,d.subject,meta.title,meta.description,meta.subject,meta.language].filter(Boolean).join(' ').toLowerCase();
     if(!vocalOnly({title:d.title,description:d.description,subject:d.subject,tags:meta.subject}))return null;
     const files=(m.files||[]).filter(x=>!x.private&&!x.source&&/\\.(mp3|ogg|oga|m4a)$/i.test(x.name||'')&&!/sample|preview|thumb|spectrogram/i.test(x.name||''));
     const file=files.sort((a,b)=>(Number(b.size)||0)-(Number(a.size)||0))[0];
     if(!file)return null;
     const languageField=String(meta.language||d.language||'').toLowerCase();
     const languageOK=languageField.includes(term.toLowerCase())||({Hindi:/\\bhin\\b|hindi/,Punjabi:/\\bpan\\b|\\bpun\\b|punjabi/,Telugu:/\\btel\\b|telugu/,Marathi:/\\bmar\\b|marathi/,Haryanvi:/haryanvi/,Bhojpuri:/bhojpuri/,Rajasthani:/rajasthani|marwari/}[language]||/a^/).test(languageField)||LANGS[language].terms.some(x=>allText.includes(x.toLowerCase()));
     if(!languageOK)return null;
     const url='https://archive.org/download/'+encodeURIComponent(d.identifier)+'/'+file.name.split('/').map(encodeURIComponent).join('/');
     return {id:'ia-'+d.identifier+'-'+file.name,title:meta.title||d.title||file.name,user:{name:Array.isArray(meta.creator)?meta.creator.join(', '):(meta.creator||d.creator||'Independent artist')},duration:Number(file.length)||0,artwork:null,stream:{url},license,source:'Internet Archive',isArchive:true};
    }catch(e){return null}
   }));
   return resolved.filter(Boolean);
  }
  try{
   const batches=await Promise.all(LANGS[language].queries.map(async term=>{
    const q=(query?query+' ':'')+term;
    const url=API+'/tracks/search?'+new URLSearchParams({query:q,limit:'30',sort_method:'popular'});
    const response=await fetch(url,{headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error('Audius returned '+response.status);
    const json=await response.json();return Array.isArray(json.data)?json.data:[];
   }));
   if(ticket!==requestNo)return;
   const tracks=batches.flat().filter(audioTrack);
   const archive=await archiveSearch();
   if(ticket!==requestNo)return;
   const combined=[...tracks,...archive],seen=new Set();
   results=combined.filter(t=>{const id=String(t.id||t.track_id);if(!id||seen.has(id))return false;seen.add(id);return true}).slice(0,30);
   loading=false;render();
  }catch(err){
   if(ticket!==requestNo)return;
   try{
    const archive=await archiveSearch();if(ticket!==requestNo)return;
    results=archive.slice(0,30);loading=false;render();
    if(!results.length)setState('No verified free vocal songs found yet','The connected free catalogues did not return tracks with clear language and license metadata. No copyrighted or instrumental tracks are substituted.');
   }catch(e){if(ticket!==requestNo)return;loading=false;setState('Free music sources are temporarily unavailable','Please try again later. No ads, subscriptions or external playback redirects are used.')}
  }
 }
 function selectLanguage(name,updateUrl){
  if(!LANGS[name])return;language=name;query='';
  if(updateUrl){const u=new URL(location.href);u.searchParams.set('lang',name);u.searchParams.delete('q');history.replaceState({},'',u.pathname+u.search+u.hash)}
  const input=document.querySelector('[data-search]');if(input)input.value='';
  load();
 }
 const input=document.querySelector('[data-search]');
 if(input){
  const submit=()=>{query=input.value.trim();const u=new URL(location.href);if(query)u.searchParams.set('q',query);else u.searchParams.delete('q');u.searchParams.set('lang',language);history.replaceState({},'',u.pathname+u.search+u.hash);load()};
  input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();submit()}},true);
  input.addEventListener('search',submit);
  const oldQ=new URLSearchParams(location.search).get('q');if(oldQ)input.value=oldQ;
 }
 document.querySelectorAll('.language-grid .language-card').forEach(card=>{
  const name=(card.querySelector('b')?.textContent||'').trim();
  if(LANGS[name]){card.href='trending.html?lang='+encodeURIComponent(name);card.addEventListener('click',e=>{if(location.pathname.endsWith('/trending.html')){e.preventDefault();selectLanguage(name,true)}})}
 });
 const trend=document.querySelector('[data-trending-filters]');
 if(trend){
  trend.querySelectorAll('button').forEach(b=>{
   const name=b.textContent.trim();
   if(LANGS[name]){b.textContent=name;b.addEventListener('click',()=>selectLanguage(name,true))}
   else b.hidden=true;
  });
 }
 // Connect the existing player shell to real in-app audio.
 const dock=document.querySelector('.bt-player'),overlay=document.querySelector('.bt-player-overlay');
 if(dock&&overlay){
  const miniTitle=dock.querySelector('.bt-player-copy strong'),miniSub=dock.querySelector('.bt-player-copy small');
  const miniPlay=dock.querySelector('.bt-player-play'),miniPrev=dock.querySelectorAll('.bt-player-control')[0],miniNext=dock.querySelectorAll('.bt-player-control')[1],miniBar=dock.querySelector('.bt-player-progress i');
  const heroTitle=overlay.querySelector('#bt-player-title'),heroSub=overlay.querySelector('.bt-player-hero p');
  const sheetPlay=overlay.querySelector('.bt-player-sheet-play'),sheetControls=overlay.querySelectorAll('.bt-player-sheet-controls button');
  const seek=overlay.querySelector('.bt-player-timeline input'),times=overlay.querySelectorAll('.bt-player-timeline span'),volume=overlay.querySelector('.bt-player-volume input');
  const queuePanel=overlay.querySelector('[data-player-panel="queue"]');
  const toggleButtons=[miniPlay,sheetPlay];
  const updatePlay=()=>toggleButtons.forEach(b=>{b.disabled=!audio.src;b.textContent=audio.paused?'▶':'Ⅱ';b.setAttribute('aria-label',audio.paused?'Play':'Pause')});
  const updateProgress=()=>{if(!Number.isFinite(audio.duration)||!audio.duration)return;const pct=audio.currentTime/audio.duration*100;seek.value=String(pct);seek.disabled=false;times[0].textContent=seconds(audio.currentTime);times[1].textContent=seconds(audio.duration);miniBar.style.width=pct+'%'};
  const updateQueue=()=>{
   queuePanel.replaceChildren();const heading=document.createElement('strong');heading.textContent='Up next';queuePanel.append(heading);
   queue.forEach((t,i)=>{const b=document.createElement('button');b.type='button';b.className='bt-queue-item';b.textContent=(t.title||'Untitled')+' — '+(t.user?.name||'Artist');b.addEventListener('click',()=>playTrack(i));queuePanel.append(b)});
  };
  playTrack=async index=>{
   const t=queue[index];if(!t||!t.stream?.url)return;
   current=index;audio.src=t.stream.url;audio.load();
   miniTitle.textContent=t.title||'Untitled track';miniSub.textContent=(t.user?.name||'Independent artist')+' · '+language;
   heroTitle.textContent=t.title||'Untitled track';heroSub.textContent=(t.user?.name||'Independent artist')+' · '+language;
   seek.value='0';seek.disabled=true;times[0].textContent='0:00';times[1].textContent=seconds(t.duration);miniBar.style.width='0%';
   miniPrev.disabled=index<=0;miniNext.disabled=index>=queue.length-1;sheetControls[0].disabled=index<=0;sheetControls[2].disabled=index>=queue.length-1;
   updateQueue();updatePlay();
   try{await audio.play();updatePlay()}catch(e){setState('Tap play to start','Your browser blocked automatic playback.');updatePlay()}
  };
  const playPause=()=>{if(!audio.src)return;if(audio.paused)audio.play().then(updatePlay).catch(updatePlay);else{audio.pause();updatePlay()}};
  miniPlay.disabled=false;sheetPlay.disabled=false;miniPrev.disabled=true;miniNext.disabled=true;sheetControls[0].disabled=true;sheetControls[2].disabled=true;
  toggleButtons.forEach(b=>b.addEventListener('click',playPause));
  miniPrev.addEventListener('click',()=>playTrack(Math.max(0,current-1)));miniNext.addEventListener('click',()=>playTrack(Math.min(queue.length-1,current+1)));
  sheetControls[0].addEventListener('click',()=>playTrack(Math.max(0,current-1)));sheetControls[2].addEventListener('click',()=>playTrack(Math.min(queue.length-1,current+1)));
  seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration))audio.currentTime=audio.duration*(Number(seek.value)/100)});
  volume.addEventListener('input',()=>audio.volume=Number(volume.value)/100);audio.volume=Number(volume.value)/100;
  audio.addEventListener('timeupdate',updateProgress);audio.addEventListener('durationchange',updateProgress);
  audio.addEventListener('play',updatePlay);audio.addEventListener('pause',updatePlay);
  audio.addEventListener('ended',()=>{if(current<queue.length-1)playTrack(current+1);else updatePlay()});
  audio.addEventListener('error',()=>{setState('This track could not be streamed','Choose another available track from the list.');updatePlay()});
  window.addEventListener('pagehide',()=>audio.pause());
 }
 load();
})();
