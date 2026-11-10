(function(){
// ===================== The menu =====================
const THEMES = [
 {id:'iconic',  name:'Iconic New York',   hook:'The big famous ones: Lady Liberty, the bridges, Times Square'},
 {id:'museums', name:'Museums & science',  hook:'Dinosaurs, a space shuttle, famous paintings'},
 {id:'shows',   name:'Shows & games',      hook:'Broadway, a pro game, live music'},
 {id:'views',   name:'Sky-high views',     hook:'Glass floors and rooftops 1,000+ feet up'},
 {id:'spooky',  name:'Spooky & strange',   hook:'Haunted houses, skulls and butterflies, old cemeteries'},
 {id:'italian', name:'Our Italian roots',  hook:'Little Italy, the Bronx’s Arthur Avenue, red-sauce dinners'},
 {id:'food',    name:'Eat New York',       hook:'Pizza, dumplings, bagels, giant cookies'},
 {id:'fandom',  name:'Anime, games & TV',  hook:'Manga floors, the Nintendo store, famous TV spots'},
 {id:'hidden',  name:'Hidden gems & wandering', hook:'Secret spots, cool neighborhoods, no tickets needed'}
];
const yt = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
const ITEMS = [
 {id:'liberty', t:'iconic', name:'Statue of Liberty & Ellis Island', hook:'Ferry across the harbor to Lady Liberty, then walk the halls where millions of immigrants first landed in America.', q:'Statue of Liberty Ellis Island visit'},
 {id:'memorial',t:'iconic', name:'9/11 Memorial & Museum', hook:'Two huge waterfall pools where the towers stood, and a museum underneath. Powerful and quiet.', q:'9/11 Memorial and Museum tour'},
 {id:'bridge',  t:'iconic', name:'Brooklyn Bridge at sunset', hook:'Walk a mile over the river with the whole skyline lighting up behind you, then pizza in Brooklyn.', q:'walking the Brooklyn Bridge sunset'},
 {id:'cpark',   t:'iconic', name:'Central Park', hook:'Rent bikes or wander: castles, fountains, street musicians, the famous bridges from movies.', q:'Central Park walking tour'},
 {id:'times',   t:'iconic', name:'Times Square at night', hook:'Giant glowing screens everywhere, crowds, chaos. Ten minutes is plenty; ten minutes is amazing.', q:'Times Square at night walk'},
 {id:'amnh',    t:'museums',name:'Natural History Museum + planetarium', hook:'T. rex skeletons, a 94-foot blue whale overhead, then a space show on a giant dome.', q:'American Museum of Natural History tour'},
 {id:'intrepid',t:'museums',name:'Intrepid: aircraft carrier + space shuttle', hook:'Walk the deck of a real aircraft carrier full of jets, and see the space shuttle Enterprise.', q:'Intrepid Museum space shuttle Enterprise'},
 {id:'art',     t:'museums',name:'A big art museum (the Met or MoMA)', hook:'A real Egyptian temple and knights in armor at the Met, or Van Gogh’s Starry Night at MoMA.', q:'Metropolitan Museum of Art highlights'},
 {id:'broadway',t:'shows',  name:'A Broadway show', hook:'The real thing, in a historic theater. (Which show is a question at the end.)', q:'Broadway show experience'},
 {id:'game',    t:'shows',  name:'A pro game', hook:'Knicks at Madison Square Garden, or a pro soccer match if one’s on that week.', q:'Knicks game Madison Square Garden atmosphere'},
 {id:'jazz',    t:'shows',  name:'A live jazz set', hook:'An early show in a tiny legendary club. Very New York.', q:'New York jazz club'},
 {id:'esb',     t:'views',  name:'Empire State Building', hook:'The classic open-air deck on the 86th floor. You’ve seen it in a hundred movies.', q:'Empire State Building observation deck'},
 {id:'thrill',  t:'views',  name:'Glass floors & mirror rooms', hook:'Summit’s infinity mirror rooms or Edge’s glass floor, way up over the city. Not for the scared.', q:'Summit One Vanderbilt mirror room'},
 {id:'spookysoho',t:'spooky',name:'Haunted house + curiosity shop', hook:'Tour “Manhattan’s Most Haunted House,” then browse a shop full of real skulls, skeletons and framed butterflies.', q:'Merchant’s House Museum haunted'},
 {id:'greenwood',t:'spooky',name:'Green-Wood Cemetery', hook:'Huge, old and beautiful: castle gates, hills, crypts and skyline views. A little eerie.', q:'Green-Wood Cemetery Brooklyn'},
 {id:'littleitaly',t:'italian',name:'Little Italy', hook:'Cannoli and espresso on Mulberry Street, plus a museum with 100-year-old Sicilian puppets.', q:'Little Italy Mulberry Street NYC'},
 {id:'arthur',  t:'italian',name:'Arthur Avenue in the Bronx', hook:'The “real” Little Italy: bakeries, cheese shops, fresh pasta, old-school delis.', q:'Arthur Avenue Bronx food tour'},
 {id:'redsauce',t:'italian',name:'A classic red-sauce dinner', hook:'Checkered tablecloths, giant plates of pasta, the works.', q:'classic Italian restaurant New York red sauce'},
 {id:'foodcrawl',t:'food',  name:'NYC food crawl', hook:'Folded pizza slices, bagels with lox, a famous pastrami sandwich, giant gooey cookies.', q:'NYC iconic food tour pizza bagels pastrami'},
 {id:'dumplings',t:'food',  name:'Chinatown dumplings', hook:'Cheap, hot, delicious, and Chinatown itself is a whole adventure.', q:'Chinatown NYC dumplings'},
 {id:'icecream',t:'food',   name:'Museum of Ice Cream', hook:'Jump in a pool of (fake) sprinkles, ride NYC’s longest indoor slide, unlimited ice cream.', q:'Museum of Ice Cream NYC'},
 {id:'anime',   t:'fandom', name:'Anime & gaming run', hook:'Kinokuniya’s whole floor of manga and Studio Ghibli stuff, then the two-story Nintendo store.', q:'Kinokuniya New York manga floor'},
 {id:'boardgames',t:'fandom',name:'Board game café night', hook:'Hundreds of games to borrow and snacks. A good night for a D&D family.', q:'board game cafe New York'},
 {id:'tvspots', t:'fandom', name:'Famous TV & movie spots', hook:'The Friends apartment building, the Ghostbusters firehouse, Home Alone 2 spots.', q:'famous TV and movie locations NYC'},
 {id:'quirky',  t:'hidden', name:'Secret spots tour', hook:'Whisper in one corner of Grand Central and be heard across the room, ride the sky tram over the river, explore a park floating on the Hudson.', q:'Grand Central whispering gallery'},
 {id:'wander',  t:'hidden', name:'SoHo & the Village', hook:'Wander old streets: cool shops, guitar stores, street performers in Washington Square.', q:'SoHo Greenwich Village walk'}
];
const TICKETS = 5, MAX_PER = 3, MAX_THEMES = 2;
const PACE = ['Pack it in','Balanced','Lots of downtime'];
const SHOWS = ['Wicked','Hamilton','Harry Potter and the Cursed Child','Surprise us','Skip Broadway'];
const CROWN = ['Yes! Climb the crown','Maybe','No thanks'];

// ===================== Plumbing =====================
const URL_ = (window.NYC_CONFIG && window.NYC_CONFIG.SCRIPT_URL || '').trim();
const app = document.getElementById('app');
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const keyOf = n => n.trim().toLowerCase();
const themeName = id => (THEMES.find(t=>t.id===id)||{}).name || '';

let responses = {}, loaded = false;
let view = 'home', current = null, msg = '', msgErr = false, saving = false, resTab = 'picks';

function blank(name){ return {v:2, name:name.trim(), themes:[], tickets:{}, veto:null, pace:null, show:null, crown:null, one:'', miss:'', at:null}; }
function norm(r){ const b = blank(r.name||''); return Object.assign(b, r, {themes: Array.isArray(r.themes)?r.themes:[], tickets: (r.tickets && typeof r.tickets==='object')?r.tickets:{}}); }
function used(r){ return Object.values(r.tickets).reduce((a,b)=>a+(+b||0),0); }
function go(v){ view = v; render(); window.scrollTo(0,0); }

async function loadAll(){
  if(!URL_){ loaded = true; return; }
  try{
    const j = await (await fetch(URL_)).json();
    if(!j.ok) throw 0;
    responses = {};
    (j.responses||[]).forEach(r => { if(r && r.name && r.v===2) responses[keyOf(r.name)] = norm(r); });
  }catch(e){}
  loaded = true;
}
async function postOne(r){
  const j = await (await fetch(URL_, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body: JSON.stringify(r)})).json();
  if(!j.ok) throw new Error(j.error||'save failed');
}
function encodeAnswer(r){ return 'NYCPICKS:' + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + '.'; }
function decodeAnswers(text){
  const out = []; text = String(text).replace(/\s+/g,''); const re = /NYCPICKS:([A-Za-z0-9+/=]+)\./g; let m;
  while((m = re.exec(text))){ try{ const r = JSON.parse(decodeURIComponent(escape(atob(m[1])))); if(r && r.name) out.push(norm(r)); }catch(e){} }
  return out;
}
function saveDraft(){ try{ localStorage.setItem('nyc-picks2-draft', JSON.stringify(current)); localStorage.setItem('nyc-picks-name', current.name); }catch(e){} }
function loadDraft(name){ try{ const d = JSON.parse(localStorage.getItem('nyc-picks2-draft')||'null'); if(d && keyOf(d.name)===keyOf(name)) return norm(d); }catch(e){} return null; }
function lastName(){ try{ return localStorage.getItem('nyc-picks-name')||''; }catch(e){ return ''; } }
function msgHTML(){ return msg ? '<div class="msg'+(msgErr?' err':'')+'">'+esc(msg)+'</div>' : ''; }
function chips(field, opts, val){ return '<div class="row" style="margin-top:8px">' + opts.map((o,i)=>'<button class="chip'+(val===i?' on':'')+'" data-f="'+field+'" data-i="'+i+'">'+esc(o)+'</button>').join('') + '</div>'; }
const TIX = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/></svg>';

// ===================== Home =====================
function renderHome(){
  const names = Object.values(responses);
  app.innerHTML = '<div class="wrap">'
   + '<div class="kicker">Spring Break · March 2027</div>'
   + '<h1>New York City: you get 5 tickets.</h1>'
   + '<div class="band"></div>'
   + '<p class="sub">Browse what’s possible (tap <b>See it</b> to watch a quick video), then spend your 5 tickets on what you want most. You also get <b>one veto</b> for something you really don’t want to do. About 5 minutes.</p>'
   + msgHTML()
   + '<div class="card"><h3>Who’s playing?</h3>'
   + '<div style="margin-top:10px"><input type="text" id="nm" placeholder="Your name" autocomplete="off" value="'+esc(lastName())+'"></div>'
   + (names.length ? '<p class="note" style="margin:12px 0 0">Already done (tap your name to change your picks):</p><div class="who">'+names.map(r=>'<button class="chip" data-edit="'+esc(keyOf(r.name))+'">'+esc(r.name)+'</button>').join('')+'</div>' : (loaded?'':'<p class="note" style="margin:12px 0 0">Loading…</p>'))
   + '<div class="row" style="margin-top:14px"><button class="btn" id="start">Start</button>'
   + (names.length ? '<button class="btn alt" id="res">See results ('+names.length+')</button>' : '') + '</div></div>'
   + '<details class="card" style="margin-top:22px"><summary style="font-weight:600;cursor:pointer">For Ash: add picks someone texted you</summary>'
   + '<p class="note">Paste the whole message. Every NYCPICKS code in it gets added.</p>'
   + '<textarea id="imp" placeholder="Paste here"></textarea><div class="row" style="margin-top:10px"><button class="btn small" id="impb">Add picks</button></div></details>'
   + '</div>';
  const nm = document.getElementById('nm');
  document.getElementById('start').onclick = () => {
    const n = nm.value.trim(); if(!n){ nm.focus(); nm.style.borderColor='var(--red)'; return; }
    const ex = responses[keyOf(n)];
    current = loadDraft(n) || (ex ? norm(JSON.parse(JSON.stringify(ex))) : blank(n));
    current.name = n; msg=''; go('survey');
  };
  nm.onkeydown = e => { if(e.key==='Enter') document.getElementById('start').click(); };
  const rb = document.getElementById('res'); if(rb) rb.onclick = () => { msg=''; go('results'); };
  app.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => { current = norm(JSON.parse(JSON.stringify(responses[b.dataset.edit]))); msg=''; go('survey'); });
  document.getElementById('impb').onclick = doImport;
}

