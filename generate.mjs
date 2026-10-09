import {mkdir, writeFile, cp, rm} from 'node:fs/promises';
import {join, dirname} from 'node:path';
import {allPages, navigation, external, images, countryCards, pageInfo, historyDecades} from './src/data.mjs';

const root = new URL('./', import.meta.url).pathname;
const output = join(root, 'dist');
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const local = path => path.startsWith('/en') ? `${path.replace(/\/$/,'')}/` : path;
const href = path => path.startsWith('http') ? path : local(path);
const a = (path, label, className='') => `<a href="${escape(href(path))}" class="${className}">${label}</a>`;
const image = (key, alt='', className='') => `<img src="${escape(images[key] || images.technology)}" alt="${escape(alt)}" class="${className}" loading="lazy"/>`;
const arrow = '<span aria-hidden="true" class="link-arrow">↗</span>';

const morePages = [
  ['Contact us','/en/contact-us'], ['Saved jobs','/en/careers/saved-jobs'],
  ['SupplierNet','/en/products/supplier-net'], ['CustomerNet','/en/products/customernet'],
  ['Terms of use','/en/terms-of-use'], ['Privacy','/en/privacy'],
  ['Cookies','/en/cookie-notice'], ['Terms & conditions','/en/general-terms-and-conditions'],
  ['Accessibility','/en/accessibility'],
  ['Life at ASML','/en/careers/working-at-asml/life-at-asml'],
  ['Cymer','/en/company/about-asml/cymer'], ['HMI','/en/company/about-asml/hmi'],
  ['Diversity & inclusion','/en/company/sustainability/diversity-and-inclusion'],
];
const extra = morePages.map(([title,path])=>({title,path,parents:allPages.filter(x=>path.startsWith(x.path+'/')).sort((a,b)=>b.path.length-a.path.length).slice(0,1)}));
const routes = [...allPages,...extra];
const routeByPath = Object.fromEntries(routes.map(x=>[x.path,x]));

function menuLevel(node, depth=0) {
  const children = node ? node.children : [...navigation,...external];
  const title = node?.title || 'Main menu';
  return `<div class="menu-level" data-level="${depth}" aria-label="${escape(title)}">
    ${node ? `<button class="menu-back" type="button" data-back aria-label="Back to previous menu">← <span>Back</span></button>${a(node.path,`${escape(title)} overview`,'menu-overview')}` : ''}
    <ul>${children.map(item=>`<li>${item.children ? `<button type="button" class="menu-item ${depth ? 'menu-item-sub' : ''}" data-menu-target="${escape(item.path)}">${escape(item.title)}</button>` : a(item.path, `${escape(item.title)}${item.path.startsWith('http') ? ' <span class="external-icon">↗</span>' : ''}`, `menu-item ${depth ? 'menu-item-sub' : ''}`)}</li>`).join('')}</ul>
    ${!node ? `<div class="menu-secondary">${a('/en/contact-us','Contact us')}${a('/en/products/supplier-net','SupplierNet')}${a('/en/products/customernet','CustomerNet')}</div>` : ''}
  </div>`;
}

function header(light=false) {
  const levels=[menuLevel(null),...allPages.filter(x=>x.children).map(x=>`<div class="menu-panel" data-panel="${escape(x.path)}">${menuLevel(x,x.parents.length+1)}</div>`)].join('');
  return `<header class="site-header ${light?'header-light':''}">
    ${a('/en','ASML','brand')}<button class="icon-button menu-toggle" aria-label="Open menu" aria-expanded="false"><span class="hamburger"><i></i><i></i><i></i></span></button><button class="icon-button search-toggle" aria-label="Open search" aria-expanded="false"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="13.5" cy="13.5" r="8.3"/><path d="m20 20 8 8"/></svg></button>
  </header>
  <div class="nav-scrim" data-close-menu></div>
  <nav class="menu-drawer" aria-label="Primary navigation" inert><div class="menu-head">${a('/en','ASML','brand')}<button type="button" class="drawer-close" aria-label="Close menu" data-close-menu>×</button></div><div class="menu-levels">${levels}</div></nav>
  <div class="search-scrim" data-close-search></div><div class="search-panel" role="search" hidden><button class="search-close" type="button" data-close-search aria-label="Close search">×</button><label for="site-search">Search</label><div class="search-field"><input id="site-search" type="search" placeholder="Search website" autocomplete="off"><button type="button" id="search-submit" aria-label="Search">↗</button></div><p class="search-caption">SEARCH</p><div id="search-results" aria-live="polite"></div></div>`;
}

