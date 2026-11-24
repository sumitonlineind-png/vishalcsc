'use strict';
const ic=(n,c)=>`<svg class="i ${c||''}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const okImg=u=>/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(u||'');

const S=[
["fingerprint","Aadhaar Services","Address & mobile update, PVC card, download and e-KYC support"],
["credit-card","PAN Card","New PAN, corrections, reprint and PAN–Aadhaar linking"],
["file-badge","Certificates","Income, caste, domicile, birth & death certificates via Saral Haryana"],
["landmark","Banking & AEPS","Cash withdrawal, deposit, money transfer and mini statements"],
["zap","Bill Payments & Recharge","Electricity, water, gas, DTH, mobile recharge and FASTag"],
["briefcase","Job & Exam Forms","HSSC, HTET, CET, SSC, police, army & all sarkari naukri forms"],
["graduation-cap","Scholarships & Admissions","Scholarship portals, college admissions and result printouts"],
["users","Family ID (PPP) & Ration","Parivar Pehchan Patra updates, ration card and pension schemes"],
["heart-pulse","Ayushman & Insurance","Ayushman Bharat card, life, health and vehicle insurance"],
["wheat","Kisan Services","PM-Kisan, Meri Fasal Mera Byora, crop insurance and land records"],
["plane","Tickets & Travel","Train, bus and flight tickets, passport application help"],
["printer","Print, Scan & Lamination","Colour print, photocopy, scanning, photos and lamination"],
["receipt","GST & ITR Filing","Income tax returns, GST registration and Udyam MSME"],
["car","Licence & RTO","Learner & driving licence, vehicle RC and challan services"]];
const F=[["shield-check","Safe & confidential","Documents and personal data handled with full care and privacy"],["zap","Quick service","Most work completed same day — no repeated visits to offices"],["indian-rupee","Fair, transparent rates","Clear pricing explained upfront, no hidden charges"],["handshake","Trusted locally","Familiar face in Phaphrana helping families, farmers and students"]];
const H=[["Call or visit","Reach us by phone, WhatsApp or walk into the centre in Phaphrana."],["Share documents","Bring required documents — we tell you exactly what is needed."],["We do the work","Application, payment or update processed online on the spot."],["Get your receipt","Receive printouts, acknowledgement and status updates on your phone."]];
const $=id=>document.getElementById(id);
$('grid').innerHTML=S.map(([i,t,d])=>`<div class="rv card rounded-3xl p-6"><span class="ico">${ic(i,'w-5 h-5')}</span><h3 class="mt-5 text-lg">${t}</h3><p class="mt-1.5 text-sm text-white/60">${d}</p></div>`).join('')+
`<div class="rv rounded-3xl p-6 flex flex-col justify-between" style="background:var(--cream);color:var(--ink)"><div><h3 class="text-2xl" style="color:var(--ink)">Need something else?</h3><p class="mt-2" style="color:#44506f">If it's online, we can do it. Tell us what you need.</p></div><button id="ask" class="mt-6 self-start rounded-full bg-[#0E1A3F] text-white px-5 py-2.5 font-medium">Ask us →</button></div>`;
$('feats').innerHTML=F.map(([i,t,d])=>`<div class="rv glass rounded-3xl p-6"><span class="ico">${ic(i,'w-5 h-5')}</span><h3 class="mt-4 text-lg">${t}</h3><p class="mt-1 text-sm text-white/70">${d}</p></div>`).join('');
$('steps').innerHTML=H.map(([t,d],k)=>`<div class="rv card rounded-3xl p-6"><div class="font-display text-5xl font-light dim">0${k+1}</div><h3 class="mt-4 text-lg">${t}</h3><p class="mt-1 text-sm text-white/60">${d}</p></div>`).join('');
const OTHER='Other / General Enquiry';
$('s').innerHTML=S.map(x=>`<option>${x[1]}</option>`).join('')+`<option>${OTHER}</option>`;
$('ask').onclick=()=>{$('s').value=OTHER;$('contact').scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>$('n').focus({preventScroll:true}),600)};
$('f').onsubmit=e=>{e.preventDefault();
 const t=`Hello Vishal CSC Centre,%0AName: ${encodeURIComponent($('n').value)}%0AMobile: ${$('m').value}${$('e').value?'%0AEmail: '+encodeURIComponent($('e').value):''}%0AService: ${encodeURIComponent($('s').value)}%0ADetails: ${encodeURIComponent($('d').value)}`;
 $('wa').href='https://wa.me/919812321208?text='+t;$('ok').classList.remove('hidden');$('f').classList.add('hidden')};

