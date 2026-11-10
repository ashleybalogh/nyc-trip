(function(){
const THEMES = [
 {id:'iconic',name:'Iconic New York',desc:'Statue of Liberty, 9/11 Memorial, Brooklyn Bridge, Times Square'},
 {id:'spooky',name:'Spooky & strange',desc:'A haunted house museum, curiosity shops, old cemeteries, ghost stories'},
 {id:'books',name:'Books & stories',desc:'Legendary bookstores and libraries'},
 {id:'science',name:'Stars & science',desc:'Dinosaurs, the planetarium, a space shuttle on an aircraft carrier'},
 {id:'stage',name:'Shows & live events',desc:'Broadway, live jazz, street performers, maybe a game'},
 {id:'italian',name:'Our Italian roots',desc:'Little Italy, the Italian American Museum, the Bronx’s Arthur Avenue, a classic red-sauce dinner'},
 {id:'food',name:'Eat New York',desc:'Pizza, dumplings, bagels, deli sandwiches, famous cookies'},
 {id:'fandom',name:'Anime, games & TV',desc:'Manga and Studio Ghibli shopping, the Nintendo store, board games, famous TV and movie spots'},
 {id:'art',name:'Art & big museums',desc:'MoMA, the Met, famous paintings and giant halls'},
 {id:'views',name:'Skyline views',desc:'Observation decks high above the city'},
 {id:'wander',name:'Neighborhood wandering',desc:'SoHo, the Village, the High Line, Brooklyn: shops and people-watching'}
];
const ITEMS = [
 {id:'liberty',t:'iconic',name:'Climb to the Statue of Liberty crown',note:'Ferry ride across the harbor; climbing to the crown is 162 steps and tickets are scarce'},
 {id:'ellis',t:'iconic',name:'Ellis Island immigration museum',note:'Same ferry trip as the Statue'},
 {id:'memorial',t:'iconic',name:'9/11 Memorial & Museum',note:'Moving and powerful; plan a few unhurried hours'},
 {id:'bridge',t:'iconic',name:'Walk the Brooklyn Bridge at sunset',note:'About a mile, with the skyline behind you'},
 {id:'times',t:'iconic',name:'Times Square at night',note:'Loud, bright, a little crazy'},
 {id:'cpark',t:'iconic',name:'Central Park wander',note:'Bethesda Fountain, Bow Bridge, Strawberry Fields'},
 {id:'merchant',t:'spooky',name:'Merchant’s House Museum',note:'Billed as “Manhattan’s Most Haunted House”'},
 {id:'evolution',t:'spooky',name:'Evolution Store',note:'Framed butterflies, skulls, skeletons and fossils for sale'},
 {id:'greenwood',t:'spooky',name:'Green-Wood Cemetery',note:'Huge, historic, beautiful and a little eerie (Brooklyn)'},
 {id:'ghost',t:'spooky',name:'A ghost walking tour',note:'Evening tour of haunted Greenwich Village'},
 {id:'strand',t:'books',name:'The Strand bookstore',note:'Famous for “18 miles of books”'},
 {id:'nypl',t:'books',name:'NY Public Library main reading room',note:'The lion statues and the grand reading room'},
 {id:'morgan',t:'books',name:'The Morgan Library',note:'J.P. Morgan’s private library: three stories of old books'},
 {id:'amnh',t:'science',name:'Natural History Museum',note:'Dinosaurs, the blue whale, gems and meteorites'},
 {id:'hayden',t:'science',name:'Hayden Planetarium space show',note:'Inside the Natural History Museum'},
 {id:'intrepid',t:'science',name:'Intrepid Museum',note:'An aircraft carrier with a space shuttle on board'},
 {id:'broadway',t:'stage',name:'A Broadway show',note:'Which one is a question below'},
 {id:'jazz',t:'stage',name:'A live jazz set',note:'An early show at a classic club'},
 {id:'buskers',t:'stage',name:'Street performers in Washington Square',note:'Free, and usually something going on'},
 {id:'game',t:'stage',name:'A live game, if one’s on',note:'Soccer or basketball, depending on the schedule'},
 {id:'mulberry',t:'italian',name:'Little Italy on Mulberry Street',note:'Cannoli and espresso in the old neighborhood'},
 {id:'iam',t:'italian',name:'Italian American Museum',note:'On Mulberry Street: 100-year-old Sicilian marionettes and immigrant history (open Thu–Sat afternoons)'},
 {id:'arthur',t:'italian',name:'Arthur Avenue in the Bronx',note:'The “real” Little Italy: markets, bakeries, salumerias, cheese shops'},
 {id:'redsauce',t:'italian',name:'A classic red-sauce Italian dinner',note:'Old-school spot, checkered-tablecloth style'},
 {id:'ancestors',t:'italian',name:'Look up our family at Ellis Island',note:'Search the arrival records for relatives who came through'},
 {id:'pizza',t:'food',name:'Classic NY pizza slices',note:'Fold it in half like a local'},
 {id:'dumplings',t:'food',name:'Chinatown dumplings',note:'Cheap, fast, delicious'},
 {id:'bagels',t:'food',name:'Bagels & lox',note:'The New York breakfast'},
 {id:'katz',t:'food',name:'Katz’s Deli pastrami',note:'Giant sandwiches, very famous'},
 {id:'cookies',t:'food',name:'Levain Bakery cookies',note:'Huge, gooey, legendary'},
 {id:'icecream',t:'food',name:'Museum of Ice Cream',note:'In SoHo: a sprinkle pool, a giant indoor slide, unlimited ice cream'},
 {id:'chelsea',t:'food',name:'Chelsea Market food hall',note:'Graze through lots of little shops'},
 {id:'kino',t:'fandom',name:'Kinokuniya bookstore',note:'Three floors of Japanese books; a whole floor of manga, figures and Studio Ghibli goods (across from Bryant Park)'},
 {id:'nintendo',t:'fandom',name:'Nintendo New York',note:'Nintendo\u2019s two-story flagship store at Rockefeller Center'},
 {id:'ramen',t:'fandom',name:'A real ramen shop',note:'Steaming bowls, Japanese snacks and treats'},
 {id:'boardgames',t:'fandom',name:'Board game caf\u00e9 night',note:'Hundreds of games to borrow; a good fit for a D&D family'},
 {id:'tvspots',t:'fandom',name:'Famous TV & movie spots',note:'The Friends apartment building, the Ghostbusters firehouse and more'},
 {id:'goldengirls',t:'fandom',name:'A Golden Girls show or pop-up',note:'They come and go in NYC; we\u2019d check what\u2019s on in March'},
 {id:'guitar',t:'stage',name:'Browse a legendary guitar shop',note:'For our guitar player'},
 {id:'moma',t:'art',name:'Museum of Modern Art (MoMA)',note:'Starry Night, Warhol\u2019s soup cans and more'},
 {id:'met',t:'art',name:'The Metropolitan Museum of Art',note:'An Egyptian temple, suits of armor, and art from everywhere'},
 {id:'esb',t:'views',name:'Empire State Building observation deck',note:'The classic: 86th-floor open-air deck'},
 {id:'topofrock',t:'views',name:'Top of the Rock',note:'Classic view straight at the Empire State Building'},
 {id:'summit',t:'views',name:'Summit One Vanderbilt',note:'Mirror rooms and glass ledges way up high'},
 {id:'soho',t:'wander',name:'SoHo shopping',note:'Boutiques and cast-iron buildings'},
 {id:'village',t:'wander',name:'Greenwich Village wander',note:'Little streets, cafes, Washington Square'},
 {id:'highline',t:'wander',name:'The High Line',note:'A park built on old elevated train tracks'},
 {id:'dumbo',t:'wander',name:'DUMBO & Brooklyn waterfront',note:'The famous bridge-framed photo spot'}
];
const SCALE = [{v:3,l:'Must'},{v:2,l:'Yes'},{v:1,l:'Maybe'},{v:0,l:'Skip'}];
const PACE = ['Go-go-go, pack it in','Balanced: a few big things a day','Slow: lots of downtime'];
const SPLURGE = ['Amazing hotels','Great food','Tickets & experiences','Shopping'];
const SHOWS = ['Wicked','Hamilton','Harry Potter and the Cursed Child','Surprise us','Skip Broadway'];

const URL_ = (window.NYC_CONFIG && window.NYC_CONFIG.SCRIPT_URL || '').trim();
const app = document.getElementById('app');
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const keyOf = n => n.trim().toLowerCase();
const TOTAL = THEMES.length + ITEMS.length + 3;

let responses = {};          // key -> answers
let loaded = false, loadErr = '';
let view = 'home', current = null, msg = '', msgErr = false, saving = false, resTab = 'themes';

function blank(name){ return {name:name.trim(), themes:{}, items:{}, pace:null, splurge:null, show:null, one:'', dont:'', at:null}; }
function go(v){ view = v; render(); window.scrollTo(0,0); }

// ---------- server ----------
async function loadAll(){
  if(!URL_){ loaded = true; loadErr = 'not configured'; return; }
  try{
    const res = await fetch(URL_, {method:'GET'});
    const j = await res.json();
    if(!j.ok) throw new Error(j.error || 'bad response');
    responses = {};
    (j.responses || []).forEach(r => { if(r && r.name) responses[keyOf(r.name)] = r; });
    loaded = true; loadErr = '';
  }catch(e){ loaded = true; loadErr = String(e && e.message || e); }
}
async function postOne(r){
  const res = await fetch(URL_, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body: JSON.stringify(r)});
  const j = await res.json();
  if(!j.ok) throw new Error(j.error || 'save failed');
}

// ---------- answer codes (backup path) ----------
function encodeAnswer(r){ return 'NYCPICKS:' + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + '.'; }
function decodeAnswers(text){
  const out = []; text = String(text).replace(/\s+/g,''); const re = /NYCPICKS:([A-Za-z0-9+/=]+)\./g; let m;
  while((m = re.exec(text))){ try{ const r = JSON.parse(decodeURIComponent(escape(atob(m[1])))); if(r && r.name) out.push(r); }catch(e){} }
  return out;
}

// ---------- local draft ----------
function saveDraft(){ try{ localStorage.setItem('nyc-picks-draft', JSON.stringify(current)); localStorage.setItem('nyc-picks-name', current.name); }catch(e){} }
function loadDraft(name){
  try{ const d = JSON.parse(localStorage.getItem('nyc-picks-draft')||'null'); if(d && keyOf(d.name)===keyOf(name)) return d; }catch(e){}
  return null;
}
function lastName(){ try{ return localStorage.getItem('nyc-picks-name') || ''; }catch(e){ return ''; } }

// ---------- pieces ----------
function scaleHTML(kind, id, val){
  return '<div class="scale">' + SCALE.map(s => '<button data-k="'+kind+'" data-id="'+id+'" data-v="'+s.v+'" class="s'+s.v+(val===s.v?' on':'')+'">'+s.l+'</button>').join('') + '</div>';
}
function choiceHTML(field, opts, val){
  return '<div class="row" style="margin-top:8px">' + opts.map((o,i) => '<button class="chip'+(val===i?' on':'')+'" data-f="'+field+'" data-i="'+i+'">'+esc(o)+'</button>').join('') + '</div>';
}
function msgHTML(){ return msg ? '<div class="msg'+(msgErr?' err':'')+'">'+esc(msg)+'</div>' : ''; }
function answeredCount(r){
  let n = 0; THEMES.forEach(t=>{ if(r.themes[t.id]!=null) n++; }); ITEMS.forEach(i=>{ if(r.items[i.id]!=null) n++; });
  if(r.pace!=null) n++; if(r.splurge!=null) n++; if(r.show!=null) n++;
  return n;
}

// ---------- home ----------
function renderHome(){
  const names = Object.values(responses);
  app.innerHTML = '<div class="wrap">'
   + '<div class="kicker">Spring Break · March 2027</div>'
   + '<h1>New York City: what matters most to you?</h1>'
   + '<div class="band"></div>'
   + '<p class="sub">Rate the kinds of trip you want and the things you’d love to do. When everyone’s done, we’ll look at the results together and pick our theme. About 5 minutes.</p>'
   + msgHTML()
   + '<div class="card"><h3>Who’s answering?</h3>'
   + '<div style="margin-top:10px"><input type="text" id="nm" placeholder="Your name" autocomplete="off" value="'+esc(lastName())+'"></div>'
   + (names.length ? '<p class="note" style="margin:12px 0 0">Already answered (tap your name to change your answers):</p><div class="who">' + names.map(r => '<button class="chip" data-edit="'+esc(keyOf(r.name))+'">'+esc(r.name)+'</button>').join('') + '</div>' : (loaded ? '' : '<p class="note" style="margin:12px 0 0">Loading…</p>'))
   + '<div class="row" style="margin-top:14px"><button class="btn" id="start">Start</button>'
   + (names.length ? '<button class="btn alt" id="res">See results ('+names.length+')</button>' : '') + '</div></div>'
   + '<details class="card" style="margin-top:22px"><summary style="font-weight:600;cursor:pointer">For Ash: add answers someone texted you</summary>'
   + '<p class="note">Paste the whole message. Every NYCPICKS code in it gets added.</p>'
   + '<textarea id="imp" placeholder="Paste here"></textarea><div class="row" style="margin-top:10px"><button class="btn small" id="impb">Add answers</button></div></details>'
   + '</div>';
  const nm = document.getElementById('nm');
  document.getElementById('start').onclick = () => {
    const n = nm.value.trim(); if(!n){ nm.focus(); nm.style.borderColor = 'var(--red)'; return; }
    const ex = responses[keyOf(n)];
    current = loadDraft(n) || (ex ? JSON.parse(JSON.stringify(ex)) : blank(n));
    current.name = n; msg = ''; go('survey');
  };
  nm.onkeydown = e => { if(e.key==='Enter') document.getElementById('start').click(); };
  const rb = document.getElementById('res'); if(rb) rb.onclick = () => { msg=''; go('results'); };
  app.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
    current = JSON.parse(JSON.stringify(responses[b.dataset.edit])); msg=''; go('survey');
  });
  document.getElementById('impb').onclick = doImport;
}