function breadcrumbs(node) {
  const trail=[{title:'Home',path:'/en'},...(node?.parents||[]),node].filter(Boolean);
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${trail.map((n,i)=>`<li>${i===trail.length-1?`<span>${escape(n.title)}</span>`:a(n.path,escape(n.title))}</li>`).join('')}</ol></nav>`;
}

function footer(node) {
  const groups=[
    ['Learn',[['History','/en/company/about-asml/history'],['Products','/en/products'],['Technology','/en/technology'],['Sustainability','/en/company/sustainability'],['News','https://investor.asml.com/news']]],
    ['Work at ASML',[['Job search','/en/careers/find-your-job'],['Careers','/en/careers'],['Organization','/en/company/about-asml/organization'],['Locations','/en/company/about-asml/locations']]],
    ['Invest',[['Annual reports','https://investor.asml.com/annual-reports'],['Quarterly results','https://investor.asml.com/quarterly-results'],['Capital Markets Days','https://investor.asml.com/financial-events/capital-markets-days'],['Share information','https://investor.asml.com/share-information']]],
    ['Get in touch',[['Contact information','/en/contact-us'],['Contact Media Relations','https://investor.asml.com/contact-media-relations'],['Contact Investor Relations','https://investor.asml.com/contact-investor-relations'],['CustomerNet','/en/products/customernet'],['SupplierNet','/en/products/supplier-net']]],
  ];
  return `<footer class="footer">${node?`<div class="footer-crumb">${breadcrumbs(node)}</div>`:''}<div class="footer-inner"><div class="footer-columns">${groups.map(([name,links])=>`<div class="footer-group"><h2>${escape(name)}</h2><ul>${links.map(([title,path])=>`<li>${a(path,escape(title))}</li>`).join('')}</ul></div>`).join('')}</div><div class="footer-social"><h2>Social media</h2><div>${[['Facebook','https://www.facebook.com/asml/'],['LinkedIn','https://www.linkedin.com/company/asml'],['X','https://twitter.com/asmlcompany'],['YouTube','https://www.youtube.com/channel/UCIT9d3JjHEnsVi_w9guSXvA'],['Instagram','https://www.instagram.com/lifeatasml']].map(([title,path])=>a(path,escape(title))).join('')}</div></div><button type="button" class="cookie-manage" data-cookie-settings>Manage cookie settings ↗</button><div class="footer-bottom"><span>Copyright © 2019–2026 (ASML) All Rights Reserved</span><div>${[['Terms of use','/en/terms-of-use'],['Privacy','/en/privacy'],['Cookies','/en/cookie-notice'],['Terms & conditions','/en/general-terms-and-conditions'],['Accessibility','/en/accessibility']].map(([title,path])=>a(path,escape(title))).join('')}</div></div></div></footer>`;
}

function cookies() {
  return `<div class="cookie-shade" id="cookie-shade"></div><section class="cookie-banner" id="cookie-banner" aria-label="Cookie notice"><div><h2>This website uses cookies to improve your user experience</h2><p>This website uses cookies and similar technologies. Some essential cookies are required for the website to function and cannot be disabled. With your consent, optional cookies help measure performance and personalize your experience. You can adjust your settings at any time.</p></div><div class="cookie-actions"><button data-cookie-choice="all">Accept all cookies</button><button data-cookie-choice="essential">Only essential cookies</button><button class="text-button" data-cookie-settings>Manage cookie settings</button></div></section><dialog id="cookie-dialog"><form method="dialog"><button class="dialog-close" aria-label="Close cookie settings">×</button><h2>Privacy preferences</h2><p>Choose which optional cookies to allow. Essential cookies are always active.</p><label><span>Essential cookies</span><input type="checkbox" checked disabled></label><label><span>Performance cookies</span><input type="checkbox" id="performance-cookies"></label><label><span>Personalization cookies</span><input type="checkbox" id="personalization-cookies"></label><button class="button-blue" value="save" id="save-cookies">Save choices</button></form></dialog>`;
}

function pageShell(content,{title='ASML',description='ASML semiconductor technology',light=false,node=null}={}) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#120996"><meta name="description" content="${escape(description)}"><meta name="robots" content="noindex,nofollow"><title>${escape(title)} | ASML</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://media.asml.com"><link rel="stylesheet" href="/styles.css"></head><body><a class="skip-link" href="#content">Skip to main content</a><div class="grid-lines" aria-hidden="true"></div>${header(light)}<main id="content">${content}</main>${footer(node)}${cookies()}<script src="/site.js" defer></script></body></html>`;
}

