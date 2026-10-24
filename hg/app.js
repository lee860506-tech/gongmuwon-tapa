/* 합격온 — 앱 셸 (하단 탭 · 홈 대시보드 · 오늘의 체크리스트 · 스트릭 · 타이머 · 북마크 · 마이) */
(function(){
const HK='hapgyeokon_v1',TAGLINE='푸는 오늘이, 합격하는 내일로';
/* 준혁 스티커 (webp + png 대체) */
const STK={fight:'오늘도 파이팅!',great:'와, 잘했어!!',retry:'아쉽다, 다시 해보자!',focus:'집중해서 끝까지!'};
const stk=(k,cls='',st='')=>`<img class="hg-stk ${cls}" src="hg/stk/${k}.webp" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='hg/stk/${k}.png'}" alt="준혁: ${STK[k]}" width="560" height="560" decoding="async"${st?` style="${st}"`:''}>`;

const RM=matchMedia('(prefers-reduced-motion: reduce)');
let H=JSON.parse(localStorage.getItem(HK)||'null')||{};
H.days=H.days||{};H.cl=H.cl||null;H.tpl=H.tpl||[];H.hist=H.hist||{};H.bm=H.bm||{};H.folders=H.folders||['기본'];
H.set=Object.assign({goal:20,timerGoal:120,pomo:25,auto:true,carry:true},H.set||{});H.timer=H.timer||{run:null};
const hSave=()=>{try{localStorage.setItem(HK,JSON.stringify(H));return true}catch(e){alert('저장 공간이 가득 찼어요 😢 오답노트의 스크린샷을 조금 지워 주세요.');return false}};
const pad=n=>String(n).padStart(2,'0');
const dkey=(t)=>{const d=t?new Date(t):new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const addDays=(k,n)=>{const [y,m,d]=k.split('-').map(Number);const x=new Date(y,m-1,d+n);return dkey(x.getTime())};
const WD='일월화수목금토';const wdOf=k=>{const [y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d).getDay()};
const day=(k)=>{k=k||dkey();return H.days[k]=H.days[k]||{q:0,mc:0,ox:0,voca:0,dk:0,wr:0,sec:0,bmv:0,cl:false}};
const ea=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const G=window; const has=n=>typeof G[n]!=='undefined';
/* ---------- icons ---------- */
const SV=(p,extra='')=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const IC={
 home:SV('<path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1h-5v-6h-5v6h-5a1 1 0 0 1-1-1z"/>'),
 study:SV('<path d="M3 5.5c3-1.3 6-1.3 9 .8v13c-3-2-6-2-9-.8z"/><path d="M21 5.5c-3-1.3-6-1.3-9 .8v13c3-2 6-2 9-.8z"/>'),
 note:SV('<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M9 9l2 2 4-4M9 15h6"/>'),
 my:SV('<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.4-3.6 4.2-5.4 7.5-5.4s6.1 1.8 7.5 5.4"/>'),
 doc:SV('<path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11.5V3.5z"/><path d="M14 3.5V8h4M9 12h6M9 15.5h4"/><path d="M15.5 17.5l3.5-3.5 1.5 1.5-3.5 3.5h-1.5z" fill="currentColor"/>'),
 redo:SV('<rect x="4.5" y="3.5" width="13" height="17" rx="2.5"/><path d="M8 9h6M8 12.5h4"/><circle cx="17.5" cy="17" r="3.8" fill="#fff"/><path d="M15.8 17l1.2 1.2 2.2-2.4"/>'),
 vari:SV('<rect x="4" y="3.5" width="12" height="15" rx="2.5"/><path d="M8 8h5M8 11.5h3"/><path d="M14.5 16.5a4 4 0 1 0 1.2-3"/><path d="M15.5 11.8v2.2h2.2"/>'),
 chart:SV('<path d="M4 20.5h16"/><rect x="5.5" y="12" width="3" height="6" rx="1"/><rect x="10.5" y="8" width="3" height="10" rx="1"/><rect x="15.5" y="4.5" width="3" height="13.5" rx="1"/>'),
 abc:SV('<path d="M4 17l3.5-10L11 17M5.3 13.5h4.4"/><path d="M14 7h3.2a2.3 2.3 0 0 1 0 4.6H14zm0 4.6h3.8a2.7 2.7 0 0 1 0 5.4H14z"/>'),
 read:SV('<path d="M3 6c3-1.2 6-1.2 9 .8v12c-3-2-6-2-9-.8z"/><path d="M21 6c-3-1.2-6-1.2-9 .8v12c3-2 6-2 9-.8z"/><circle cx="17.5" cy="5" r="1.2" fill="currentColor"/>'),
 ox:SV('<circle cx="7.5" cy="12" r="4"/><path d="M14 8l6 8M20 8l-6 8"/>'),
 bm:SV('<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>'),
 timer:SV('<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 2M9.5 2.8h5"/>'),
 rand:SV('<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/>'),
 fire:SV('<path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.2 2.6-4.9 3.6-8.4 2.6 1.5 3 3.6 2.8 5 1-.6 1.7-1.7 1.9-3 2 1.8 3.7 4 3.7 6.6 0 3-2.4 5.4-6 5.4z"/>'),
};
const LOGO='hg/logo.svg';
/* ---------- activity & streak ---------- */
function act(kind,wasWrong){const d=day();d.q+=(kind=='bmv'?0:1);if(d[kind]!==undefined)d[kind]++;if(wasWrong)d.wr++;hSave();clCheck(true)}
function studied(k){const d=H.days[k];return !!d&&(d.q>0||d.cl)}
function streak(){let k=dkey(),n=0;if(!studied(k))k=addDays(k,-1);while(studied(k)){n++;k=addDays(k,-1)}return n}
function wrapG(name,fn){if(typeof G[name]!=='function')return;const o=G[name];G[name]=function(){return fn(o,this,arguments)}}
function hookAll(){
 wrapG('answer',(o,t,a)=>{let first=false,ww=false;try{first=st&&st.picked==null;const k=st.list[st.i];ww=!!(S.wrong[k]&&!S.wrong[k].done)}catch(e){}const r=o.apply(t,a);if(first)act('mc',ww);return r});
 wrapG('oxAnswer',(o,t,a)=>{let first=false,ww=false;try{first=st&&st.picked==null;const k=st.list[st.i];ww=!!(S.oxw[k]&&!S.oxw[k].done)}catch(e){}const r=o.apply(t,a);if(first)act('ox',ww);return r});
 wrapG('vAns',(o,t,a)=>{let first=false;try{first=vst&&vst.picked==null}catch(e){}const r=o.apply(t,a);if(first)act('voca');return r});
 wrapG('vFlash',(o,t,a)=>{let first=false;try{first=vst&&vst.picked==null}catch(e){}const r=o.apply(t,a);if(first)act('voca');return r});
 if(G.DK){['ans'].forEach(n=>{const o=G.DK[n];if(o)G.DK[n]=function(){let first=true;try{first=!document.querySelector('#app .dk-react')}catch(e){}const r=o.apply(this,arguments);if(first)act('dk');return r}});
  const ov=G.DK.vans;if(ov)G.DK.vans=function(){const r=ov.apply(this,arguments);act('dk');return r}}
}
/* ---------- counts ---------- */
const openWrong=()=>{let n=0;try{n+=Object.keys(S.wrong).filter(k=>ALL[k]&&!S.wrong[k].done).length;n+=Object.keys(S.oxw||{}).filter(k=>OXM[k]&&!S.oxw[k].done).length}catch(e){}return n};
const dueVoca=()=>{try{return vDue()}catch(e){return[]}};
const bmCount=()=>Object.keys(H.bm).length;
/* ---------- checklist ---------- */
function autoItems(){const L=[];const due=dueVoca();
 if(due.length){const ds=[...new Set(due.map(k=>VM[k]&&VM[k].d))].filter(Boolean).sort((a,b)=>a-b);L.push({text:`영단어 DAY ${ds.slice(0,4).join('·')}${ds.length>4?' 외':''} 복습 (${due.length}개)`,auto:{type:'voca',keys:due.slice(0,400)}})}
 const ow=openWrong();if(ow)L.push({text:`오답 복습 ${Math.min(ow,10)}개`,auto:{type:'wrong',n:Math.min(ow,10)}});
 L.push({text:'독해 5문제',auto:{type:'dk',n:5}});
 const bc=bmCount();if(bc)L.push({text:`북마크 ${Math.min(bc,10)}개 보기`,auto:{type:'bm',n:Math.min(bc,10)}});
 L.push({text:`타이머 ${H.set.timerGoal>=60?(H.set.timerGoal/60)+'시간':H.set.timerGoal+'분'} 공부`,auto:{type:'timer',n:H.set.timerGoal*60}});
 L.push({text:`오늘의 학습 ${H.set.goal}문제`,auto:{type:'goal',n:H.set.goal}});
 return L.map(x=>Object.assign({id:uid(),done:false,kind:'auto',sec:0},x))}
function tplItems(k){const w=wdOf(k);return H.tpl.filter(t=>t.rep=='daily'||(t.rep=='weekdays'&&w>=1&&w<=5)).map(t=>({id:uid(),text:t.text,done:false,kind:'tpl',tpl:t.id,sec:0}))}
function archive(cl){if(!cl||!cl.items)return;const it=cl.items;H.hist[cl.date]={total:it.length,done:it.filter(x=>x.done).length,items:it.map(x=>({t:x.text,d:x.done,s:x.sec||0}))};
 const ks=Object.keys(H.hist).sort();while(ks.length>120)delete H.hist[ks.shift()]}
function ensureDay(){const k=dkey();if(H.cl&&H.cl.date==k)return false;const old=H.cl;
 const items=tplItems(k);
 if(old&&old.items&&H.set.carry){old.items.filter(x=>!x.done&&(x.kind=='user'||x.kind=='carry')).forEach(x=>items.push({id:uid(),text:x.text,done:false,kind:'carry',sec:0}))}
 if(old)archive(old);
 if(H.set.auto)autoItems().forEach(x=>items.push(x));
 H.cl={date:k,items,celebrated:false};hSave();return true}
function cond(x){const a=x.auto;if(!a)return false;const d=day();
 if(a.type=='voca'){const due=new Set(dueVoca());return a.keys.length>0&&a.keys.every(k=>!due.has(k))}
 if(a.type=='wrong')return d.wr>=a.n; if(a.type=='dk')return d.dk>=a.n; if(a.type=='bm')return d.bmv>=a.n;
 if(a.type=='timer')return d.sec+runningSec()>=a.n; if(a.type=='goal')return d.q>=a.n; return false}
function prog(x){const a=x.auto;if(!a)return'';const d=day();const f=(v,n)=>` <span class="meta">${Math.min(v,n)}/${n}</span>`;
 if(a.type=='wrong')return f(d.wr,a.n);if(a.type=='dk')return f(d.dk,a.n);if(a.type=='bm')return f(d.bmv,a.n);if(a.type=='goal')return f(d.q,a.n);
 if(a.type=='timer')return ` <span class="meta">${Math.floor((d.sec+runningSec())/60)}/${a.n/60}분</span>`;
 if(a.type=='voca'){const due=new Set(dueVoca());const left=a.keys.filter(k=>due.has(k)).length;return ` <span class="meta">남은 단어 ${left}개</span>`}return''}
function clPct(){const it=H.cl.items;return it.length?Math.round(it.filter(x=>x.done).length/it.length*100):0}
function clCheck(fromAct){ensureDay();let ch=false;H.cl.items.forEach(x=>{if(!x.done&&x.auto&&cond(x)){x.done=true;x.autoDone=true;ch=true}});
 if(ch){hSave();if(fromAct)toast('✅ 체크리스트 자동 완료!')}celebrate()}
function celebrate(){const it=H.cl.items;if(it.length&&it.every(x=>x.done)){day().cl=true;if(!H.cl.celebrated){H.cl.celebrated=true;hSave();confetti(60);toast('🎉 오늘의 체크리스트 100%! 스트릭 +1','big');stkPop('great');if(view=='hg')setTimeout(rr,50)}}else{if(H.cl.celebrated){H.cl.celebrated=false;}day().cl=false;hSave()}}
let clEdit=false;
function clHTML(){ensureDay();const it=H.cl.items,p=clPct();
 const row=(x,i)=>clEdit?`<li><input class="ed" value="${ea(x.text)}" onchange="HG.clText('${x.id}',this.value)"><button class="hg-ib" onclick="HG.clMove('${x.id}',-1)" ${i==0?'disabled':''} aria-label="위로">↑</button><button class="hg-ib" onclick="HG.clMove('${x.id}',1)" ${i==it.length-1?'disabled':''} aria-label="아래로">↓</button><button class="hg-ib r" onclick="HG.clDel('${x.id}')" aria-label="삭제">×</button></li>`
 :`<li class="${x.done?'done':''}"><button class="hg-ck" onclick="HG.clToggle('${x.id}')" aria-label="완료 표시">${x.done?'✓':''}</button><span class="tx">${ea(x.text)}${x.kind=='auto'?'<span class="tag">자동</span>':x.kind=='tpl'?'<span class="tag">반복</span>':x.kind=='carry'?'<span class="tag">이월</span>':''}${prog(x)}${x.sec?`<span class="meta">⏱ ${fmtM(x.sec+(H.timer.run&&H.timer.run.item==x.id?runningSec():0))}</span>`:''}</span><button class="hg-ib" onclick="HG.tStart('${x.id}')" title="이 항목으로 타이머 시작">⏱</button></li>`;
 return`<div class="card hg-in" id="hgCL"><div class="hg-cl-head">${ring(p,'%')}${stk(p>=100?'great':'fight','clh')}<div class="t"><h3>오늘의 체크리스트</h3><small style="color:var(--muted)">${it.filter(x=>x.done).length}/${it.length} 완료 · 자정에 새로 시작돼요</small></div><button class="hg-ib" onclick="HG.clEditT()">${clEdit?'완료':'편집'}</button></div>
 ${p==100&&it.length?mascot(M.ok,'우와, 오늘 할 일 전부 끝! 정말 대단해 🎉 스트릭도 지켰어!'):''}
 <ul class="hg-cl">${it.map(row).join('')||'<li><span class="tx" style="color:var(--muted)">할 일을 추가해 볼까요? ✍</span></li>'}</ul>
 <div class="hg-add"><input id="hgNew" placeholder="할 일 추가 (예: 세법 2024 10문제)" onkeydown="if(event.key=='Enter')HG.clAdd()"><select id="hgRep" aria-label="반복"><option value="">한 번</option><option value="daily">매일 반복</option><option value="weekdays">평일 반복</option></select><button class="btn" style="padding:9px 16px!important" onclick="HG.clAdd()">추가</button></div>
 <div style="margin-top:6px"><button class="btn sub" style="padding:8px 14px!important;font-size:13px" onclick="HG.clSuggest()">✨ 추천 항목 추가</button></div></div>`}
/* ---------- timer ---------- */
const runningSec=()=>H.timer.run?Math.floor((Date.now()-H.timer.run.start)/1000):0;
const fmt=s=>pad(Math.floor(s/60))+':'+pad(s%60);const fmtM=s=>s>=3600?Math.floor(s/3600)+'시간 '+Math.floor(s%3600/60)+'분':Math.floor(s/60)+'분';
function tStart(item,dur){if(H.timer.run)tStop(true);H.timer.run={start:Date.now(),item:item||null,dur:dur==null?H.set.pomo*60:dur};hSave();tTick();rr()}
function tStop(silent){const r=H.timer.run;if(!r)return;let s=Math.floor((Date.now()-r.start)/1000);if(r.dur)s=Math.min(s,r.dur);const dk=dkey(r.start)==dkey()?dkey():dkey();day(dk).sec+=s;
 if(r.item&&H.cl){const x=H.cl.items.find(i=>i.id==r.item);if(x)x.sec=(x.sec||0)+s}H.timer.run=null;hSave();clCheck();if(!silent){toast(`⏱ ${fmtM(s)} 공부 기록!`);rr()}}
let tI=null;function tTick(){clearInterval(tI);const f=()=>{let el=document.getElementById('hgFT');const r=H.timer.run;if(!r){if(el)el.remove();clearInterval(tI);return}
 const s=runningSec();if(r.dur&&s>=r.dur){tStop(true);confetti(40);toast(`⏰ ${Math.round(r.dur/60)}분 집중 완료! 잠깐 쉬어 가자 ☕`,'big');rr();return}
 if(!el){el=document.createElement('div');el.id='hgFT';el.className='hg-ftimer';document.body.appendChild(el)}
 const it=r.item&&H.cl?H.cl.items.find(i=>i.id==r.item):null;const shown=r.dur?r.dur-s:s;
 el.innerHTML=`${stk('focus','ft')}⏱ ${fmt(shown)}${it?`<span class="n">${ea(it.text)}</span>`:`<span class="n">${r.dur?'집중 타이머':'자유 타이머'}</span>`}<button onclick="HG.tStop()">■ 정지</button>`;
 const c=document.getElementById('hgTChip');if(c)c.querySelector('b').textContent=fmt(shown)};f();tI=setInterval(f,1000)}
/* ---------- ring / confetti / toast ---------- */
function ring(p,suf,label){const r=22,c=2*Math.PI*r;return`<svg class="hg-ring" viewBox="0 0 52 52" aria-label="${label||'진행률'} ${p}%"><defs><linearGradient id="hgRG" x1="0" x2="1"><stop offset="0" stop-color="#4C63E7"/><stop offset="1" stop-color="#8B7CF6"/></linearGradient></defs><circle class="bgc" cx="26" cy="26" r="${r}"/><circle class="fg" cx="26" cy="26" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${RM.matches?c*(1-p/100):c}" data-off="${c*(1-p/100)}" transform="rotate(-90 26 26)"/><text x="26" y="27" style="font-size:${String(p).length>2?12:14}px">${p}${suf||''}</text></svg>`}
function animRing(){requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelectorAll('.hg-ring .fg').forEach(e=>e.style.strokeDashoffset=e.dataset.off)))}
function confetti(n){if(RM.matches)return;const cs=['#4C63E7','#8B7CF6','#C7B7FF','#A7D8FF','#CFE8D8','#FFD6D6','#FFE27A'];for(let i=0;i<n;i++){const e=document.createElement('i');e.className='hg-conf';e.style.left=Math.random()*100+'vw';e.style.background=cs[i%cs.length];e.style.animationDelay=Math.random()*.5+'s';e.style.animationDuration=1.2+Math.random()*.9+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),2800)}}
function toast(t,big){let e=document.getElementById('hgToast');if(!e){e=document.createElement('div');e.id='hgToast';e.style.cssText='position:fixed;left:50%;top:18px;transform:translateX(-50%);z-index:160;background:#24284A;color:#fff;padding:10px 18px;border-radius:999px;font-weight:700;font-size:14px;box-shadow:0 8px 20px rgba(0,0,0,.2);transition:opacity .3s;max-width:90vw;text-align:center';document.body.appendChild(e)}e.textContent=t;e.style.opacity=1;e.style.fontSize=big?'16px':'14px';clearTimeout(e._t);e._t=setTimeout(()=>e.style.opacity=0,big?3200:2000)}
/* ---------- bookmarks ---------- */
function bmMeta(id){const [t,k]=[id.slice(0,2),id.slice(3)];
 if(t=='mc'){const q=ALL[k];return q?{kind:'객관식',sub:q.sub,subN:SUBJ[q.sub],year:q.year,yl:ys(q.sub,q.year),label:`${q.no}번`,topic:q.topic}:null}
 if(t=='ox'){const o=OXM[k];return o?{kind:'OX',sub:o.sub,subN:SUBJ[o.sub],year:o.year,yl:ys(o.sub,o.year),label:`${o.no}번 OX`,topic:o.topic}:null}
 if(t=='vc'){const v=VM[k];return v?{kind:'단어',sub:'voca',subN:'영단어',year:null,yl:'DAY '+v.d,label:v.w,topic:''}:null}
 if(t=='dk'&&DKM[k]&&DKM[k].src){const q=DKM[k];return{kind:'독해',sub:q.sub=='ko'?'dkko':'dken',subN:q.sub=='ko'?'국어 학원자료':'영어 학원자료',year:q.year,yl:String(q.year),label:q.no+'번',topic:q.type}}
 if(t=='dk'){const q=DKM[k];const [s,y,n]=k.split('-');return{kind:'독해',sub:'dk'+s,subN:s=='en'?'독해(영어)':'독해(국어)',year:+y,yl:y,label:n+'번',topic:q?q.type:''}}
 return null}
