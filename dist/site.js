(() => {
  const body=document.body;
  const drawer=document.querySelector('.menu-drawer');
  const menuToggle=document.querySelector('.menu-toggle');
  const navScrim=document.querySelector('.nav-scrim');
  const menuLevels=[...document.querySelectorAll('.menu-level')];
  let menuStack=[];
  function currentMenu(){menuLevels.forEach(el=>el.classList.remove('current'));(menuStack.at(-1)||menuLevels[0])?.classList.add('current')}
  function closeMenu(){drawer.classList.remove('active');drawer.inert=true;navScrim.classList.remove('active');menuToggle.setAttribute('aria-expanded','false');body.classList.remove('locked');menuStack=[];currentMenu()}
  function openMenu(){closeSearch();drawer.inert=false;drawer.classList.add('active');navScrim.classList.add('active');menuToggle.setAttribute('aria-expanded','true');body.classList.add('locked');menuStack=[];currentMenu();drawer.querySelector('.drawer-close').focus()}
  menuToggle?.addEventListener('click',()=>drawer.classList.contains('active')?closeMenu():openMenu());
  document.querySelectorAll('[data-close-menu]').forEach(el=>el.addEventListener('click',closeMenu));
  document.querySelectorAll('[data-menu-target]').forEach(button=>button.addEventListener('click',()=>{
    const level=document.querySelector(`[data-panel="${CSS.escape(button.dataset.menuTarget)}"] .menu-level`);
    if(level){menuStack.push(level);currentMenu();level.querySelector('.menu-back')?.focus()}
  }));
  document.querySelectorAll('[data-back]').forEach(button=>button.addEventListener('click',()=>{menuStack.pop();currentMenu()}));

  const searchPanel=document.querySelector('.search-panel');
  const searchScrim=document.querySelector('.search-scrim');
  const searchToggle=document.querySelector('.search-toggle');
  const searchField=document.getElementById('site-search');
  const resultBox=document.getElementById('search-results');
  let searchIndex=[];
  function closeSearch(){searchPanel.hidden=true;searchScrim.classList.remove('active');searchToggle.setAttribute('aria-expanded','false');if(!drawer.classList.contains('active'))body.classList.remove('locked')}
  async function openSearch(){closeMenu();searchPanel.hidden=false;searchScrim.classList.add('active');searchToggle.setAttribute('aria-expanded','true');body.classList.add('locked');searchField.focus();if(!searchIndex.length){try{searchIndex=await (await fetch('/search-index.json')).json()}catch{searchIndex=[]}}renderSearch()}
  function renderSearch(){
    const query=searchField.value.toLowerCase().trim();
    if(!query){resultBox.innerHTML='';return}
    const matches=searchIndex.filter(item=>(item.title+' '+item.description).toLowerCase().includes(query)).slice(0,8);
    resultBox.replaceChildren();
    if(!matches.length){const p=document.createElement('p');p.className='search-empty';p.textContent='No results found';resultBox.append(p);return}
    for(const item of matches){const link=document.createElement('a');link.className='search-result';link.href=item.path;link.textContent=item.title;const small=document.createElement('small');small.textContent=item.path;link.append(small);resultBox.append(link)}
  }
  searchToggle?.addEventListener('click',()=>searchPanel.hidden?openSearch():closeSearch());
  document.querySelectorAll('[data-close-search]').forEach(el=>el.addEventListener('click',closeSearch));
  searchField?.addEventListener('input',renderSearch);
  searchField?.addEventListener('keydown',e=>{if(e.key==='Enter'){const first=resultBox.querySelector('a');if(first)location.href=first.href}});
  document.getElementById('search-submit')?.addEventListener('click',()=>{const first=resultBox.querySelector('a');if(first)location.href=first.href});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeSearch()}});

  const banner=document.getElementById('cookie-banner');
  const shade=document.getElementById('cookie-shade');
  const dialog=document.getElementById('cookie-dialog');
  function showBanner(){banner.classList.add('show');shade.classList.add('show')}
  function hideBanner(){banner.classList.remove('show');shade.classList.remove('show')}
  try{if(!localStorage.getItem('asml-clone-cookie-choice'))showBanner()}catch{showBanner()}
  document.querySelectorAll('[data-cookie-choice]').forEach(button=>button.addEventListener('click',()=>{
    try{localStorage.setItem('asml-clone-cookie-choice',button.dataset.cookieChoice)}catch{}hideBanner()
  }));
  document.querySelectorAll('[data-cookie-settings]').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
  dialog?.addEventListener('close',()=>{
    if(dialog.returnValue==='save'){
      const choice={performance:document.getElementById('performance-cookies').checked,personalization:document.getElementById('personalization-cookies').checked};
      try{localStorage.setItem('asml-clone-cookie-choice',JSON.stringify(choice))}catch{}hideBanner()
    }
  });

  const track=document.getElementById('location-track');
  const prev=document.querySelector('[data-carousel-prev]');
  const next=document.querySelector('[data-carousel-next]');
  function updateCarousel(){if(!track)return;prev.disabled=track.scrollLeft<8;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-8}
  prev?.addEventListener('click',()=>track.scrollBy({left:-348,behavior:'smooth'}));
  next?.addEventListener('click',()=>track.scrollBy({left:348,behavior:'smooth'}));
  track?.addEventListener('scroll',updateCarousel,{passive:true});
  updateCarousel();
  document.getElementById('video-cookie')?.addEventListener('change',e=>e.target.closest('.video-permission').classList.toggle('enabled',e.target.checked));
})();