function hero(node,info) {
  const cls=info.mode==='split'?'hero-split':'hero-photo';
  return `<section class="page-hero ${cls} ${info.mode==='dark'?'hero-dark':''}">${info.mode==='split'?`<div class="hero-split-image">${image(info.image,info.heading)}</div>`:`<div class="hero-background">${image(info.image,'')}</div>`}<div class="hero-body">${breadcrumbs(node)}<h1>${escape(info.heading)}</h1><p>${escape(info.subtitle)}</p>${node.path==='/en/careers'?a('/en/careers/find-your-job','Go to job search ↗','hero-cta'):''}</div></section>`;
}

function statement(text, title='') {return `<section class="statement"><div class="statement-inner">${title?`<h2>${escape(title)}</h2>`:''}<p>${escape(text)}</p></div></section>`;}
function cards(items, className='') {return `<div class="card-grid ${className}">${items.map(item=>`<a class="content-card" href="${escape(href(item.path))}">${item.image?image(item.image,'','card-image'):''}<div class="card-copy"><h3>${escape(item.title)}</h3>${item.description?`<p>${escape(item.description)}</p>`:''}<span class="card-arrow">↗</span></div></a>`).join('')}</div>`;}
function pressStrip() {return `<section class="press-strip"><div><h3>Press releases and news alerts</h3><p>Explore the latest ASML news, business updates and financial information.</p></div>${a('https://investor.asml.com/news/press-releases-and-announcements','Stay in the loop ↗','button-outline')}</section>`;}
function related(node) {const siblings=(node.parents?.at(-1)?.children||navigation).filter(x=>x.path!==node.path).slice(0,3);return siblings.length?`<section class="related content-width"><h2>Related content</h2>${cards(siblings.map(x=>({title:x.title,path:x.path,description:`Explore ${x.title.toLowerCase()} at ASML.`})))}</section>`:'';}