let DKM={};function dkReady(cb){if(G.DK&&G.DK.load)G.DK.load((DQ,DM)=>{DKM=DM||{};cb&&cb()});else cb&&cb()}
function curBm(){try{if(view=='quiz'&&st){return(st.ox?'ox|':'mc|')+st.list[st.i]}if(view=='voca_run'&&vst)return'vc|'+vst.list[vst.i];if(view=='dk'&&G.DK&&G.DK.curId){const i=G.DK.curId();return i?'dk|'+i:null}}catch(e){}return null}
function bmBtn(id){const on=!!H.bm[id];return`<button class="hg-bm ${on?'on':''}" data-bm="${ea(id)}" onclick="event.stopPropagation();HG.bmToggle(this.dataset.bm,this)" title="${on?'북마크 해제':'모르는 문제로 북마크'}" aria-pressed="${on}">${IC.bm}</button>`}
function injectBm(){const id=curBm();if(!id)return;const h=document.querySelector('#app .qhead');if(!h||h.querySelector('.hg-bm'))return;const s=document.createElement('span');s.innerHTML=bmBtn(id);h.appendChild(s.firstChild)}
let bmF={sub:'all',kind:'all',year:'all',folder:'all'},bmMode='list',bmShow=false,bmI=0,bmFlip=false;
function bmList(){return Object.keys(H.bm).map(id=>({id,m:bmMeta(id),b:H.bm[id]})).filter(x=>x.m&&(bmF.sub=='all'||x.m.sub==bmF.sub)&&(bmF.kind=='all'||x.m.kind==bmF.kind)&&(bmF.year=='all'||String(x.m.year)==bmF.year)&&(bmF.folder=='all'||(x.b.f||'기본')==bmF.folder)).sort((a,b)=>b.b.t-a.b.t)}
function bmBody(x,showAns){const t=x.id.slice(0,2),k=x.id.slice(3);
 if(t=='mc'){const q=ALL[k];return`<div class="q">${ea(q.stem)}</div>${q.choices.map((c,j)=>`<div style="margin:4px 0;${showAns&&j+1==q.answer?'color:#2f9a64;font-weight:700':''}">${'①②③④⑤'[j]} ${ea(c)}</div>`).join('')}`+(showAns?`<div class="hg-ans"><b>정답 ${'①②③④⑤'[q.answer-1]}</b>\n${ea(q.explanation||'')}</div>${q.variant?`<details><summary>🔁 변형문제도 보기</summary>${block(q.variant,'변형')}</details>`:''}`:'')}
 if(t=='ox'){const o=OXM[k];return`${o.ctx?`<div class="ctx">${ea(o.ctx)}</div>`:''}<div class="q" style="margin-top:6px;font-weight:600">${ea(o.s)}</div>`+(showAns?`<div class="hg-ans"><b>정답 ${o.ox=='O'?'⭕ O':'❌ X'}</b>\n${ea(o.exp||'')}</div>`:'')}
 if(t=='vc'){const v=VM[k];return`<div class="big" style="font-size:24px;font-weight:900;color:var(--brand)">${ea(v.w)} ${has('say')?`<button class="hg-ib" onclick="event.stopPropagation();say('${ea(v.w)}','en-US')" aria-label="발음 듣기">🔊</button>`:''}</div>`+(showAns?`<div class="hg-ans"><b>${ea(v.m)}</b></div>`:'')}
 if(t=='dk'){const q=DKM[k];if(!q)return'<small>독해 데이터를 불러오는 중…</small>';return`<div style="font-weight:700">${ea(q.prompt)}</div>${q.given?`<div class="ctx" style="margin-top:6px">${ea(q.given)}</div>`:''}<details ${showAns?'':'open'}><summary>지문 보기</summary><div class="q" style="margin-top:6px">${ea(q.passage)}</div></details>${q.choices.map((c,j)=>`<div style="margin:4px 0;${showAns&&j+1==q.answer?'color:#2f9a64;font-weight:700':''}">${'①②③④⑤⑥'[j]} ${ea(c)}</div>`).join('')}`+(showAns?`<div class="hg-ans"><b>정답 ${'①②③④⑤⑥'[q.answer-1]}</b>\n요지: ${ea(q.a.요지)}\n근거: “${ea(q.a.근거)}”\n함정: ${ea(q.a.함정)}</div>`:'')}
 return''}