// ---------- survey ----------
function renderSurvey(){
  const r = current;
  let h = '<div class="wrap">'
   + '<div class="kicker">'+esc(r.name)+'’s picks</div><h1>Part 1: The vibe</h1>'
   + '<p class="sub">What kind of trip sounds best? Rate each theme.</p>'
   + '<div class="legend"><span><b>Must</b> = this would make the trip</span><span><b>Skip</b> = rather not</span></div>';
  THEMES.forEach(t => {
    h += '<div class="card"><div class="item-name">'+esc(t.name)+'</div><div class="item-note">'+esc(t.desc)+'</div>' + scaleHTML('t', t.id, r.themes[t.id]) + '</div>';
  });
  h += '<h2>Part 2: The specifics</h2><p class="sub">Rate the actual things to do.</p>';
  THEMES.forEach(t => {
    ITEMS.filter(i => i.t===t.id).forEach((i,ix) => {
      h += '<div class="card">' + (ix===0 ? '<span class="theme-tag">'+esc(t.name)+'</span>' : '') + '<div class="item-name">'+esc(i.name)+'</div><div class="item-note">'+esc(i.note)+'</div>' + scaleHTML('i', i.id, r.items[i.id]) + '</div>';
    });
  });
  h += '<h2>Part 3: Trip style</h2>'
   + '<div class="card"><div class="item-name">Pace</div>' + choiceHTML('pace', PACE, r.pace) + '</div>'
   + '<div class="card"><div class="item-name">If we splurge on one thing, make it…</div>' + choiceHTML('splurge', SPLURGE, r.splurge) + '</div>'
   + '<div class="card"><div class="item-name">Broadway pick</div><div class="item-note">We’ll confirm what’s playing closer to the trip</div>' + choiceHTML('show', SHOWS, r.show) + '</div>'
   + '<div class="card"><div class="item-name">The one thing that would make this trip for you</div><textarea id="one" placeholder="Anything at all">'+esc(r.one)+'</textarea></div>'
   + '<div class="card"><div class="item-name">Anything we forgot to ask about?</div><textarea id="miss" placeholder="Places, foods, shows, anything">'+esc(r.miss||'')+'</textarea></div>'
   + '<div class="card"><div class="item-name">Anything you really don’t want to do?</div><textarea id="dont" placeholder="Optional">'+esc(r.dont)+'</textarea></div>'
   + msgHTML()
   + '<div class="row" style="margin-top:16px"><button class="btn" id="save2"'+(saving?' disabled':'')+'>'+(saving?'Saving…':'Save my answers')+'</button><button class="btn alt" id="back">Cancel</button></div>'
   + '</div>';
  const pct = Math.round(answeredCount(r)/TOTAL*100);
  h += '<div class="bar"><div class="inner"><div class="prog"><i style="width:'+pct+'%"></i></div><span class="note" style="min-width:40px">'+pct+'%</span><button class="btn small" id="save1"'+(saving?' disabled':'')+'>'+(saving?'Saving…':'Save')+'</button></div></div>';
  app.innerHTML = h;
  app.querySelectorAll('.scale button').forEach(b => b.onclick = () => {
    const v = +b.dataset.v, tgt = b.dataset.k==='t' ? r.themes : r.items;
    tgt[b.dataset.id] = (tgt[b.dataset.id]===v) ? null : v;
    b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', +x.dataset.v===tgt[b.dataset.id]));
    updateProg(); saveDraft();
  });
  app.querySelectorAll('[data-f]').forEach(b => b.onclick = () => {
    const f = b.dataset.f, i = +b.dataset.i; r[f] = (r[f]===i) ? null : i;
    b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', +x.dataset.i===r[f]));
    updateProg(); saveDraft();
  });
  document.getElementById('one').oninput = e => { r.one = e.target.value; saveDraft(); };
  document.getElementById('dont').oninput = e => { r.dont = e.target.value; saveDraft(); };
  document.getElementById('miss').oninput = e => { r.miss = e.target.value; saveDraft(); };
  document.getElementById('save1').onclick = doSave;
  document.getElementById('save2').onclick = doSave;
  document.getElementById('back').onclick = () => { msg=''; go('home'); };
}
function updateProg(){
  const pct = Math.round(answeredCount(current)/TOTAL*100);
  const i = app.querySelector('.prog i'); if(i) i.style.width = pct+'%';
  const s = app.querySelector('.bar .note'); if(s) s.textContent = pct+'%';
}