function home() {
  const quick=[['⌂','About ASML','/en/company/about-asml'],['◎','Careers','/en/careers'],['◉','Products','/en/products'],['▥','Quarterly results','https://investor.asml.com/quarterly-results']];
  return `<section class="home-hero hero-dark"><div class="hero-background">${image('home','')}</div><div class="home-hero-inner"><h1>Changing the world, one nanometer at a time</h1><p>ASML enables the world’s leading chipmakers to produce the microchips that power today’s world.</p><nav class="quick-links" aria-label="Quick links"><h2>Quick links</h2><div>${quick.map(([icon,title,path])=>a(path,`<span class="quick-icon">${icon}</span><strong>${title}${path.startsWith('http')?' ↗':''}</strong><i></i>`)).join('')}</div></nav></div></section>
  <section class="home-intro content-width"><h2>We're powering technology forward</h2><p>Our lithography technology helps the world’s leading chipmakers make microchips more powerful, faster and more energy efficient.</p>${a('/en/products','See all products ↗','text-link')}</section>
  <section class="home-glance"><div class="glance-image">${image('homeMachine','ASML lithography system')}</div><div class="glance-copy"><h2>At a glance</h2><p>Who we are, what we do and why it matters</p>${a('/en/company/about-asml','About ASML ↗','button-outline')}</div></section>
  ${pressStrip()}
  <section class="home-feature"><div class="feature-image">${image('homeTechnology','High NA lithography system')}</div><div class="feature-copy"><h2>Our technology</h2><p>Using light to drive microchip innovation</p>${a('/en/technology','About lithography ↗','button-outline')}</div></section>
  <section class="holistic"><div class="content-width"><h2>Discover holistic lithography</h2><p>Our approach supports chipmakers as they refine the patterning process, from development through manufacturing.</p></div><div class="video-placeholder">${image('holistic','Lithography portfolio')}<div class="video-permission"><h3>Enable third party cookies to play this video</h3><label><input type="checkbox" id="video-cookie"> Enable third party cookies</label></div></div></section>
  <section class="locations"><div class="content-width"><span class="eyebrow">Our global presence</span><h2>Three continents, over 60 locations</h2><div class="carousel-controls"><button type="button" data-carousel-prev aria-label="Previous Item">←</button><button type="button" data-carousel-next aria-label="Next Item">→</button></div></div><div class="location-track" id="location-track">${countryCards.map(([title,key,summary])=>`<a class="location-card" href="${href('/en/careers/working-at-asml/'+(key==='unitedStates'?'united-states':key==='southKorea'?'south-korea':key==='china'?'china':key))}">${image(key,title)}<div><h3>${escape(title)}</h3><span>Read more ↗</span><p>${escape(summary)}</p></div></a>`).join('')}</div></section>
  <section class="career-cta"><div class="content-width"><h2>Explore career opportunities to help develop the technology behind the world’s most powerful microchips.</h2>${a('/en/careers/working-at-asml','Work at ASML ↗','button-outline')}</div></section>
  <section class="annual-panel"><div>${image('annual','Abstract semiconductor chip patterns')}</div><div><h2>Our 2025 Annual Report</h2>${a('https://investor.asml.com/annual-reports/2025','Explore the highlights ↗','button-outline')}</div></section>`;
}

function history(node) {
  const info=pageInfo[node.path];
  return `${hero(node,info)}${statement("ASML's history is rich with innovation and collaboration. Explore the milestones that shaped our journey.")}
    ${historyDecades.map((era,index)=>`<section class="decade-section ${index%2?'decade-reverse':''}"><div class="decade-image">${image(era.image,era.decade+' ASML history')}</div><div class="decade-copy"><span class="eyebrow">${era.decade}</span><h2>${era.decade}</h2><p class="decade-summary">${escape(era.summary)}</p><h3>The ${era.decade}: ${escape(era.title)}</h3><p>${escape(era.detail)}</p></div></section>`).join('')}${related(node)}`;
}