const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));


const FIREBASE_CONFIG={apiKey:"AIzaSyCSSQ9792wWwJhsflpolO4mYiL6UpBdPJI",authDomain:"webapp-c4e83.firebaseapp.com",projectId:"webapp-c4e83",storageBucket:"webapp-c4e83.firebasestorage.app",messagingSenderId:"552943239920",appId:"1:552943239920:web:d450cdcb022a6df2a8f835"};
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let db,auth,rates={},newsL=[],postL=[];
const ready=!!(window.firebase&&FIREBASE_CONFIG.apiKey);
const icons=()=>{};
function renderServices(){
 $('grid').innerHTML=S.map(([i,t,d])=>`<div class="rv in card rounded-3xl p-6"><span class="ico">${ic(i,'w-5 h-5')}</span><h3 class="mt-5 text-lg">${t}</h3><p class="mt-1.5 text-sm text-white/60">${d}</p>${rates[t]?`<div class="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">${esc(rates[t])}</div>`:''}</div>`).join('')+
 `<div class="rv in rounded-3xl p-6 flex flex-col justify-between" style="background:var(--cream);color:var(--ink)"><div><h3 class="text-2xl" style="color:var(--ink)">Need something else?</h3><p class="mt-2" style="color:#44506f">If it's online, we can do it. Tell us what you need.</p></div><button id="ask" class="mt-6 self-start rounded-full bg-[#0E1A3F] text-white px-5 py-2.5 font-medium">Ask us →</button></div>`;
 $('ask').onclick=()=>{$('s').value='Other / General Enquiry';$('contact').scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>$('n').focus({preventScroll:true}),600)};
 icons();
}
function renderNews(){
 const a=newsL.filter(n=>n.active);
 $('newsbar').classList.toggle('hidden',!a.length);document.body.classList.toggle('hasnews',a.length>0);
 $('newstext').textContent=a.map(n=>n.text).join('     •     ');
 $('newsAdm').innerHTML=newsL.map(n=>`<div class="glass rounded-2xl p-3 flex items-center gap-3"><span class="flex-1 text-white text-sm">${esc(n.text)}</span><button data-a="tg" data-id="${n.id}" class="glass rounded-full px-3 py-1 text-xs text-white">${n.active?'Live ✓':'Hidden'}</button><button data-a="dn" data-id="${n.id}" class="rounded-full px-3 py-1 text-xs text-red-300">Delete</button></div>`).join('');
}
function renderPosts(){
 $('updates').classList.toggle('hidden',!postL.length);
 $('postGrid').innerHTML=postL.map(p=>`<article class="card rounded-3xl overflow-hidden">${okImg(p.image)?`<img src="${p.image}" alt="${esc(p.title)}" loading="lazy" class="w-full h-52 object-cover">`:''}<div class="p-6"><p class="text-xs dim">${p.createdAt&&p.createdAt.toDate?p.createdAt.toDate().toLocaleDateString('en-IN'):''}</p><h3 class="mt-1 text-xl">${esc(p.title)}</h3><p class="mt-2 text-sm text-white/65 whitespace-pre-line">${esc(p.body)}</p></div></article>`).join('');
 $('postAdm').innerHTML=postL.map(p=>`<div class="glass rounded-2xl p-3 flex items-center gap-3">${okImg(p.image)?`<img src="${p.image}" alt="" class="w-12 h-12 rounded-xl object-cover">`:''}<span class="flex-1 text-white text-sm">${esc(p.title)}</span><button data-a="dp" data-id="${p.id}" class="rounded-full px-3 py-1 text-xs text-red-300">Delete</button></div>`).join('');
}
function renderAdminRates(){
 const el=$('ratesList');if(el.contains(document.activeElement))return;
 el.innerHTML=S.map(x=>`<label class="flex items-center gap-3 glass rounded-2xl p-3"><span class="flex-1 text-white text-sm">${esc(x[1])}</span><input data-r="${esc(x[1])}" value="${esc(rates[x[1]]||'')}" placeholder="₹ rate" class="!w-40 !py-2"></label>`).join('');
}
renderAdminRates();
if(ready){
 firebase.initializeApp(FIREBASE_CONFIG);db=firebase.firestore();auth=firebase.auth();
 const q=()=>{};
 db.doc('settings/rates').onSnapshot(d=>{rates=(d.data()||{}).rates||{};renderServices();renderAdminRates()},q);
 db.collection('news').orderBy('createdAt','desc').limit(10).onSnapshot(sn=>{newsL=sn.docs.map(d=>({id:d.id,...d.data()}));renderNews()},q);
 db.collection('posts').orderBy('createdAt','desc').limit(12).onSnapshot(sn=>{postL=sn.docs.map(d=>({id:d.id,...d.data()}));renderPosts()},q);
 auth.onAuthStateChanged(u=>{$('loginF').classList.toggle('hidden',!!u);$('panel').classList.toggle('hidden',!u);$('logout').classList.toggle('hidden',!u)});
}
const openAdmin=()=>{$('admin').classList.remove('hidden');document.body.style.overflow='hidden';$('nocfg').classList.toggle('hidden',ready)};
$('adminOpen').onclick=openAdmin;
$('adminClose').onclick=()=>{$('admin').classList.add('hidden');document.body.style.overflow=''};
$('logout').onclick=()=>auth&&auth.signOut();
$('loginF').onsubmit=async e=>{e.preventDefault();$('lerr').textContent='';if(!ready){$('nocfg').classList.remove('hidden');return}
 try{await auth.signInWithEmailAndPassword($('ae').value,$('ap').value)}catch(x){$('lerr').textContent='Login nahi hua — email ya password galat hai.'}};