function bmView(){const L=bmList(),all=Object.keys(H.bm).map(id=>({id,m:bmMeta(id),b:H.bm[id]})).filter(x=>x.m);
 const subs=[...new Map(all.map(x=>[x.m.sub,x.m.subN])).entries()],years=[...new Set(all.map(x=>x.m.year).filter(Boolean))].sort((a,b)=>b-a),kinds=[...new Set(all.map(x=>x.m.kind))];
 const sel=(k,opts)=>`<select onchange="HG.bmSetF('${k}',this.value)">${opts.map(([v,l])=>`<option value="${ea(v)}" ${String(bmF[k])==String(v)?'selected':''}>${ea(l)}</option>`).join('')}</select>`;
 let h=`<div class="card hg-in">${mascot(M.gentle,all.length?`모르는 것만 쏙쏙 모아 봤어! 하나씩 풀기 싫으면 편하게 넘겨 보기만 해도 돼 😊`:'문제 화면 오른쪽 위 🔖를 누르면 여기에 모여요!')}
 <div class="qhead"><h3 style="margin:0">🔖 북마크 <span class="pill">${all.length}개</span></h3><div class="hg-seg"><button class="${bmMode=='list'?'on':''}" onclick="HG.bmMode('list')">리스트</button><button class="${bmMode=='flash'?'on':''}" onclick="HG.bmMode('flash')">플래시카드</button></div></div>
 <div class="hg-filters" style="margin-top:10px">과목 ${sel('sub',[['all','전체']].concat(subs))} 유형 ${sel('kind',[['all','전체']].concat(kinds.map(k=>[k,k])))} 연도 ${sel('year',[['all','전체']].concat(years.map(y=>[String(y),String(y)])))} 폴더 ${sel('folder',[['all','전체']].concat(H.folders.map(f=>[f,f])))} <button class="hg-ib" onclick="HG.bmFolderNew()">+ 폴더</button></div>
 <div style="margin-top:10px"><b style="font-size:14px">북마크만 풀기 (${L.length}개, 섞어서)</b><br><button class="btn" onclick="HG.bmStudy('orig')">원본</button><button class="btn sub" onclick="HG.bmStudy('var')">변형</button><button class="btn sub" onclick="HG.bmStudy('ox')">O/X</button><button class="btn sub" onclick="HG.bmStudy('voca')">단어 퀴즈</button><button class="btn sub" onclick="HG.bmStudy('dk')">독해</button></div></div>`;
 if(!L.length)return h+`<div class="card" style="text-align:center;color:var(--muted)">조건에 맞는 북마크가 없어요.</div>`;
 if(bmMode=='flash'){bmI=Math.max(0,Math.min(bmI,L.length-1));const x=L[bmI];
  return h+`<div class="card hg-flash hg-bmcard" id="hgFlash" onclick="HG.bmFlip()"><div class="qhead"><span><span class="stag">${ea(x.m.subN)}</span><span class="ytag">${ea(x.m.yl)} ${ea(x.m.label)}</span>${x.m.topic?`<span class="pill">${ea(x.m.topic)}</span>`:''}</span>${bmBtn(x.id)}</div><div style="margin-top:10px">${bmBody(x,bmFlip)}</div>${bmFlip?'':'<p style="text-align:center;color:var(--muted);font-size:13px;margin-top:14px">👆 탭하면 정답·해설이 보여요 · 좌우로 넘기기</p>'}</div>
  <div class="hg-fl-nav"><button class="btn sub" onclick="HG.bmNext(-1)" ${bmI==0?'disabled':''}>← 이전</button><b>${bmI+1} / ${L.length}</b><button class="btn" onclick="HG.bmNext(1)" ${bmI==L.length-1?'disabled':''}>다음 →</button></div>
  <div style="text-align:center;margin-top:6px"><button class="btn sub" onclick="HG.bmMaster('${ea(x.id)}')">✅ 이제 알아요 (북마크 해제)</button></div>`}
 h+=`<div style="margin:0 2px 8px"><label style="font-size:14px"><input type="checkbox" ${bmShow?'checked':''} onchange="HG.bmShowAll(this.checked)"> 정답·해설 모두 펼치기</label></div>`;
 L.forEach(x=>{h+=`<div class="card hg-bmcard"><div class="qhead"><span><span class="stag">${ea(x.m.subN)}</span><span class="ytag">${ea(x.m.yl)} ${ea(x.m.label)}</span>${x.m.topic?`<span class="pill">${ea(x.m.topic)}</span>`:''}</span><span><select style="font-size:12px;padding:4px 6px!important" onchange="HG.bmFolder('${ea(x.id)}',this.value)" aria-label="폴더">${H.folders.map(f=>`<option ${(x.b.f||'기본')==f?'selected':''}>${ea(f)}</option>`).join('')}</select>${bmBtn(x.id)}</span></div><div style="margin-top:8px">${bmBody(x,bmShow)}</div>${bmShow?'':`<details ontoggle="if(this.open){HG.bmSeen();this.querySelector('.hg-slot').innerHTML=HG.bmAns('${ea(x.id)}')}"><summary>정답·해설 보기</summary><div class="hg-slot"></div></details>`}<div style="margin-top:8px"><button class="btn sub" style="padding:8px 14px!important;font-size:13px" onclick="HG.bmMaster('${ea(x.id)}')">✅ 외웠어요</button></div></div>`});
 return h}