async function doSave(){
  if(saving) return;
  saveDraft();
  if(!URL_){ go('send'); return; }
  saving = true; msg = ''; render();
  try{
    await postOne(current);
    saving = false;
    responses[keyOf(current.name)] = JSON.parse(JSON.stringify(current));
    msg = 'Saved! Thanks, ' + current.name + '. Here’s how everyone’s answers stack up so far.'; msgErr = false;
    go('results');
    loadAll().then(() => { if(view==='results') render(); });
  }catch(e){
    saving = false; go('send');
  }
}

// ---------- backup: send answers by text/email ----------
function renderSend(){
  const code = encodeAnswer(current);
  const body = 'My NYC trip picks (' + current.name + '):\n' + code;
  app.innerHTML = '<div class="wrap"><div class="kicker">One more step</div><h1>Send your answers to Ash</h1><div class="band"></div>'
   + '<p class="sub">Your answers couldn’t be saved automatically just now. Send them to Ash instead: tap a button, pick Ash, and hit send.</p>'
   + '<div class="row" style="margin-top:14px"><a class="btn" style="text-decoration:none" href="sms:?&body='+encodeURIComponent(body)+'">Text them</a>'
   + '<a class="btn alt" style="text-decoration:none" href="mailto:?subject='+encodeURIComponent('My NYC trip picks')+'&body='+encodeURIComponent(body)+'">Email them</a>'
   + '<button class="btn alt" id="cp">Copy</button></div>'
   + '<div class="card" style="margin-top:14px"><textarea id="code" readonly style="min-height:100px;font-size:12px">'+esc(code)+'</textarea></div>'
   + '<div class="row" style="margin-top:16px"><button class="btn alt small" id="retry">Try saving again</button><button class="btn alt small" id="edit">Change my answers</button></div></div>';
  const ta = document.getElementById('code');
  document.getElementById('cp').onclick = async e => {
    try{ await navigator.clipboard.writeText(body); e.target.textContent = 'Copied'; }
    catch(err){ ta.focus(); ta.select(); e.target.textContent = 'Select and copy'; }
  };
  document.getElementById('retry').onclick = () => { go('survey'); doSave(); };
  document.getElementById('edit').onclick = () => go('survey');
}