function category(node,info) {
  const descendants=node.children||[];
  if(node.path==='/en/company')return `${hero(node,info)}${statement(info.intro)}<section class="content-width section-pad">${cards(descendants.map((x,i)=>({title:x.title,path:x.path,image:['about','company','technology','careers'][i%4],description:["Discover ASML’s people, purpose and global presence.","See how we work responsibly and transparently.","Explore the environmental and social topics shaping our work.","Learn about our work with local communities."][i%4]})))}</section><section class="split-feature">${image('careers','ASML cleanroom team')}<div><h2>ASML at a glance</h2><p>Key facts, figures and perspectives from across the company.</p>${a('/en/company/about-asml','See ASML at a glance ↗','text-link')}</div></section>${pressStrip()}`;
  if(node.path==='/en/company/about-asml')return `${hero(node,info)}${statement(info.intro)}<section class="content-width section-pad"><div class="facts-grid"><div><strong>1984</strong><span>Year founded</span></div><div><strong>44,000+</strong><span>Employees</span></div><div><strong>60+</strong><span>Locations</span></div></div><h2 class="section-title">More about ASML</h2>${cards([{title:'Technology',path:'/en/technology',image:'technology',description:'Explore the science behind lithography.'},{title:'Products',path:'/en/products',image:'products',description:'Explore our portfolio of systems and services.'},{title:'Sustainability',path:'/en/company/sustainability',image:'company',description:'Our efforts with customers and partners.'},{title:'History',path:'/en/company/about-asml/history',image:'history',description:'Discover the journey from 1984 to today.'}])}</section><section class="split-feature">${image('homeTechnology','Lithography system')}<div><h2>Our locations</h2><p>Our global teams collaborate from more than 60 locations.</p>${a('/en/company/about-asml/locations','Our locations ↗','text-link')}</div></section>${related(node)}`;
  if(node.path==='/en/careers')return `${hero(node,info)}${statement(info.intro)}<section class="content-width section-pad"><h2 class="section-title">Explore opportunities</h2>${cards([{title:'Technical fields',path:'/en/careers/technical-fields',image:'technology',description:'Discover the disciplines behind our technology.'},{title:'Students and graduates',path:'/en/careers/students-new-graduates',image:'careers',description:'Find your next step at ASML.'},{title:'Working at ASML',path:'/en/careers/working-at-asml',image:'germany',description:'Meet our people and workplaces.'}])}</section>${locationsSmall()}<section class="career-cta"><div class="content-width"><h2>Search for your future job</h2>${a('/en/careers/find-your-job','Search jobs ↗','button-outline')}</div></section>${related(node)}`;
  if(node.path==='/en/technology')return `${hero(node,info)}${statement(info.intro)}<section class="content-width section-pad"><h2 class="section-title">Quick links</h2>${cards(descendants.map((x,i)=>({title:x.title,path:x.path,image:['technology','euv','software','homeTechnology'][i],description:`Discover ${x.title.toLowerCase()} and its role in chipmaking.`})))}</section><section class="split-feature">${image('euv','ASML lithography system')}<div><h2>Technology that moves us forward</h2><p>Innovations in light, optics, software and precision mechanics work together inside every system.</p>${a('/en/technology/lithography-principles','Lithography principles ↗','text-link')}</div></section>${related(node)}`;
  if(node.path==='/en/products')return `${hero(node,info)}${statement(info.intro,'Delivering holistic lithography value')}<section class="content-width section-pad"><div class="product-diagram">${image('holistic','Holistic lithography portfolio')}</div><h2 class="section-title">Our product portfolio</h2>${cards(descendants.map((x,i)=>({title:x.title,path:x.path,image:['euv','duv','history','technology','software','careers'][i],description:`Explore ASML’s ${x.title.toLowerCase()} solutions.`})))}</section>${related(node)}`;
  return `${hero(node,info)}${statement(info.intro)}<section class="content-width section-pad">${cards(descendants.map(x=>({title:x.title,path:x.path,description:`Explore ${x.title.toLowerCase()} at ASML.`})))}</section>${related(node)}`;
}

function locationsSmall(){return `<section class="content-width section-pad"><h2 class="section-title">60 locations, endless opportunities</h2>${cards(countryCards.slice(0,3).map(([title,key,description])=>({title,path:'/en/careers/working-at-asml/'+(key==='unitedStates'?'united-states':key),image:key,description})))}</section>`;}