/* ---------- views ---------- */
function tile(cls,ic,t,s,fn){return`<div class="hg-tile" role="button" tabindex="0" onclick="${fn}"><div class="sq ${cls}">${ic}</div><b>${t}</b><small>${s}</small></div>`}
function last7(){const out=[];let k=addDays(dkey(),-6);for(let i=0;i<7;i++){out.push(k);k=addDays(k,1)}return out}
function hgHome(){ensureDay();clCheck();const d=day(),g=H.set.goal,p=Math.min(100,Math.round(d.q/g*100)),sk=streak(),due=dueVoca().length,ow=openWrong(),bc=bmCount(),run=H.timer.run,hour=new Date().getHours();
 const hi=hour<6?'늦은 밤까지 고생 많아요 🌙':hour<12?'좋은 아침! ☀':hour<18?'오후도 힘내자! 💪':'오늘 하루도 수고했어 ✨';
 let h=`<div class="card hg-hello hg-in"><div style="flex:1;min-width:0"><div class="hg-tagline">${TAGLINE}</div><h2>${hi}<br>오늘도, 합격에 한 걸음 더!</h2><p>국가직 9급 세법·회계·국어·영어 + 한국사 + 영단어</p></div>${stk('fight','hello')}</div>
 <div class="hg-chips"><div class="hg-chip goal" role="button" onclick="HG.tab('study')">${ring(p,'%','오늘의 학습')}<div style="min-width:0"><small>오늘의 학습</small><b>${d.q} / ${g}문제</b></div><span style="margin-left:auto;color:var(--sub);font-size:20px">›</span></div>
 <div class="hg-chip" role="button" onclick="HG.go('bm')"><div class="sq c3">${IC.bm}</div><div><small>북마크</small><b>${bc}개</b></div></div>
 <div class="hg-chip timer ${run?'run':''}" id="hgTChip" role="button" onclick="${run?'HG.tStop()':'HG.tStart()'}"><div class="sq c2">${IC.timer}</div><div><small>${run?'타이머 정지':'집중 타이머'}</small><b>${run?fmt(run.dur?run.dur-runningSec():runningSec()):pad(H.set.pomo)+':00'}</b></div></div></div>
 <div class="hg-cta"><button class="btn" onclick="HG.tab('study')">기출 풀기 →</button><button class="btn sub" onclick="HG.tab('note')">＋ 오답 복습하기</button></div>
 <div class="hg-banner streak hg-in"><div class="txt"><h3><span class="num">${sk}</span>일 연속 학습! ${sk?'🔥':'🌱'}</h3><p>${sk>=7?'와 정말 멋져요! 지금처럼만 꾸준히 해요.':sk?'좋아요! 오늘도 이어 가 볼까요?':'오늘 한 문제만 풀어도 스트릭 시작!'}</p></div>
 <div class="hg-days">${last7().map(k=>`<div><i class="${studied(k)?'on':''} ${k==dkey()?'today':''}">${studied(k)?'✓':''}</i>${k==dkey()?'오늘':WD[wdOf(k)]}</div>`).join('')}</div>${studied(dkey())?stk('great','bn'):stk('fight','bn')}</div>
 <div class="hg-sec"><h3>학습 메뉴</h3><small>필요한 것만 쏙쏙</small></div>
 <div class="hg-tiles">${tile('c1',IC.doc,'기출 풀기','실전처럼 탄탄하게',"HG.tab('study')")}${tile('c2',IC.redo,'오답 복습','틀린 문제를 내 것으로',"HG.tab('note')")}${tile('c3',IC.vari,'변형 문제','다양한 유형으로',"go('var')")}${tile('c4',IC.chart,'분석 보기','내 약점을 정확하게',"HG.tab('my')")}
 ${tile('c5',IC.abc,'영단어','DAY별 · 듣기',"HG.goVoca()")}${tile('c3',IC.read,'독해','지문 분석 · 변형',"HG.goDk()")}${tile('c1',IC.ox,'O/X','빠르게 감 잡기',"go('ox')")}${tile('c6',IC.bm,'북마크',bc+'개 모아 보기',"HG.go('bm')")}</div>
 <div class="hg-sec"><h3>오늘 할 일</h3><small>${new Date().toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'short'})}</small></div>${clHTML()}
 <div class="hg-banner review"><div class="txt"><h3 style="color:var(--brand)">오늘의 복습 📖</h3><p style="color:var(--muted)">${due||ow||bc?`영단어 ${due}개 · 오답 ${ow}개 · 북마크 ${bc}개가 기다려요.`:'오늘도 읽는 마음이 내일의 합격을 만들어요.'}</p><button class="btn" onclick="HG.review()">지금 복습하기 →</button></div>${stk('retry','bn')}</div>`;
 return h}