async function doImport(){
  const found = decodeAnswers(document.getElementById('imp').value);
  if(!found.length){ msg = 'No answers found in that text. Paste the whole message that includes NYCPICKS.'; msgErr = true; render(); return; }
  if(!URL_){ msg = 'The answer sheet isn’t connected yet (config.js).'; msgErr = true; render(); return; }
  msg = 'Adding…'; msgErr = false; render();
  const ok = [], bad = [];
  for(const r of found){ try{ await postOne(r); ok.push(r.name); }catch(e){ bad.push(r.name); } }
  await loadAll();
  msg = (ok.length ? 'Added: ' + ok.join(', ') + '. ' : '') + (bad.length ? 'Couldn’t add: ' + bad.join(', ') + '.' : '');
  msgErr = !!bad.length; go(ok.length ? 'results' : 'home');
}

// ---------- results ----------
function tally(list, getter){
  const rs = Object.values(responses);
  return list.map(x => {
    let sum=0, n=0, musts=[], skips=[];
    rs.forEach(r => { const v = (getter(r)||{})[x.id]; if(v==null) return; sum+=v; n++; if(v===3) musts.push(r.name); if(v===0) skips.push(r.name); });
    return Object.assign({}, x, {sum, n, musts, skips});
  }).sort((a,b) => b.sum - a.sum || b.musts.length - a.musts.length || a.skips.length - b.skips.length);
}
function rankRows(rows, showTheme){
  const max = Math.max(1, ...rows.map(r=>r.sum));
  return rows.map((r,ix) => '<div class="rank"><div class="n">'+(ix+1)+'</div><div><div class="item-name">'+esc(r.name)+'</div>'
    + (showTheme ? '<div class="item-note">'+esc((THEMES.find(t=>t.id===r.t)||{}).name)+'</div>' : '')
    + '<div class="meter"><i style="width:'+Math.round(r.sum/max*100)+'%"></i></div>'
    + (r.musts.length ? '<span class="pill must">Must: '+esc(r.musts.join(', '))+'</span>' : '')
    + (r.skips.length ? '<span class="pill skip">Skip: '+esc(r.skips.join(', '))+'</span>' : '')
    + '</div><div class="pts">'+r.sum+'<div class="note" style="font-weight:400;font-size:12px">pts</div></div></div>').join('');
}
function renderResults(){
  const rs = Object.values(responses);
  let h = '<div class="wrap"><div class="kicker">Results · '+rs.length+' answered</div><h1>What the family wants</h1><div class="band"></div>' + msgHTML();
  if(!rs.length){ h += '<p class="sub">'+(loaded ? 'No answers yet.' : 'Loading…')+'</p>'; }
  else {
    h += '<p class="sub">'+esc(rs.map(r=>r.name).join(', '))+'. Points: Must 3, Yes 2, Maybe 1, Skip 0.</p>';
    h += '<div class="tabs">' + [['themes','Themes'],['things','Things to do'],['style','Style & notes']].map(t => '<button class="chip'+(resTab===t[0]?' on':'')+'" data-tab="'+t[0]+'">'+t[1]+'</button>').join('') + '</div>';
    if(resTab==='themes'){
      h += '<div class="card">' + rankRows(tally(THEMES, r=>r.themes), false) + '</div>';
    } else if(resTab==='things'){
      const all = tally(ITEMS, r=>r.items);
      const fights = all.filter(x => x.musts.length && x.skips.length);
      if(fights.length) h += '<div class="msg"><b>To talk about:</b> '+esc(fights.map(f=>f.name).join('; '))+' (someone’s Must is someone else’s Skip).</div>';
      h += '<div class="card">' + rankRows(all, true) + '</div>';
    } else {
      const count = (f, opts) => opts.map((o,i) => ({o, names: rs.filter(r=>r[f]===i).map(r=>r.name)})).filter(x=>x.names.length);
      const block = (title, f, opts) => { const c = count(f, opts); return '<div class="card"><h3>'+title+'</h3>' + (c.length ? c.map(x => '<div style="margin-top:8px"><b>'+esc(x.o)+'</b> <span class="note">'+esc(x.names.join(', '))+'</span></div>').join('') : '<p class="note">No answers yet</p>') + '</div>'; };
      h += block('Pace','pace',PACE) + block('Splurge on','splurge',SPLURGE) + block('Broadway','show',SHOWS);
      const ones = rs.filter(r=>r.one && r.one.trim()), donts = rs.filter(r=>r.dont && r.dont.trim());
      h += '<div class="card"><h3>The one thing that would make the trip</h3>' + (ones.length ? ones.map(r => '<div class="quote"><b>'+esc(r.name)+'</b>'+esc(r.one)+'</div>').join('') : '<p class="note">Nothing yet</p>') + '</div>';
      const misses = rs.filter(r=>r.miss && r.miss.trim());
      if(misses.length) h += '<div class="card"><h3>Ideas we didn\u2019t ask about</h3>' + misses.map(r => '<div class="quote"><b>'+esc(r.name)+'</b>'+esc(r.miss)+'</div>').join('') + '</div>';
      if(donts.length) h += '<div class="card"><h3>Rather not</h3>' + donts.map(r => '<div class="quote"><b>'+esc(r.name)+'</b>'+esc(r.dont)+'</div>').join('') + '</div>';
    }
    h += '<div class="row" style="margin-top:16px"><button class="btn alt small" id="copy">Copy results as text</button><button class="btn alt small" id="refresh">Refresh</button></div><textarea id="copyout" style="display:none;margin-top:10px" readonly></textarea>';
  }
  h += '<div class="row" style="margin-top:16px"><button class="btn" id="home">Back to start</button></div></div>';
  app.innerHTML = h;
  app.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { resTab = b.dataset.tab; msg=''; render(); });
  document.getElementById('home').onclick = () => { msg=''; go('home'); };
  const rf = document.getElementById('refresh'); if(rf) rf.onclick = async () => { rf.textContent = 'Refreshing…'; await loadAll(); msg=''; render(); };
  const cp = document.getElementById('copy');
  if(cp) cp.onclick = async () => {
    const txt = summaryText();
    try{ await navigator.clipboard.writeText(txt); cp.textContent = 'Copied'; }
    catch(e){ const ta = document.getElementById('copyout'); ta.style.display='block'; ta.value = txt; ta.select(); cp.textContent = 'Select and copy below'; }
  };
}
function summaryText(){
  const rs = Object.values(responses);
  const fmt = rows => rows.map((r,i) => (i+1)+'. '+r.name+' ('+r.sum+' pts' + (r.musts.length?'; must: '+r.musts.join(', '):'') + (r.skips.length?'; skip: '+r.skips.join(', '):'') + ')').join('\n');
  let t = 'NYC spring break picks: ' + rs.map(r=>r.name).join(', ') + '\n\nTHEMES\n' + fmt(tally(THEMES, r=>r.themes)) + '\n\nTHINGS TO DO\n' + fmt(tally(ITEMS, r=>r.items)) + '\n\nSTYLE\n';
  rs.forEach(r => { t += r.name + ': pace=' + (r.pace!=null?PACE[r.pace]:'-') + '; splurge=' + (r.splurge!=null?SPLURGE[r.splurge]:'-') + '; show=' + (r.show!=null?SHOWS[r.show]:'-') + (r.one?'; one thing: '+r.one:'') + (r.miss?'; ideas: '+r.miss:'') + (r.dont?'; rather not: '+r.dont:'') + '\n'; });
  return t;
}

function render(){
  if(view==='survey' && current) renderSurvey();
  else if(view==='send' && current) renderSend();
  else if(view==='results') renderResults();
  else renderHome();
}

if(location.hash === '#results') view = 'results';
render();
loadAll().then(() => { if(view !== 'survey' && view !== 'send') render(); });
})();