// ===================== Survey =====================
function itemCard(i, r){
  const n = +r.tickets[i.id] || 0, vetoed = r.veto === i.id;
  return '<div class="card item'+(n?' picked':'')+(vetoed?' vetoed':'')+'" id="c-'+i.id+'">'
   + '<div class="item-name">'+esc(i.name)+'</div>'
   + '<div class="item-note" style="font-size:14.5px;color:var(--ink);opacity:.85">'+esc(i.hook)+'</div>'
   + '<div class="row" style="margin-top:10px;justify-content:space-between">'
   +   '<a class="see" href="'+yt(i.q)+'" target="_blank" rel="noopener">▶ See it</a>'
   +   '<div class="row" style="gap:6px">'
   +     '<button class="vbtn'+(vetoed?' on':'')+'" data-veto="'+i.id+'">'+(vetoed?'Vetoed':'Veto')+'</button>'
   +     '<button class="tbtn" data-minus="'+i.id+'"'+(n?'':' disabled')+' aria-label="Remove ticket">−</button>'
   +     '<span class="tcount">'+(n? '<span class="tix">'+TIX.repeat(n)+'</span>' : '<span class="note">0</span>')+'</span>'
   +     '<button class="tbtn plus" data-plus="'+i.id+'" aria-label="Add ticket">+'+TIX+'</button>'
   +   '</div>'
   + '</div></div>';
}
function renderSurvey(){
  const r = current;
  let h = '<div class="wrap">'
   + '<div class="kicker">'+esc(r.name)+'’s picks</div><h1>Step 1: Pick your vibe</h1>'
   + '<p class="sub">Choose up to '+MAX_THEMES+' kinds of trip that sound best.</p>'
   + '<div class="themes">' + THEMES.map(t => '<button class="theme'+(r.themes.includes(t.id)?' on':'')+'" data-theme="'+t.id+'"><b>'+esc(t.name)+'</b><span>'+esc(t.hook)+'</span></button>').join('') + '</div>'
   + '<h2>Step 2: Spend your tickets</h2>'
   + '<p class="sub">You have '+TICKETS+'. Put more than one on something you really want (up to '+MAX_PER+'). Tap <b>Veto</b> on the one thing you’d rather skip.</p>';
  THEMES.forEach(t => {
    const its = ITEMS.filter(i=>i.t===t.id); if(!its.length) return;
    h += '<div class="group"><span class="theme-tag">'+esc(t.name)+'</span>' + its.map(i=>itemCard(i,r)).join('') + '</div>';
  });
  h += '<h2>Step 3: A few quick ones</h2>'
   + '<div class="card"><div class="item-name">Pace</div>' + chips('pace', PACE, r.pace) + '</div>'
   + '<div class="card"><div class="item-name">If we go to the Statue of Liberty, want to climb up into the crown?</div><div class="item-note">162 steps up a tight spiral staircase. Tickets sell out months ahead.</div>' + chips('crown', CROWN, r.crown) + '</div>'
   + '<div class="card"><div class="item-name">Broadway pick</div><div class="item-note">We’ll confirm what’s playing closer to the trip</div>' + chips('show', SHOWS, r.show) + '</div>'
   + '<div class="card"><div class="item-name">The one thing that would make this trip for you</div><textarea id="one" placeholder="Anything at all">'+esc(r.one)+'</textarea></div>'
   + '<div class="card"><div class="item-name">Anything we forgot?</div><textarea id="miss" placeholder="Places, foods, shows, anything">'+esc(r.miss)+'</textarea></div>'
   + msgHTML()
   + '<div class="row" style="margin-top:16px"><button class="btn" id="save2"'+(saving?' disabled':'')+'>'+(saving?'Saving…':'Save my picks')+'</button><button class="btn alt" id="back">Cancel</button></div>'
   + '</div>'
   + '<div class="bar"><div class="inner"><div class="left" id="left"></div><button class="btn small" id="save1"'+(saving?' disabled':'')+'>'+(saving?'Saving…':'Save')+'</button></div></div>';
  app.innerHTML = h;
  updateBar();
  app.querySelectorAll('[data-theme]').forEach(b => b.onclick = () => {
    const id = b.dataset.theme, ix = r.themes.indexOf(id);
    if(ix>=0) r.themes.splice(ix,1); else { if(r.themes.length>=MAX_THEMES) r.themes.shift(); r.themes.push(id); }
    app.querySelectorAll('[data-theme]').forEach(x => x.classList.toggle('on', r.themes.includes(x.dataset.theme)));
    saveDraft();
  });
  wireItems();
  app.querySelectorAll('[data-f]').forEach(b => b.onclick = () => {
    const f = b.dataset.f, i = +b.dataset.i; r[f] = (r[f]===i) ? null : i;
    b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', +x.dataset.i===r[f]));
    saveDraft();
  });
  document.getElementById('one').oninput = e => { r.one = e.target.value; saveDraft(); };
  document.getElementById('miss').oninput = e => { r.miss = e.target.value; saveDraft(); };
  document.getElementById('save1').onclick = doSave;
  document.getElementById('save2').onclick = doSave;
  document.getElementById('back').onclick = () => { msg=''; go('home'); };
}
function redrawCards(){
  ITEMS.forEach(i => { const el = document.getElementById('c-'+i.id); if(el){ const tmp = document.createElement('div'); tmp.innerHTML = itemCard(i, current); el.replaceWith(tmp.firstChild); } });
  wireItems();
  updateBar();
}
function wireItems(){
  const r = current;
  app.querySelectorAll('.item [data-plus],.item [data-minus],.item [data-veto]').forEach(b => b.onclick = () => {
    const id = b.dataset.plus || b.dataset.minus || b.dataset.veto;
    const n = +r.tickets[id] || 0;
    if(b.dataset.plus){
      if(used(r) >= TICKETS){ flash('All '+TICKETS+' tickets are spent. Take one back from something first.'); return; }
      if(n >= MAX_PER){ flash('Max '+MAX_PER+' tickets on one thing.'); return; }
      r.tickets[id] = n+1; if(r.veto===id) r.veto = null;
    } else if(b.dataset.minus){
      if(n<=1) delete r.tickets[id]; else r.tickets[id] = n-1;
    } else {
      if(r.veto===id) r.veto = null; else { r.veto = id; delete r.tickets[id]; }
    }
    redrawCards(); saveDraft();
  });
}
function updateBar(){
  const left = TICKETS - used(current);
  const el = document.getElementById('left'); if(!el) return;
  el.innerHTML = '<span class="tix big">'+TIX.repeat(left)+'<span class="spent">'+TIX.repeat(TICKETS-left)+'</span></span><span class="note">'+(left ? left+' ticket'+(left>1?'s':'')+' left' : 'All tickets spent!')+(current.veto?' · veto used':'')+'</span>';
}
let flashT = null;
function flash(t){
  let f = document.getElementById('flash');
  if(!f){ f = document.createElement('div'); f.id = 'flash'; f.className = 'flash'; document.body.appendChild(f); }
  f.textContent = t; f.classList.add('show'); clearTimeout(flashT); flashT = setTimeout(()=>f.classList.remove('show'), 2200);
}