function hgMy(){const sk=streak();let best=0,cur=0;Object.keys(H.days).sort().forEach((k,i,a)=>{if(studied(k)){cur=(i&&a[i-1]==addDays(k,-1)&&studied(a[i-1]))?cur+1:1;best=Math.max(best,cur)}});
 const L7=last7(),mx=Math.max(1,...L7.map(k=>(H.days[k]||{}).q||0));const tot=Object.values(H.days).reduce((a,d)=>({q:a.q+d.q,sec:a.sec+d.sec}),{q:0,sec:0});
 let subj='';try{subj=SUBS.map(x=>{const s=stats(keysSub(x));return`<div class="hg-row"><span>${SUBJ[x]}</span><span style="flex:1;margin:0 10px"><span class="bar" style="display:block"><i style="width:${s.rate||0}%"></i></span></span><b>${s.rate||0}%</b><small style="color:var(--muted);width:70px;text-align:right">${s.t}회 풀이</small></div>`}).join('');const v=vStat(VL.map(VK));subj+=`<div class="hg-row"><span>영단어</span><span style="flex:1;margin:0 10px"><span class="bar" style="display:block"><i style="width:${v.rate||0}%"></i></span></span><b>${v.rate||0}%</b><small style="color:var(--muted);width:70px;text-align:right">${v.q}회 퀴즈</small></div>`}catch(e){}
 const hk=Object.keys(H.hist).sort().reverse().slice(0,30);
 return`<div class="card hg-hello hg-in"><div style="flex:1"><div class="hg-tagline">마이</div><h2>나의 합격 기록 📈</h2><p>🔥 연속 ${sk}일 · 최고 ${best}일 · 누적 ${tot.q}문제 · 공부 ${fmtM(tot.sec)}</p></div><img src="gentle.png" alt="준혁" style="width:80px;border-radius:50%;margin:0"></div>
 <div class="card" id="analysis"><h3 style="margin:0">최근 7일 학습량</h3><div class="hg-week">${L7.map(k=>{const q=(H.days[k]||{}).q||0;return`<div><small>${q}</small><i style="height:${q/mx*80}px"></i>${k==dkey()?'오늘':WD[wdOf(k)]}</div>`}).join('')}</div></div>
 <div class="card"><h3 style="margin:0 0 6px">과목별 정답률</h3>${subj}<div style="margin-top:8px"><button class="btn sub" onclick="HG.goDk('note')">📖 독해 약점 대시보드</button></div></div>
 <div class="card"><h3 style="margin:0 0 6px">체크리스트 기록</h3>${hk.length?hk.map(k=>{const x=H.hist[k],p=x.total?Math.round(x.done/x.total*100):0;return`<details class="hg-hist"><summary><span>${k.slice(5).replace('-','/')} (${WD[wdOf(k)]})</span><span>${x.done}/${x.total} · ${p}% ${p==100?'🏅':''}</span></summary>${x.items.map(i=>`<div style="padding:3px 0;color:${i.d?'var(--ok)':'var(--muted)'}">${i.d?'✓':'○'} ${ea(i.t)}${i.s?` · ⏱${fmtM(i.s)}`:''}</div>`).join('')}</details>`}).join(''):'<small style="color:var(--muted)">자정이 지나면 오늘 체크리스트가 여기에 기록돼요.</small>'}</div>
 <div class="card"><h3 style="margin:0 0 6px">반복 할 일</h3>${H.tpl.length?H.tpl.map(t=>`<div class="hg-row"><span>${ea(t.text)} <span class="pill">${t.rep=='daily'?'매일':'평일'}</span></span><button class="hg-ib r" onclick="HG.tplDel('${t.id}')">삭제</button></div>`).join(''):'<small style="color:var(--muted)">홈 체크리스트에서 ‘매일/평일 반복’으로 추가해요.</small>'}</div>
 <div class="card"><h3 style="margin:0 0 6px">설정</h3>
 <div class="hg-row"><span>하루 목표 문제 수</span><input type="number" min="1" max="500" value="${H.set.goal}" onchange="HG.setS('goal',+this.value)"></div>
 <div class="hg-row"><span>타이머 목표(분, 자동 체크리스트)</span><input type="number" min="10" max="900" step="10" value="${H.set.timerGoal}" onchange="HG.setS('timerGoal',+this.value)"></div>
 <div class="hg-row"><span>집중 타이머 길이(분)</span><input type="number" min="5" max="180" value="${H.set.pomo}" onchange="HG.setS('pomo',+this.value)"></div>
 <div class="hg-row"><span>추천 할 일 자동 추가</span><input type="checkbox" ${H.set.auto?'checked':''} onchange="HG.setS('auto',this.checked)"></div>
 <div class="hg-row"><span>못 끝낸 할 일 다음 날로 이월</span><input type="checkbox" ${H.set.carry?'checked':''} onchange="HG.setS('carry',this.checked)"></div>
 <div class="hg-row"><span>🔖 북마크</span><button class="btn sub" style="padding:7px 14px!important" onclick="HG.go('bm')">${bmCount()}개 보기</button></div>
 <div class="hg-row"><span>데이터 백업</span><span><button class="hg-ib" onclick="HG.exportData()">내보내기</button> <label class="hg-ib" style="display:inline-grid;place-items:center">가져오기<input type="file" accept="application/json" style="display:none" onchange="HG.importData(this)"></label></span></div>
 ${G.pwaInstall?'<div class="hg-row"><span>앱으로 설치</span><button class="hg-ib" onclick="pwaInstall()">설치</button></div>':''}
 ${G.__isApp?'':'<div class="hg-row"><span>📱 안드로이드 앱(APK)</span><a href="https://github.com/lee860506-tech/gongmuwon-tapa/releases/latest/download/hapgyeokon-android.apk" rel="noopener" style="color:var(--brand);font-weight:700">APK 다운로드 ›</a></div>'}
 <div class="hg-row"><span>개인정보처리방침</span><a href="privacy.html" style="color:var(--brand);font-weight:700">보기 ›</a></div>
 <div class="hg-row"><span>버전</span><small style="color:var(--muted)">합격온 2.1.0 · 모든 기록은 이 기기에만 저장돼요</small></div></div>`}