function pageIntro(node){
  const root=node.path.split('/')[2];
  if(root==='technology')return `Learn about ${node.title.toLowerCase()} and the ideas, tools and precision behind modern microchip manufacturing.`;
  if(root==='products')return `Explore ${node.title.toLowerCase()} in ASML’s portfolio of lithography systems, software and services.`;
  if(root==='careers')return `Discover the people, places and opportunities that make working at ASML unique.`;
  if(root==='company')return `Explore ${node.title.toLowerCase()} and the people and ideas behind ASML.`;
  return `Find information about ${node.title.toLowerCase()} at ASML.`;
}
function generic(node){
  const root=node.path.split('/')[2];const key=root==='products'?(node.title.includes('EUV')?'euv':node.title.includes('DUV')?'duv':'products'):root==='technology'?(node.title==='Software'?'software':'technology'):root==='careers'?'careers':'company';
  const intro=pageIntro(node);
  const info={heading:node.title,subtitle:intro,image:key,mode:root==='products'?'split':'dark',intro};
  const children=node.children||[];
  const siblings=node.parents?.at(-1)?.children?.filter(x=>x.path!==node.path).slice(0,4)||[];
  const content=children.length?`<section class="content-width section-pad"><h2 class="section-title">Explore ${escape(node.title)}</h2>${cards(children.map((x,i)=>({title:x.title,path:x.path,image:[key,'technology','products','careers'][i%4],description:pageIntro(x)})))}</section>`:'';
  const extras=node.path==='/en/careers/find-your-job'?`<section class="job-search content-width section-pad"><h2>Find your job</h2><p>Search current opportunities on ASML’s careers site.</p><form action="https://www.asml.com/en/careers/find-your-job" method="get"><label for="job-query">Keywords</label><div><input id="job-query" name="query" placeholder="Job title or keyword"><button class="button-blue">Search jobs ↗</button></div></form></section>`:'';
  const relatedItems=children.length?[]:siblings;
  return `${hero(node,info)}${statement(intro)}${extras}${content}${relatedItems.length?`<section class="content-width section-pad"><h2 class="section-title">Explore more</h2>${cards(relatedItems.map((x,i)=>({title:x.title,path:x.path,image:[key,'technology','products','careers'][i%4],description:pageIntro(x)})))}</section>`:''}<section class="split-feature">${image(key,node.title)}<div><h2>Discover more about ASML</h2><p>Explore the technologies, people and partnerships that advance the semiconductor industry.</p>${a(root==='careers'?'/en/careers':'/en/company/about-asml',root==='careers'?'Careers ↗':'About ASML ↗','text-link')}</div></section>`;
}

await rm(output,{recursive:true,force:true}); await mkdir(output,{recursive:true});
for(const [source,dest] of [['src/styles.css','styles.css'],['src/site.js','site.js'],['public/favicon.svg','favicon.svg']]) await cp(join(root,source),join(output,dest));
const homepage=pageShell(home(),{title:'The world’s supplier to the semiconductor industry',description:'ASML enables chipmakers to produce the microchips that power today’s world.'});
await mkdir(join(output,'en'),{recursive:true});
await writeFile(join(output,'index.html'),homepage);
await writeFile(join(output,'en','index.html'),homepage);
for(const node of routes){
  const info=pageInfo[node.path];
  const content=node.path.endsWith('/history')?history(node):info?category(node,info):generic(node);
  const file=join(output,node.path.slice(1),'index.html');await mkdir(dirname(file),{recursive:true});
  await writeFile(file,pageShell(content,{title:info?.heading||node.title,description:info?.intro||pageIntro(node),light:info?.mode==='split'||(!info&&node.path.startsWith('/en/products')),node}));
}
await writeFile(join(output,'search-index.json'),JSON.stringify(routes.map(x=>({title:x.title,path:local(x.path),description:pageInfo[x.path]?.intro||pageIntro(x)}))));
console.log(`Generated ${routes.length+1} pages in ${output}`);