async function doSave(){
  if(saving) return;
  if(used(current) === 0){ flash('Spend at least one ticket first!'); return; }
  saveDraft();
  if(!URL_){ go('send'); return; }
  saving = true; render();
  try{
    await postOne(current);
    saving = false;
    responses[keyOf(current.name)] = norm(JSON.parse(JSON.stringify(current)));
    msg = 'Saved! Thanks, '+current.name+'. Here’s where everyone’s tickets went so far.'; msgErr = false;
    go('results');
    loadAll().then(()=>{ if(view==='results') render(); });
  }catch(e){ saving = false; go('send'); }
}

// ===================== Backup: text/email picks =====================
function renderSend(){
  const code = encodeAnswer(current);
  const body = 'My NYC trip picks ('+current.name+'):\n'+code;
  app.innerHTML = '<div class="wrap"><div class="kicker">One more step</div><h1>Send your picks to Ash</h1><div class="band"></div>'
   + '<p class="sub">Your picks couldn’t be saved automatically just now. Tap a button, pick Ash, and hit send.</p>'
   + '<div class="row" style="margin-top:14px"><a class="btn" style="text-decoration:none" href="sms:?&body='+encodeURIComponent(body)+'">Text them</a>'
   + '<a class="btn alt" style="text-decoration:none" href="mailto:?subject='+encodeURIComponent('My NYC trip picks')+'&body='+encodeURIComponent(body)+'">Email them</a>'
   + '<button class="btn alt" id="cp">Copy</button></div>'
   + '<div class="card" style="margin-top:14px"><textarea id="code" readonly style="min-height:100px;font-size:12px">'+esc(code)+'</textarea></div>'
   + '<div class="row" style="margin-top:16px"><button class="btn alt small" id="retry">Try saving again</button><button class="btn alt small" id="edit">Change my picks</button></div></div>';
  const ta = document.getElementById('code');
  document.getElementById('cp').onclick = async e => { try{ await navigator.clipboard.writeText(body); e.target.textContent='Copied'; }catch(err){ ta.focus(); ta.select(); e.target.textContent='Select and copy'; } };
  document.getElementById('retry').onclick = () => { go('survey'); doSave(); };
  document.getElementById('edit').onclick = () => go('survey');
}
async function doImport(){
  const found = decodeAnswers(document.getElementById('imp').value);
  if(!found.length){ msg='No picks found in that text. Paste the whole message that includes NYCPICKS.'; msgErr=true; render(); return; }
  if(!URL_){ msg='The answer sheet isn’t connected yet (config.js).'; msgErr=true; render(); return; }
  msg='Adding…'; msgErr=false; render();
  const ok=[], bad=[];
  for(const r of found){ try{ await postOne(r); ok.push(r.name); }catch(e){ bad.push(r.name); } }
  await loadAll();
  msg = (ok.length?'Added: '+ok.join(', ')+'. ':'') + (bad.length?'Couldn’t add: '+bad.join(', ')+'.':'');
  msgErr = !!bad.length; go(ok.length?'results':'home');
}