function noteTop(){return`<div class="card hg-in" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><div style="flex:1 1 100%;display:flex;align-items:center;gap:10px">${stk('retry','nt')}<b>오답노트 바로가기<br><small style="font-weight:600;color:var(--muted)">틀린 문제는 다시 풀면 내 것이 돼요</small></b></div><button class="btn sub" onclick="HG.goDk('note')">📖 독해 오답노트 · 사진/스크린샷</button><button class="btn sub" onclick="PM.open()">📸 사진 메모</button><button class="btn sub" onclick="HG.go('bm')">🔖 북마크 ${bmCount()}</button><button class="btn sub" onclick="HG.goVoca()">📚 영단어</button></div>`}
/* ---------- shell ---------- */
const TABS=[['hg','홈','home'],['study','학습','study'],['note','오답노트','note'],['my','마이','my']];
function tabOf(){if(view=='hg')return'hg';if(view=='my')return'my';if(view=='note')return'note';if(view=='dk'&&document.querySelector('#app .dk-item, #app .dk-bars'))return'note';if(view=='bm')return'study';return'study'}
function shell(){document.body.classList.toggle('hg-main',view=='hg'||view=='my');
 let t=document.getElementById('hgTabs');if(!t){t=document.createElement('div');t.id='hgTabs';t.className='hg-tabs';t.setAttribute('role','navigation');t.setAttribute('aria-label','하단 메뉴');document.body.appendChild(t)}
 const on=tabOf(),ow=openWrong();t.innerHTML=TABS.map(([k,l,i])=>`<button class="${on==k?'on':''}" onclick="HG.tab('${k}')" aria-label="${l}"><span class="ic">${IC[i]}</span>${l}${k=='note'&&ow?`<span class="bd">${ow>99?'99+':ow}</span>`:''}</button>`).join('');
 const hc=document.getElementById('hgHC');if(hc)hc.innerHTML=`<button class="hg-hchip" onclick="HG.tab('my')">🔥 ${streak()}일</button><button class="hg-hchip" onclick="HG.go('bm')">🔖 ${bmCount()}</button>`;
 const nav=document.getElementById('nav');if(nav&&!nav.querySelector('#hgBmNav')){const b=document.createElement('button');b.id='hgBmNav';b.textContent='🔖 북마크';b.onclick=()=>HG.go('bm');nav.appendChild(b);const f=nav.querySelector('button');if(f&&f.textContent.trim()=='홈')f.textContent='📚 과목'}
 const bn=document.getElementById('hgBmNav');if(bn)bn.className=view=='bm'?'on':''}