$('tabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;
 document.querySelectorAll('.tabp').forEach(x=>x.classList.add('hidden'));$(b.dataset.t).classList.remove('hidden');
 [...$('tabs').children].forEach(x=>{x.className=x===b?'btn px-4 py-2 text-sm':'glass rounded-full px-4 py-2 text-sm text-white'})};
$('saveRates').onclick=async()=>{const o={};document.querySelectorAll('[data-r]').forEach(i=>{if(i.value.trim())o[i.dataset.r]=i.value.trim()});
 try{await db.doc('settings/rates').set({rates:o});$('rmsg').textContent='Saved ✓'}catch(x){$('rmsg').textContent='Save nahi hua (permission check karo)'}};
$('addNews').onclick=async()=>{const t=$('newsIn').value.trim();if(!t)return;
 try{await db.collection('news').add({text:t,active:true,createdAt:firebase.firestore.FieldValue.serverTimestamp()});$('newsIn').value=''}catch(x){alert('Add nahi hua')}};
const shrink=f=>new Promise((res,rej)=>{const im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.72))};im.onerror=rej;im.src=URL.createObjectURL(f)});
$('addPost').onclick=async()=>{const t=$('pT').value.trim();if(!t)return;$('pmsg').textContent='Uploading…';
 try{const f=$('pF').files[0];const image=f?await shrink(f):'';
  await db.collection('posts').add({title:t,body:$('pB').value.trim(),image,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
  $('pT').value='';$('pB').value='';$('pF').value='';$('pmsg').textContent='Published ✓'}catch(x){$('pmsg').textContent='Nahi hua — photo chhoti try karo'}};
$('admin').onclick=async e=>{const b=e.target.closest('[data-a]');if(!b)return;const id=b.dataset.id,a=b.dataset.a;
 try{if(a==='tg'){const n=newsL.find(x=>x.id===id);await db.collection('news').doc(id).update({active:!n.active})}
 else if(confirm('Delete karna hai?'))await db.collection(a==='dn'?'news':'posts').doc(id).delete()}catch(x){alert('Nahi hua')}};

/* hardening: login throttle + idle logout */
let fails=0,lockT=0;
const lf=$('loginF');
if(lf){lf.addEventListener('submit',e=>{if(Date.now()<lockT){e.stopImmediatePropagation();e.preventDefault();$('lerr').textContent='Bahut koshish ho gayi — 1 minute baad try karo.'}},true);
 const le=$('lerr');new MutationObserver(()=>{if(le.textContent.startsWith('Login nahi')&&++fails>=5){fails=0;lockT=Date.now()+60000}}).observe(le,{childList:true,characterData:true,subtree:true})}
let idle;const arm=()=>{clearTimeout(idle);if(auth&&auth.currentUser)idle=setTimeout(()=>auth.signOut(),20*60000)};
['click','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,arm,{passive:true}));