// ===================== Results =====================
function tallyItems(){
  const rs = Object.values(responses);
  return ITEMS.map(i => {
    const by = rs.filter(r => +r.tickets[i.id]).map(r => ({name:r.name, n:+r.tickets[i.id]}));
    const vetoes = rs.filter(r => r.veto===i.id).map(r=>r.name);
    return Object.assign({}, i, {total: by.reduce((a,b)=>a+b.n,0), by, vetoes});
  }).sort((a,b) => b.total-a.total || b.by.length-a.by.length || a.vetoes.length-b.vetoes.length);
}
function tallyThemes(){
  const rs = Object.values(responses);
  return THEMES.map(t => ({...t, names: rs.filter(r=>r.themes.includes(t.id)).map(r=>r.name)})).sort((a,b)=>b.names.length-a.names.length);
}
function renderResults(){
  const rs = Object.values(responses);
  let h = '<div class="wrap"><div class="kicker">Results · '+rs.length+' done</div><h1>Where the tickets went</h1><div class="band"></div>' + msgHTML();
  if(!rs.length){ h += '<p class="sub">'+(loaded?'No picks yet.':'Loading…')+'</p>'; }
  else {
    h += '<p class="sub">'+esc(rs.map(r=>r.name).join(', '))+'</p>';
    h += '<div class="tabs">'+[['picks','Top picks'],['vibe','Vibe'],['more','Everything else']].map(t=>'<button class="chip'+(resTab===t[0]?' on':'')+'" data-tab="'+t[0]+'">'+t[1]+'</button>').join('')+'</div>';
    if(resTab==='picks'){
      const all = tallyItems(), got = all.filter(x=>x.total), vetoed = all.filter(x=>x.vetoes.length);
      const fights = all.filter(x=>x.total && x.vetoes.length);
      if(fights.length) h += '<div class="msg"><b>To talk about:</b> '+esc(fights.map(f=>f.name).join('; '))+' (someone spent a ticket and someone else vetoed it).</div>';
      const max = Math.max(1, ...got.map(x=>x.total));
      h += '<div class="card">' + (got.length ? got.map((x,ix)=>'<div class="rank"><div class="n">'+(ix+1)+'</div><div><div class="item-name">'+esc(x.name)+'</div><div class="item-note">'+esc(themeName(x.t))+'</div><div class="meter"><i style="width:'+Math.round(x.total/max*100)+'%"></i></div><div class="note" style="margin-top:4px">'+esc(x.by.map(b=>b.name+(b.n>1?' ×'+b.n:'')).join(', '))+'</div></div><div class="pts"><span class="tix">'+TIX+'</span> '+x.total+'</div></div>').join('') : '<p class="note">No tickets yet</p>') + '</div>';
      if(vetoed.length) h += '<div class="card"><h3>Vetoed</h3>' + vetoed.map(x=>'<div style="margin-top:8px"><b>'+esc(x.name)+'</b> <span class="pill skip">'+esc(x.vetoes.join(', '))+'</span></div>').join('') + '</div>';
    } else if(resTab==='vibe'){
      h += '<div class="card">' + tallyThemes().map((t,ix)=>'<div class="rank"><div class="n">'+(ix+1)+'</div><div><div class="item-name">'+esc(t.name)+'</div><div class="note">'+(t.names.length?esc(t.names.join(', ')):'—')+'</div></div><div class="pts">'+t.names.length+'</div></div>').join('') + '</div>';
    } else {
      const block = (title,f,opts) => { const c = opts.map((o,i)=>({o,names:rs.filter(r=>r[f]===i).map(r=>r.name)})).filter(x=>x.names.length); return '<div class="card"><h3>'+title+'</h3>'+(c.length?c.map(x=>'<div style="margin-top:8px"><b>'+esc(x.o)+'</b> <span class="note">'+esc(x.names.join(', '))+'</span></div>').join(''):'<p class="note">No answers yet</p>')+'</div>'; };
      h += block('Pace','pace',PACE) + block('Statue of Liberty crown','crown',CROWN) + block('Broadway','show',SHOWS);
      const q = (title, f) => { const xs = rs.filter(r=>r[f]&&r[f].trim()); return xs.length ? '<div class="card"><h3>'+title+'</h3>'+xs.map(r=>'<div class="quote"><b>'+esc(r.name)+'</b>'+esc(r[f])+'</div>').join('')+'</div>' : ''; };
      h += q('The one thing that would make the trip','one') + q('Ideas we didn’t list','miss');
    }
    h += '<div class="row" style="margin-top:16px"><button class="btn alt small" id="copy">Copy results as text</button><button class="btn alt small" id="refresh">Refresh</button></div><textarea id="copyout" style="display:none;margin-top:10px" readonly></textarea>';
  }
  h += '<div class="row" style="margin-top:16px"><button class="btn" id="home">Back to start</button></div></div>';
  app.innerHTML = h;
  app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { resTab=b.dataset.tab; msg=''; render(); });
  document.getElementById('home').onclick = () => { msg=''; go('home'); };
  const rf = document.getElementById('refresh'); if(rf) rf.onclick = async () => { rf.textContent='Refreshing…'; await loadAll(); msg=''; render(); };
  const cp = document.getElementById('copy');
  if(cp) cp.onclick = async () => { const t = summaryText(); try{ await navigator.clipboard.writeText(t); cp.textContent='Copied'; }catch(e){ const ta=document.getElementById('copyout'); ta.style.display='block'; ta.value=t; ta.select(); cp.textContent='Select and copy below'; } };
}
function summaryText(){
  const rs = Object.values(responses);
  let t = 'NYC spring break picks: '+rs.map(r=>r.name).join(', ')+'\n\nTICKETS\n';
  tallyItems().filter(x=>x.total||x.vetoes.length).forEach((x,i)=>{ t += (i+1)+'. '+x.name+': '+x.total+(x.by.length?' ('+x.by.map(b=>b.name+(b.n>1?' x'+b.n:'')).join(', ')+')':'')+(x.vetoes.length?' VETO: '+x.vetoes.join(', '):'')+'\n'; });
  t += '\nVIBE\n'; tallyThemes().filter(x=>x.names.length).forEach(x=>{ t += x.name+': '+x.names.join(', ')+'\n'; });
  t += '\nOTHER\n'; rs.forEach(r=>{ t += r.name+': pace='+(r.pace!=null?PACE[r.pace]:'-')+'; crown='+(r.crown!=null?CROWN[r.crown]:'-')+'; show='+(r.show!=null?SHOWS[r.show]:'-')+(r.one?'; one thing: '+r.one:'')+(r.miss?'; ideas: '+r.miss:'')+'\n'; });
  return t;
}

function render(){
  if(view==='survey' && current) renderSurvey();
  else if(view==='send' && current) renderSend();
  else if(view==='results') renderResults();
  else renderHome();
}
if(location.hash==='#results') view='results';
render();
loadAll().then(()=>{ if(view!=='survey' && view!=='send') render(); });
})();