function headerInit(){const hd=document.querySelector('header');const lg=hd&&hd.querySelector('.logo');if(lg){lg.innerHTML=`<img src="${LOGO}" alt=""><span class="hg-word">합격온</span>`;lg.onclick=()=>HG.tab('hg');lg.setAttribute('role','button');lg.setAttribute('aria-label','합격온 홈')}
 if(hd&&!document.getElementById('hgHC')){const c=document.createElement('div');c.id='hgHC';c.className='hg-hchips';hd.insertBefore(c,document.getElementById('nav'))}}
function stkPop(k){if(document.getElementById('hgStkPop'))return;const d=document.createElement('div');d.id='hgStkPop';d.setAttribute('aria-hidden','true');d.innerHTML=stk(k);d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>d.classList.add('out'),RM.matches?1200:1700);setTimeout(()=>d.remove(),RM.matches?1300:2100)}
const OKS=new Set(M.ok),NOS=new Set(M.no);
function swapReact(root){(root.querySelectorAll?root.querySelectorAll('.mascot img:not(.hg-stk),.dk-react img:not(.hg-stk)'):[]).forEach(im=>{const f=(im.getAttribute('src')||'').split('/').pop();const k=OKS.has(f)?'great':NOS.has(f)?'retry':null;if(!k)return;
 im.classList.add('hg-stk','re');im.dataset.k=k;im.alt='준혁: '+STK[k];im.onerror=function(){if(!this.dataset.f){this.dataset.f=1;this.src='hg/stk/'+k+'.png'}};im.src='hg/stk/'+k+'.webp'})}
new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType==1){if(n.matches&&n.matches('.mascot img,.dk-react img'))swapReact(n.parentNode);else swapReact(n)}}).observe(document.body,{childList:true,subtree:true});
const _render=G.render;
G.render=function(){if(view=='hg'||view=='my'||view=='bm'){navR();document.getElementById('app').innerHTML=view=='hg'?hgHome():view=='my'?hgMy():bmView();if(G.pwaBtnRefresh)G.pwaBtnRefresh()}else{_render.apply(this,arguments);if(view=='note'){const a=document.getElementById('app');a.insertAdjacentHTML('afterbegin',noteTop())}}
 shell();injectBm();animRing();if(view=='bm')bindSwipe();if(H.timer.run)tTick()};
const rr=()=>G.render();
function bindSwipe(){const el=document.getElementById('hgFlash');if(!el)return;let x0=null;el.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});el.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50){el._sw=true;HG.bmNext(dx<0?1:-1)}})}
G.hgBack=function(){if(view=='hg')return false;HG.tab('hg');return true};
G.HG={
 tab(k){if(k=='hg'||k=='my'){view=k}else if(k=='study'){view='home'}else if(k=='note'){view='note'}rr();scrollTo(0,0)},
 go(k){view=k;if(k=='bm'){bmI=0;bmFlip=false;dkReady(rr)}rr();scrollTo(0,0)},
 goVoca(){view='voca';rr();scrollTo(0,0)},goDk(sub){if(G.DK&&G.DK.open)G.DK.open(sub||'home');scrollTo(0,0)},
 review(){if(dueVoca().length&&has('vReview')){view='voca';rr();vReview()}else if(openWrong()){HG.tab('note')}else if(bmCount())HG.go('bm');else HG.tab('study')},
 clToggle(id){const x=H.cl.items.find(i=>i.id==id);if(!x)return;x.done=!x.done;x.autoDone=false;hSave();celebrate();rr()},
 clAdd(){const i=document.getElementById('hgNew'),r=document.getElementById('hgRep').value,t=i.value.trim();if(!t){i.focus();return}ensureDay();let tid=null;if(r){tid=uid();H.tpl.push({id:tid,text:t,rep:r})}H.cl.items.push({id:uid(),text:t,done:false,kind:r?'tpl':'user',tpl:tid,sec:0});hSave();celebrate();rr();setTimeout(()=>{const n=document.getElementById('hgNew');n&&n.focus()},30)},
 clDel(id){H.cl.items=H.cl.items.filter(x=>x.id!=id);hSave();celebrate();rr()},
 clText(id,v){const x=H.cl.items.find(i=>i.id==id);if(x&&v.trim()){x.text=v.trim();if(x.tpl){const t=H.tpl.find(t=>t.id==x.tpl);if(t)t.text=x.text}hSave()}},
 clMove(id,d){const a=H.cl.items,i=a.findIndex(x=>x.id==id),j=i+d;if(i<0||j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];hSave();rr()},
 clEditT(){clEdit=!clEdit;rr()},
 clSuggest(){ensureDay();const have=new Set(H.cl.items.filter(x=>x.auto).map(x=>x.auto.type));const add=autoItems().filter(x=>!have.has(x.auto.type));if(!add.length){toast('추천할 항목이 이미 다 있어요 😊');return}H.cl.items.push(...add);hSave();clCheck();toast(`✨ ${add.length}개 추가했어요`);rr()},
 tplDel(id){H.tpl=H.tpl.filter(t=>t.id!=id);hSave();rr()},
 tStart(item){tStart(item)},tStop(){tStop()},
 setS(k,v){if(typeof v=='number'&&(!v||v<0))return;H.set[k]=v;hSave();toast('저장했어요');if(view=='hg')rr()},
 bmToggle(id,el){if(H.bm[id]){delete H.bm[id];toast('북마크 해제')}else{H.bm[id]={t:Date.now(),f:bmF.folder!='all'?bmF.folder:'기본'};toast('🔖 북마크! 나중에 모아서 보자')}hSave();if(el){el.classList.toggle('on',!!H.bm[id]);el.setAttribute('aria-pressed',!!H.bm[id]);if(!RM.matches){el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop')}}shell();if(view=='bm')rr()},
 bmMaster(id){delete H.bm[id];hSave();confetti(18);toast('✅ 외운 문제는 북마크에서 뺐어요!');bmFlip=false;rr()},
 bmSetF(k,v){bmF[k]=v;bmI=0;bmFlip=false;rr()},bmMode(m){bmMode=m;bmFlip=false;rr()},bmShowAll(v){bmShow=v;if(v)act('bmv');rr()},
 bmFlip(){const el=document.getElementById('hgFlash');if(el&&el._sw){el._sw=false;return}bmFlip=!bmFlip;if(bmFlip)act('bmv');rr()},
 bmNext(d){bmI+=d;bmFlip=false;rr()},bmSeen(){act('bmv')},
 bmAns(id){const x={id,m:bmMeta(id)};const full=bmBody(x,true),base=bmBody(x,false);return full.slice(base.length)},
 bmFolder(id,f){if(H.bm[id]){H.bm[id].f=f;hSave()}},
 bmFolderNew(){const n=(prompt('새 폴더 이름 (예: 세법-가산세, 헷갈림)')||'').trim();if(!n)return;if(!H.folders.includes(n))H.folders.push(n);bmF.folder=n;hSave();rr()},
 bmStudy(m){const ids=bmList().map(x=>x.id);const mc=ids.filter(i=>i.startsWith('mc|')).map(i=>i.slice(3)),ox=ids.filter(i=>i.startsWith('ox|')).map(i=>i.slice(3)),vc=ids.filter(i=>i.startsWith('vc|')).map(i=>i.slice(3)),dk=ids.filter(i=>i.startsWith('dk|')).map(i=>i.slice(3));
  if(m=='orig'||m=='var'){if(!mc.length)return toast('객관식 북마크가 없어요');start(m,shuffle(mc),`🔖 북마크 ${m=='orig'?'원본':'변형'} 풀기`,'mix')}
  else if(m=='ox'){const set=new Set(mc);const L=shuffle([...new Set(ox.concat(OXL.filter(o=>set.has(srcKey(o))).map(o=>o.id)))]);if(!L.length)return toast('O/X로 풀 북마크가 없어요');startOX(L,'🔖 북마크 O/X','mix')}
  else if(m=='voca'){if(!vc.length)return toast('단어 북마크가 없어요');vBegin('mix',shuffle(vc),'🔖 북마크 단어 퀴즈')}
  else if(m=='dk'){if(!dk.length)return toast('독해 북마크가 없어요');G.DK.startIds(shuffle(dk),'orig','🔖 북마크 독해')}},
 exportData(){const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^(gtapa|hapgyeokon)/.test(k))o[k]=localStorage.getItem(k)}const b=new Blob([JSON.stringify({app:'합격온',v:1,t:Date.now(),data:o})],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='hapgyeokon-backup-'+dkey()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)},
 importData(inp){const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);if(!j.data)throw 0;if(!confirm('지금 기기의 기록을 백업 파일로 바꿀까요?'))return;Object.entries(j.data).forEach(([k,v])=>localStorage.setItem(k,v));alert('가져왔어요! 다시 시작할게요');location.reload()}catch(e){alert('합격온 백업 파일이 아니에요 🥲')}};r.readAsText(f)},
 data:()=>H,act,streak,dkey
};
/* ---------- boot ---------- */
function splash(){if(sessionStorage.getItem('hgSplash'))return;sessionStorage.setItem('hgSplash',1);
 const s=document.createElement('div');s.id='hgWelcome';s.setAttribute('role','dialog');s.setAttribute('aria-modal','true');s.setAttribute('aria-labelledby','hgWT');
 s.innerHTML=`<i class="sp s1" aria-hidden="true"></i><i class="sp s2" aria-hidden="true"></i><i class="sp s3" aria-hidden="true"></i><i class="sp s4" aria-hidden="true"></i>
 <div class="w-logo"><img src="${LOGO}" alt="" width="44" height="44"><span class="hg-word">합격온</span></div>
 <div class="w-text"><h1 id="hgWT">오늘도, 시작해볼까? <span class="hrt" aria-hidden="true">♥</span></h1><p>작은 읽기가 쌓여, 큰 실력이 돼요.</p></div>
 <div class="w-char"><div class="w-fl">${stk('fight','wel')}</div></div>
 <div class="w-cta"><button type="button" class="w-btn" id="hgStart">시작하기 <span class="ar" aria-hidden="true">→</span></button><small>9급 공무원 국어·영어 독해 학습</small></div>`;
 document.documentElement.classList.add('hg-wlock');document.body.appendChild(s);
 let done=false;const go=()=>{if(done)return;done=true;document.documentElement.classList.remove('hg-wlock');scrollTo(0,0);
  if(RM.matches){s.remove();return}s.classList.add('out');setTimeout(()=>s.remove(),420)};
 s.querySelector('#hgStart').addEventListener('click',go);
 s.addEventListener('keydown',e=>{if(e.key=='Escape')go()});
 setTimeout(()=>{try{s.querySelector('#hgStart').focus({preventScroll:true})}catch(e){}},50);
 G.hgWelcomeClose=go}
document.title='합격온 · 9급 공무원 기출·오답노트·영단어·독해';
headerInit();hookAll();ensureDay();
if(!/#(dokhae)/.test(location.hash))view='hg';
setInterval(()=>{if(ensureDay()&&view=='hg')rr()},60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){if(ensureDay()||view=='hg')rr()}});
splash();rr();
})();
