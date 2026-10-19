/* 합격온 — 📖 독해 분석오답노트 (국가직 9급 국어·영어) */
(function(){
const DKK='gtapa_dokhae_v1';
let D=JSON.parse(localStorage.getItem(DKK)||'null')||{};
['res','wrong','photo'].forEach(k=>{if(!D[k])D[k]=k=='photo'?[]:{}});D.f=D.f||{sub:'all',year:'all',type:'all'};if(!D.f.src)D.f.src='all';D.best=D.best||0;
const dSave=(silent)=>{try{localStorage.setItem(DKK,JSON.stringify(D));return true}catch(e){if(!silent)alert('저장 공간이 가득 찼어요 😢 스크린샷이나 사진이 있는 항목을 몇 개 지워 주세요.');return false}};
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const NN='①②③④⑤⑥';let SETS=[];const SETN=id=>{const x=SETS.find(t=>t.id==id);return x?x.name:id};const SUBN={ko:'국어',en:'영어'},REASONS=['근거 못찾음','선지 함정','시간 부족','어휘','해석'];
const I={ /* 준혁이랑 독해 아이콘 세트 (stroke=currentColor) */
 logo:'<img src="dokhae/logo.svg" alt="" class="dk-logo">',
 search:'<svg viewBox="0 0 24 24" class="dki"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/><path d="M8 9.5q2.5-2.5 5 0"/></svg>',
 target:'<svg viewBox="0 0 24 24" class="dki"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
 abc:'<svg viewBox="0 0 24 24" class="dki"><rect x="3" y="5" width="18" height="14" rx="4"/><path d="M7 15l2-6 2 6M7.7 13h2.6M14 9v6h2.2a1.6 1.6 0 000-3.2H14h1.8a1.4 1.4 0 000-2.8z"/></svg>',
 shuffle:'<svg viewBox="0 0 24 24" class="dki"><path d="M3 7h4c5 0 5 10 10 10h4M3 17h4c2 0 3-1.5 4-3.5M13 10.5c1-2 2-3.5 4-3.5h4M18 4l3 3-3 3M18 14l3 3-3 3"/></svg>',
 note:'<svg viewBox="0 0 24 24" class="dki"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h5"/></svg>',
 camera:'<svg viewBox="0 0 24 24" class="dki"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.6"/></svg>',
 copy:'<svg viewBox="0 0 24 24" class="dki"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3"/></svg>',
 chart:'<svg viewBox="0 0 24 24" class="dki"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/></svg>',
 book:'<svg viewBox="0 0 24 24" class="dki"><path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5zM12 6v14"/></svg>',
 retry:'<svg viewBox="0 0 24 24" class="dki"><path d="M20 12a8 8 0 11-2.3-5.6M20 4v4.5h-4.5"/></svg>',
 spark:'<svg viewBox="0 0 24 24" class="dki"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></svg>'
};
const CSS=`.dki{width:18px;height:18px;vertical-align:-3px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;margin-right:4px}
.dk-logo{width:84px;height:84px;flex:none;filter:drop-shadow(0 6px 10px rgba(139,111,214,.25))}
.dk-hero{display:flex;gap:14px;align-items:center;background:linear-gradient(135deg,#f6f0ff,#fff0f6)}.dk-hero h1{margin:0;color:var(--p);font-size:28px;text-shadow:2px 2px 0 #fff,3px 3px 0 var(--pk)}
.dk-psg{white-space:pre-wrap;line-height:1.75;font-size:15.5px;background:#fffdf9;border:2px solid #f1e9ff;border-radius:18px;padding:14px 16px;font-family:"Apple SD Gothic Neo","Malgun Gothic",sans-serif;max-height:60vh;overflow:auto}
.dk-psg.en{font-family:Georgia,"Times New Roman",serif;font-size:16px}
.dk-given{border:2px dashed var(--p2);background:#f7f2ff;border-radius:14px;padding:10px 14px;margin:8px 0;white-space:pre-wrap;line-height:1.6}
.dk-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0 6px}.dk-tabs button{border:2px solid #eee6ff;background:#fff;border-radius:999px;padding:7px 12px;font:inherit;font-size:14px;color:var(--ink);cursor:pointer}.dk-tabs button.on{background:var(--p);border-color:var(--p);color:#fff}
.dk-box{background:#fbf9ff;border-left:5px solid var(--p2);border-radius:12px;padding:12px 14px;line-height:1.7;font-family:"Apple SD Gothic Neo","Malgun Gothic",sans-serif;font-size:14.5px}.dk-box b{color:var(--p)}.dk-box p{margin:0 0 8px}
.dk-chip{display:inline-block;border:2px solid #f3c6d6;background:#fff;border-radius:999px;padding:6px 12px;margin:4px 4px 0 0;font:inherit;font-size:14px;cursor:pointer;color:#9b4d72}.dk-chip.on{background:#ffe1ec;border-color:#e98fb2}
.dk-ring{width:110px;height:110px;flex:none}.dk-ring circle{fill:none;stroke-width:11}.dk-ring .bg{stroke:#eee6ff}.dk-ring .fg{stroke:url(#dkrg);stroke-linecap:round;transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset 1.1s cubic-bezier(.3,1.4,.5,1)}.dk-ring text{font-size:22px;fill:var(--p);font-weight:bold}
.dk-row{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.dk-bars div{margin:6px 0;font-size:14px}.dk-bars .bar{height:10px}
.dk-react{display:flex;align-items:center;gap:10px;margin:10px 0}.dk-react img{width:78px;height:78px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid var(--pl);background:#f3f0f6}
.dk-filter{display:flex;gap:8px;flex-wrap:wrap;align-items:center;font-size:14px}
.dk-ta{width:100%;min-height:90px;border:2px solid #e6dcff;border-radius:14px;padding:10px;font:inherit;font-family:"Apple SD Gothic Neo","Malgun Gothic",sans-serif;font-size:14.5px;line-height:1.6}
.dk-slide{animation:dkSlide .38s ease-out}.dk-hop{animation:dkHop .7s ease}.dk-shake{animation:dkShake .5s ease}.dk-flip{animation:dkFlip .45s ease-out}.dk-pop{animation:dkPop .4s ease-out}
@keyframes dkSlide{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:none}}
@keyframes dkHop{0%,100%{transform:translateY(0)}30%{transform:translateY(-16px) rotate(-6deg)}55%{transform:translateY(0)}75%{transform:translateY(-6px) rotate(4deg)}}
@keyframes dkShake{0%,100%{transform:none}20%{transform:translateX(-8px) rotate(-4deg)}40%{transform:translateX(7px) rotate(3deg)}60%{transform:translateX(-5px)}80%{transform:translateX(3px)}}
@keyframes dkFlip{from{opacity:0;transform:perspective(600px) rotateX(-70deg)}to{opacity:1;transform:none}}
@keyframes dkPop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
.dk-conf{position:fixed;top:-12px;width:10px;height:14px;border-radius:3px;z-index:99;pointer-events:none;animation:dkFall 1.6s ease-in forwards}
@keyframes dkFall{to{transform:translateY(105vh) rotate(720deg);opacity:.2}}
.dk-streak{display:inline-block;background:linear-gradient(90deg,#ffd36e,#ff9fc2);color:#7a3b52;border-radius:999px;padding:3px 10px;font-size:13px}
.dk-item{border:2px dashed #f3c6d6}
.dk-att{background:#fff8fc;border:2px solid #f7dcea;border-radius:16px;padding:10px;margin-top:8px}.dk-att .dk-row{gap:6px;flex-wrap:wrap}.btn.mini{padding:6px 11px;font-size:13px;margin:2px}.dk-paste{min-height:70px;background:#fff}
.dk-pz{margin:6px 0;border:2px dashed #ffb3cf;border-radius:12px;padding:9px;font-size:13px;color:#c77a9a;background:#fff;text-align:center;outline:none;min-height:20px;caret-color:transparent}.dk-pz:focus{background:#fff0f6;border-color:#f78fb3}
.dk-gal{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}.dk-shot{position:relative;width:96px}.dk-shot img{width:96px;height:96px;object-fit:cover;border-radius:12px;border:2px solid #eee6ff;cursor:zoom-in;display:block}.dk-shot .x{position:absolute;top:-6px;right:-6px;width:24px;height:24px;border-radius:50%;border:0;background:#f07a8a;color:#fff;font-weight:bold;cursor:pointer}.dk-shot .o{width:100%;margin-top:3px;border:0;border-radius:9px;background:#efe8ff;color:var(--p);font-size:12px;padding:3px;cursor:pointer}
.dk-amsg{font-size:13px;color:#8a7fa6;min-height:16px;margin-top:4px}#dkZoom{position:fixed;inset:0;z-index:100;background:rgba(40,25,60,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:zoom-out;animation:dkSlide .2s ease-out}#dkZoom img{max-width:94vw;max-height:84vh;border-radius:14px;background:#fff}#dkZoom span{color:#fff;font-size:13px}
.dk-quota{font-size:12.5px;color:#8a7fa6;margin-top:6px}.dk-quota .bar{height:7px;background:#eee6ff;border-radius:6px;overflow:hidden;margin-top:3px}.dk-quota .bar i{display:block;height:100%;background:linear-gradient(90deg,#b9a6f0,#8b6fd6)}.dk-quota.warn{color:#d05a6e;font-weight:bold}.dk-quota.warn .bar i{background:linear-gradient(90deg,#ffb3c9,#f07a8a)}.dk-item.done{opacity:.55}
.dk-ocrbar{height:10px;background:#eee6ff;border-radius:9px;overflow:hidden;margin:8px 0}.dk-ocrbar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--p2),var(--p));transition:width .3s}
.ch.dk-c{font-family:inherit}.dk-en .ch{font-family:Georgia,"Times New Roman",serif}
@media(prefers-reduced-motion:reduce){.dk-slide,.dk-hop,.dk-shake,.dk-flip,.dk-pop{animation:none!important}.dk-ring .fg{transition:none}}
@media(max-width:600px){.dk-hero h1{font-size:23px}.dk-logo{width:64px;height:64px}.dk-psg{font-size:15px;max-height:none}}`;
const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
let DQ=null,DM={},sub='home',run=null,tab='a',noteF={sub:'all',type:'all',year:'all'},ocr={busy:false,p:0,text:'',thumb:'',msg:''};
let streak=0;
function loadData(cb){if(DQ)return cb();const s=document.createElement('script');s.src='data/dokhae.js';s.onload=()=>{const fin=()=>{DQ=(window.DOKHAE||[]).concat(window.DOKHAE_EXTRA||[]);SETS=window.DOKHAE_SETS||[];DQ.forEach(q=>DM[q.id]=q);cb()};const x=document.createElement('script');x.src='data/eng_extra.js';x.onload=fin;x.onerror=fin;document.head.appendChild(x)};s.onerror=()=>{document.getElementById('app').innerHTML='<div class="card">독해 데이터를 불러오지 못했어요. 인터넷 연결을 확인해 줘!</div>'};document.head.appendChild(s)}
const TYPES=()=>[...new Set(DQ.map(q=>q.type))].sort();
const YEARS=()=>[...new Set(DQ.map(q=>q.year))].sort();
const srcOk=(f,q)=>!f.src||f.src=='all'||(f.src=='gichul'?!q.src:q.src==f.src);
const filt=f=>DQ.filter(q=>srcOk(f,q)&&(f.sub=='all'||q.sub==f.sub)&&(f.year=='all'||q.year==f.year)&&(f.type=='all'||q.type==f.type));
const rk=(m,id)=>m+'|'+id;
function stat(list){let t=0,c=0;list.forEach(q=>['orig','var'].forEach(m=>{const r=D.res[rk(m,q.id)];if(r!==undefined){t++;if(r)c++}}));return{t,c,rate:t?Math.round(c/t*100):0,w:list.filter(q=>D.wrong[q.id]&&!D.wrong[q.id].done).length}}
function ring(rate,label){return`<svg class="dk-ring" viewBox="0 0 120 120" aria-label="${label} ${rate}%"><defs><linearGradient id="dkrg"><stop offset="0" stop-color="#ffa6c9"/><stop offset="1" stop-color="#8b6fd6"/></linearGradient></defs><circle class="bg" cx="60" cy="60" r="48"/><circle class="fg" cx="60" cy="60" r="48" stroke-dasharray="301.6" stroke-dashoffset="301.6" data-to="${301.6*(1-rate/100)}"/><text x="60" y="66" text-anchor="middle">${rate}%</text></svg>`}
function animRings(){requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelectorAll('.dk-ring .fg').forEach(c=>c.style.strokeDashoffset=c.dataset.to)))}
function confetti(n){if(RM.matches)return;const cs=['#8b6fd6','#ffa6c9','#ffd36e','#9be3c4','#b9a4f0'];for(let i=0;i<(n||40);i++){const e=document.createElement('i');e.className='dk-conf';e.style.left=Math.random()*100+'vw';e.style.background=cs[i%cs.length];e.style.animationDelay=Math.random()*.5+'s';e.style.animationDuration=1.2+Math.random()*.9+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),2600)}}
const sel=(id,cur,opts,on)=>`<select id="${id}" onchange="${on}">${opts.map(([v,l])=>`<option value="${v}" ${String(cur)==String(v)?'selected':''}>${l}</option>`).join('')}</select>`;
function filters(f,fn){return`<div class="dk-filter">${SETS.length?'출처 '+sel(fn+'R',f.src||'all',[['all','전체'],['gichul','국가직 기출']].concat(SETS.map(t=>[t.id,'📚 '+t.name])),`DK.setF('${fn}','src',this.value)`)+' ':''}과목 ${sel(fn+'S',f.sub,[['all','국어+영어'],['ko','국어'],['en','영어']],`DK.setF('${fn}','sub',this.value)`)} 연도 ${sel(fn+'Y',f.year,[['all','전체']].concat(YEARS().map(y=>[y,y])),`DK.setF('${fn}','year',this.value)`)} 유형 ${sel(fn+'T',f.type,[['all','전체']].concat(TYPES().map(t=>[t,t])),`DK.setF('${fn}','type',this.value)`)}</div>`}
function home(){const f=D.f,L=filt(f),s=stat(L),A=stat(DQ),ko=DQ.filter(q=>q.sub=='ko').length,en=DQ.length-ko,wr=Object.keys(D.wrong).filter(k=>DM[k]&&!D.wrong[k].done).length;
return`<div class="card dk-hero dk-slide">${I.logo}<div><span class="tag">지문 분석 오답노트 ♡</span><h1>합격온 독해</h1><div style="font-size:14px">국가직 9급 국어 ${ko} · 영어 ${en} 독해 문항 · 원본+변형+분석</div></div></div>
<div class="card dk-slide"><div class="dk-row">${ring(A.rate,'전체 정답률')}<div style="flex:1;min-width:180px">${mascot(A.t?M.ok:M.wave,A.t?`지금까지 ${A.t}번 풀었어! 정답률 ${A.rate}% · 최고 연속 ${D.best}개 🔥`:'지문 하나씩 같이 뜯어보자! 근거 문장 찾기가 핵심이야 🔍')}</div></div>
<h3 style="margin:10px 0 6px">${I.spark}골라서 풀기</h3>${filters(f,'h')}<div style="margin:8px 0 2px;font-size:14px;color:#8a7fa6">선택한 범위: ${L.length}문항 · 풀이 ${s.t} · 정답률 ${s.rate}% · 복습할 오답 ${s.w}</div>
<div><button class="btn" onclick="DK.start('orig')">${I.book}원본 기출 풀기</button><button class="btn sub" onclick="DK.start('var')">${I.shuffle}변형문제 풀기</button><button class="btn sub" onclick="DK.start('rand')">🎲 랜덤 10</button></div></div>
${SETS.length?`<div class="card dk-slide dk-sets"><b style="color:var(--p)">📚 학원 자료 세트</b> <small style="color:#8a7fa6">세트별로 풀고 해설·출제 포인트 확인</small><div class="years" style="margin-top:8px">${SETS.map(t=>{const l=DQ.filter(q=>q.src==t.id),x=stat(l);return`<div class="yc dk-set" onclick="DK.startSet('${t.id}')"><b>${esc(t.name)}</b><small><span>${l.length}문항 · ${esc(t.desc)}</span><span>정답률 ${x.rate}% · 오답 ${x.w}</span></small></div>`}).join('')}</div></div>`:''}<div class="card dk-slide"><div class="dk-row" style="justify-content:space-between"><b style="color:var(--p)">${I.note}분석오답노트</b><span class="pill">복습할 오답 ${wr}개 · 내 지문 ${D.photo.length}개</span></div>
<div style="margin-top:8px"><button class="btn" onclick="DK.go('note')">${I.chart}약점 대시보드 · 오답노트</button><button class="btn sub" onclick="DK.go('photo')">${I.camera}사진으로 추가</button></div></div>
<div class="card dk-slide"><b style="color:var(--p)">연도별 바로가기</b><div class="years">${YEARS().slice().reverse().map(y=>{const l=DQ.filter(q=>q.year==y),x=stat(l);return`<div class="yc ${f.year==y?'on':''}" onclick="DK.setF('h','year',${y})"><b>${y}</b><small><span>국어 ${l.filter(q=>q.sub=='ko').length} · 영어 ${l.filter(q=>q.sub=='en').length}</span><span>${x.t}회 풀이 · ${x.rate}%</span></small></div>`}).join('')}</div></div>`}
function start(m,list,title){const f=D.f;let L=list||filt(f);if(m=='rand'){L=shuffle(L).slice(0,10);m='orig'}if(!L.length){alert('조건에 맞는 문항이 없어요!');return}run={list:L.map(q=>q.id),i:0,mode:m,picked:null,title:title||`${f.sub=='all'?'국어+영어':SUBN[f.sub]} ${f.year=='all'?'전체':f.year} ${f.type=='all'?'':f.type+' '}${m=='var'?'변형':'원본'}`,vp:{}};sub='run';tab='a';rr();scrollTo(0,0)}
function cur(){const q=DM[run.list[run.i]];if(run.mode=='var'){const v=q.v[0];return{stem:v.stem,choices:v.ch,answer:v.ans,vt:v.t,exp:v.exp}}return{stem:q.prompt,choices:q.choices,answer:q.answer}}
function quiz(){const q=DM[run.list[run.i]],d=cur(),p=run.picked,ok=p!=null&&p==d.answer,w=D.wrong[q.id];
let h=`<div class="card dk-slide ${q.sub=='en'?'dk-en':''}"><div class="qhead"><b>${esc(run.title)} · ${run.i+1}/${run.list.length}</b><span><span class="stag">${SUBN[q.sub]}</span><span class="ytag">${q.src?esc(SETN(q.src).split(' · ')[0])+' '+q.no+'번':q.year+' '+q.no+'번'}</span><span class="pill">${esc(run.mode=='var'?d.vt:q.type)}</span>${streak>=2?` <span class="dk-streak">🔥 ${streak}연속</span>`:''}</span></div><div class="bar" style="margin:8px 0"><i style="width:${(run.i+1)/run.list.length*100}%"></i></div>
${run.mode=='var'?'<div class="ctx">🔁 같은 지문, 다른 유형으로 다시! (변형 문제는 준혁이가 새로 만든 문제예요)</div>':''}
<div class="stem" style="font-size:16px;font-weight:bold">${esc(d.stem)}</div>${q.given&&run.mode!='var'?`<div class="dk-given"><b>주어진 문장</b>\n${esc(q.given)}</div>`:''}
<div class="dk-psg ${q.sub=='en'?'en':''}">${esc(q.given&&run.mode=='var'?q.given+'\n\n'+q.passage:q.passage)}</div>
${d.choices.map((c,j)=>{let cl='ch dk-c';if(p!=null){if(j+1==d.answer)cl+=' ok';else if(j+1==p)cl+=' no'}return`<button class="${cl}" ${p!=null?'disabled':''} onclick="DK.ans(${j+1})">${NN[j]} ${esc(c)}</button>`}).join('')}`;
if(p!=null){h+=`<div class="dk-react"><img class="${ok?'dk-hop':'dk-shake'}" src="${ok?pick(M.ok):pick(M.no)}" alt="준혁"><span class="bubble dk-pop">${ok?pick(['정답! 근거 문장 딱 찾았네 ✨','역시! 이 유형은 이제 네 거야 💜','완벽해~ 다음 지문도 가보자 🙌']):pick(['괜찮아! 왜 틀렸는지 골라두면 다음엔 안 틀려 💪','아깝다~ 함정 선지였어. 분석 같이 보자 🔍','틀린 이유를 체크해 두자! 그게 실력이 돼 📒'])}</span></div>`;
 if(!ok)h+=`<div class="card" style="background:#fff6f9;box-shadow:none;border:2px dashed #f3c6d6;padding:12px"><b style="color:#b0577e">왜 틀렸을까? (여러 개 선택 가능)</b><div>${REASONS.map(r=>`<button class="dk-chip ${w&&w.reasons.includes(r)?'on':''}" onclick="DK.reason('${q.id}','${r}')">${r}</button>`).join('')}</div><textarea class="dk-ta" style="margin-top:8px;min-height:60px" placeholder="메모: 어디서 헷갈렸는지 한 줄로 적어두기" oninput="DK.memo('${q.id}',this.value)">${esc(w?w.memo:'')}</textarea></div>`;
 h+=run.mode=='var'?`<div class="dk-box dk-flip"><b>정답 ${NN[d.answer-1]}</b><p>${esc(d.exp)}</p></div>${anal(q,true)}`:anal(q)}
h+=`<div style="display:flex;justify-content:space-between;margin-top:12px"><button class="btn sub" ${run.i==0?'disabled':''} onclick="DK.mv(-1)">◀ 이전</button><button class="btn sub" onclick="DK.go('home')">목록</button>${run.i<run.list.length-1?`<button class="btn" onclick="DK.mv(1)">다음 ▶</button>`:`<button class="btn" onclick="DK.go('note')">📒 오답노트</button>`}</div></div>`;return h}
function anal(q,noVar){const a=q.a,p=q.p;const tabs=[['a',I.search+'지문 분석'],['p',I.target+'시험 포인트']].concat(q.sub=='en'?[['w',I.abc+'어휘·해석']]:[]).concat(noVar?[]:[['v',I.shuffle+'변형 문제']]);if(noVar&&tab=='v')tab='a';
let body='';if(tab=='a')body=`<p><b>정답 ${NN[q.answer-1]}</b></p><p><b>핵심 요지</b><br>${esc(a.요지)}</p><p><b>글의 구조</b><br>${esc(a.구조)}</p><p><b>정답 근거 문장</b><br>“${esc(a.근거)}”</p><p><b>오답 함정 해설</b><br>${esc(a.함정)}</p>`;
else if(tab=='p')body=`<p><b>출제자 의도</b><br>${esc(p.의도)}</p><p><b>풀이 전략</b><br>${esc(p.전략)}</p><p><b>시그널 단어</b><br>${esc(p.시그널).split(/,\s*/).map(x=>`<span class="pill" style="display:inline-block;margin:2px">${x}</span>`).join(' ')}</p>`;
else if(tab=='w')body=`<p><b>핵심 어휘·구문</b><br>${esc(q.voc).split(' / ').join('<br>')}</p><p><b>한줄 해석</b><br>${esc(q.tr)}</p>`;
else{body=q.v.map((v,vi)=>{const k=q.id+'#'+vi,pp=run&&run.vp[k];return`<p><b>[변형 · ${esc(v.t)}]</b> ${esc(v.stem)}</p>${v.ch.map((c,j)=>{let cl='ch';if(pp!=null){if(j+1==v.ans)cl+=' ok';else if(j+1==pp)cl+=' no'}return`<button class="${cl}" ${pp!=null?'disabled':''} onclick="DK.vans('${k}',${j+1})">${NN[j]} ${esc(c)}</button>`}).join('')}${pp!=null?`<div class="dk-flip"><b>${pp==v.ans?'⭕ 정답!':'❌ 정답은 '+NN[v.ans-1]}</b><br>${esc(v.exp)}</div>`:''}`}).join('<hr style="border:0;border-top:2px dashed #eee6ff">')}
return`<div class="dk-tabs">${tabs.map(([k,l])=>`<button class="${tab==k?'on':''}" onclick="DK.tab('${k}')">${l}</button>`).join('')}</div><div class="dk-box dk-flip">${body}</div>`}
function ans(n){const q=DM[run.list[run.i]],d=cur(),ok=n==d.answer;run.picked=n;D.res[rk(run.mode,q.id)]=ok;
 if(ok){streak++;if(streak>D.best)D.best=streak;if([3,5,10,15,20].includes(streak))setTimeout(()=>confetti(streak>=10?80:45),150)}else{streak=0;const w=D.wrong[q.id];D.wrong[q.id]={done:false,t:Date.now(),picked:n,mode:w&&w.mode!=run.mode?'both':run.mode,reasons:w?w.reasons:[],memo:w?w.memo:'',n:(w?w.n||1:0)+1}}
 tab='a';dSave();rr()}
function note(){const f=noteF,ids=Object.keys(D.wrong).filter(k=>DM[k]&&srcOk(f,DM[k])&&(f.sub=='all'||DM[k].sub==f.sub)&&(f.year=='all'||DM[k].year==f.year)&&(f.type=='all'||DM[k].type==f.type)).sort((a,b)=>D.wrong[b].t-D.wrong[a].t),open=ids.filter(k=>!D.wrong[k].done);
 const byT={};DQ.forEach(q=>{if(f.sub!='all'&&q.sub!=f.sub)return;['orig','var'].forEach(m=>{const r=D.res[rk(m,q.id)];if(r===undefined)return;const t=byT[q.type]=byT[q.type]||{t:0,c:0};t.t++;if(r)t.c++})});
 const tl=Object.entries(byT).map(([k,v])=>[k,v.t,Math.round(v.c/v.t*100)]).sort((a,b)=>a[2]-b[2]||b[1]-a[1]);
 const rc={};REASONS.forEach(r=>rc[r]=0);Object.keys(D.wrong).forEach(k=>{if(!DM[k])return;(D.wrong[k].reasons||[]).forEach(r=>rc[r]=(rc[r]||0)+1)});D.photo.forEach(p=>(p.reasons||[]).forEach(r=>rc[r]=(rc[r]||0)+1));const rmax=Math.max(1,...Object.values(rc));
 const top=Object.entries(rc).sort((a,b)=>b[1]-a[1])[0];
 let h=`<div class="card dk-slide">${mascot(tl.length?M.serious:M.cute,tl.length?`가장 약한 유형은 「${tl[0][0]}」(${tl[0][2]}%)${top&&top[1]?`, 자주 틀린 이유는 「${top[0]}」`:''}! 여기부터 잡자 💪`:'아직 기록이 없어! 독해 문제부터 풀어볼까?')}
 <h3 style="margin:6px 0">${I.chart}유형별 정답률 (약한 순)</h3><div class="dk-bars">${tl.length?tl.map(([k,n,r])=>`<div>${esc(k)} <small style="color:#8a7fa6">${n}회 · ${r}%</small><div class="bar"><i style="width:${r}%;${r<60?'background:linear-gradient(90deg,#ffb3c9,#f07a8a)':''}"></i></div></div>`).join(''):'<small>풀이 기록이 쌓이면 여기 그래프가 생겨요.</small>'}</div>
 <h3 style="margin:12px 0 6px">${I.note}틀린 이유 통계</h3><div class="dk-bars">${REASONS.map(r=>`<div>${r} <small style="color:#8a7fa6">${rc[r]}회</small><div class="bar"><i style="width:${rc[r]/rmax*100}%"></i></div></div>`).join('')}</div></div>
 <div class="card">${filters(f,'n')}<div style="margin-top:8px"><span class="pill">복습할 오답 ${open.length}개</span></div>${open.length?`<button class="btn" onclick="DK.retry('orig')">${I.retry}오답 다시 풀기(원본)</button><button class="btn sub" onclick="DK.retry('var')">${I.shuffle}오답 변형으로 풀기</button>`:''}<button class="btn sub" onclick="DK.go('photo')">${I.camera}새 노트 · 사진으로 추가</button><div id="dkQuota">${qbar()}</div></div>`;
 ids.forEach(k=>{const q=DM[k],w=D.wrong[k];h+=`<div class="card dk-item ${w.done?'done':''}"><div class="qhead"><b><span class="stag">${SUBN[q.sub]}</span><span class="ytag">${q.src?esc(SETN(q.src).split(' · ')[0])+' '+q.no+'번':q.year+' '+q.no+'번'}</span>${esc(q.type)}</b><span class="pill">${w.mode=='orig'?'원본':w.mode=='var'?'변형':'원본+변형'}에서 틀림 · ${w.n||1}회</span></div>
 <div style="margin:6px 0">${REASONS.map(r=>`<button class="dk-chip ${w.reasons.includes(r)?'on':''}" onclick="DK.reason('${k}','${r}')">${r}</button>`).join('')}</div>
 <textarea class="dk-ta" style="min-height:52px" placeholder="메모" oninput="DK.memo('${k}',this.value)">${esc(w.memo||'')}</textarea>
 ${att('w',k)}
 <details><summary>지문 · 분석 다시 보기</summary><div class="stem" style="font-size:15px;font-weight:bold">${esc(q.prompt)}</div>${q.given?`<div class="dk-given">${esc(q.given)}</div>`:''}<div class="dk-psg ${q.sub=='en'?'en':''}">${esc(q.passage)}</div>${q.choices.map((c,j)=>`<div style="margin:4px 0;${j+1==q.answer?'color:#2f9a64;font-weight:bold':j+1==w.picked?'color:#d05a6e':''}">${NN[j]} ${esc(c)}</div>`).join('')}<div class="dk-box" style="margin-top:8px"><p><b>정답 근거</b> “${esc(q.a.근거)}”</p><p><b>함정</b> ${esc(q.a.함정)}</p><p><b>풀이 전략</b> ${esc(q.p.전략)}</p></div></details>
 <div style="margin-top:10px"><button class="btn sub" onclick="DK.start1('${k}')">${I.retry}다시 풀기</button><button class="btn ${w.done?'sub':''}" onclick="DK.done('${k}')">${w.done?'↺ 복습 목록으로':'✔ 복습완료'}</button><button class="btn sub" onclick="DK.del('${k}')">삭제</button></div></div>`});
 if(D.photo.length){h+=`<div class="card"><b style="color:var(--p)">${I.camera}내가 사진으로 추가한 지문 (${D.photo.length})</b><p style="font-size:13px;color:#8a7fa6;margin:4px 0 0">「텍스트 복사」로 지문을 복사해서 어디든 붙여 넣을 수 있어요.</p></div>`;
  D.photo.slice().reverse().forEach(p=>{h+=`<div class="card dk-item ${p.done?'done':''}"><div class="qhead"><b><span class="stag">${SUBN[p.sub]||p.sub}</span><span class="pill">${esc(p.type)}</span> 내 지문</b><small>${new Date(p.t).toLocaleDateString('ko-KR')}</small></div>${p.thumb?`<img src="${p.thumb}" alt="지문 사진" style="max-width:160px;border-radius:12px;margin:6px 0;border:2px solid #eee6ff;cursor:zoom-in" onclick="DK.zoomSrc(this.src)">`:''}
  <div>${REASONS.map(r=>`<button class="dk-chip ${p.reasons.includes(r)?'on':''}" onclick="DK.preason('${p.id}','${r}')">${r}</button>`).join('')}</div>
  <details ${p.text&&p.text.length<300?'open':''}><summary>지문 텍스트</summary><textarea class="dk-ta" oninput="DK.pedit('${p.id}','text',this.value)">${esc(p.text)}</textarea></details><textarea class="dk-ta" style="min-height:52px;margin-top:6px" placeholder="메모" oninput="DK.pedit('${p.id}','memo',this.value)">${esc(p.memo||'')}</textarea>${att('p',p.id)}
  <div style="margin-top:8px"><button class="btn" onclick="DK.copy('${p.id}')">${I.copy}텍스트 복사</button><button class="btn sub" onclick="DK.pdone('${p.id}')">${p.done?'↺ 복습 목록으로':'✔ 복습완료'}</button><button class="btn sub" onclick="DK.pdel('${p.id}')">삭제</button></div></div>`})}
 return h}
function photo(){return`<div class="card dk-slide">${mascot(M.think,'✍ 새 노트! 지문 사진을 찍거나, 번역·해설 글과 스크린샷을 붙여 넣어도 돼 📸📋')}
 <label class="btn" style="display:inline-block">${I.camera}사진 찍기 / 고르기<input id="dkFile" type="file" accept="image/*" capture="environment" style="display:none" onchange="DK.pick(this)"></label>
 ${ocr.thumb?`<div><img src="${ocr.thumb}" alt="미리보기" style="max-width:100%;max-height:260px;border-radius:14px;border:2px solid #eee6ff;margin-top:8px"></div><button class="btn sub" ${ocr.busy?'disabled':''} onclick="DK.runOCR()">${I.search}글자 뽑기 (OCR)</button>`:''}
 <div class="dk-ocrbar" style="display:${ocr.busy?'block':'none'}"><i id="dkOcrP" style="width:${ocr.p}%"></i></div><div id="dkOcrM" style="font-size:13px;color:#8a7fa6">${esc(ocr.msg)}</div>
 <p style="font-size:13px;color:#8a7fa6">처음 한 번은 한국어·영어 인식 데이터(약 10~20MB)를 내려받느라 시간이 걸려요. 사진은 휴대폰 안에서만 처리되고 서버로 보내지 않아요.</p></div>
 <div class="card"><b style="color:var(--p)">지문 텍스트 (직접 고쳐도 돼요)</b><textarea id="dkTxt" class="dk-ta" style="min-height:180px" placeholder="OCR 결과가 여기에 들어와요. 직접 입력해도 돼요." oninput="DK.ocrTxt(this.value)">${esc(ocr.text)}</textarea>
 <div class="dk-filter" style="margin-top:8px">과목 ${sel('dkPS','ko',[['ko','국어'],['en','영어']],'')} 유형 ${sel('dkPT','미분류',[['미분류','미분류']].concat(['주제·제목·요지','빈칸','순서','삽입','무관한 문장','내용일치','추론','강화·약화','논리','기타'].map(t=>[t,t])),'')}</div>
 <div style="margin-top:6px">${REASONS.map(r=>`<button class="dk-chip" data-r="${r}" onclick="this.classList.toggle('on')">${r}</button>`).join('')}</div>
 <textarea id="dkPM" class="dk-ta" style="min-height:52px;margin-top:8px" placeholder="메모: 내 답 / 정답 / 헷갈린 점"></textarea>
 ${att('n','new')}
 <div style="margin-top:8px"><button class="btn" onclick="DK.psave()">📒 오답노트에 저장</button><button class="btn sub" onclick="DK.copyRaw()">${I.copy}텍스트 복사</button><label style="font-size:13px"><input type="checkbox" id="dkKeep" checked> 작은 썸네일도 저장</label></div></div>`}
function dkView(){if(!DQ)return'<div class="card">📖 독해 데이터를 불러오는 중…</div>';return sub=='run'?quiz():sub=='note'?note():sub=='photo'?photo():home()}
function rr(){render();if(sub=='home'||sub=='note')animRings()}
function copyText(t){const done=()=>alert('복사했어요! 📋');if(navigator.clipboard&&isSecureContext)navigator.clipboard.writeText(t).then(done,()=>fall());else fall();function fall(){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done()}catch(e){prompt('아래 내용을 복사하세요',t)}ta.remove()}}
const tmpl=(s,t,text,memo,paste)=>`[9급 ${s=='en'?'영어':'국어'} 독해 · 내 지문${t&&t!='미분류'?' · '+t:''}]\n\n${text}${memo?'\n\n[메모] '+memo:''}${paste?'\n\n[붙여넣기 메모]\n'+paste:''}`;
function shrink(file,max,q){return new Promise(res=>{const img=new Image();img.onload=()=>{const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(img.src);res(c.toDataURL('image/jpeg',q))};img.src=URL.createObjectURL(file)})}
let lastFile=null;
function loadTess(){return new Promise((res,rej)=>{if(window.Tesseract)return res();const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';s.onload=res;s.onerror=()=>rej(new Error('OCR 엔진을 불러오지 못했어요 (인터넷 연결 필요)'));document.head.appendChild(s)})}
function setP(p,m){ocr.p=p;ocr.msg=m;const b=document.getElementById('dkOcrP'),t=document.getElementById('dkOcrM');if(b){b.style.width=p+'%';b.parentNode.style.display='block'}if(t)t.textContent=m}
/* ── 붙여넣기 메모 + 스크린샷 첨부 ── */
let draft={paste:'',shots:[]};const RAW={};
const ICLIP='<svg viewBox="0 0 24 24" class="dki"><rect x="6" y="4" width="12" height="17" rx="2.5"/><path d="M9 4.5h6v3H9z"/><path d="M9 12h6M9 15.5h4"/></svg>',
 IIMG='<svg viewBox="0 0 24 24" class="dki"><rect x="3.5" y="5" width="17" height="14" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M5 17l4.5-4.5 3 3 2.5-2.5L19 17"/></svg>';
function aObj(s,id){if(s=='n')return draft;const o=s=='w'?D.wrong[id]:D.photo.find(x=>x.id==id);if(o){o.paste=o.paste||'';o.shots=o.shots||[]}return o}
const aid=(s,id)=>s+'_'+String(id).replace(/[^\w-]/g,'_');
function quota(){let n=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);n+=k.length+(localStorage.getItem(k)||'').length}return{used:n*2,pct:Math.min(100,Math.round(n*2/(5*1024*1024)*100))}}
function qbar(){const q=quota();return`<div class="dk-quota ${q.pct>=80?'warn':''}">💾 저장 공간 ${q.pct}% 사용 (${(q.used/1048576).toFixed(1)}MB / 약 5MB)${q.pct>=80?' — 거의 꽉 찼어요! 오래된 스크린샷을 지워 주세요 🥺':''}<div class="bar"><i style="width:${q.pct}%"></i></div></div>`}
function galHTML(s,id){const o=aObj(s,id);if(!o||!o.shots.length)return'<small style="color:#8a7fa6">아직 첨부한 스크린샷이 없어요.</small>';
 return o.shots.map(sh=>`<div class="dk-shot"><img src="${sh.src}" alt="스크린샷" onclick="DK.zoom('${s}','${id}','${sh.id}')"><button class="x" title="삭제" onclick="DK.shotDel('${s}','${id}','${sh.id}')">×</button><button class="o" onclick="DK.shotOCR('${s}','${id}','${sh.id}')">🔍 OCR</button></div>`).join('')}
function att(s,id){const o=aObj(s,id),a=aid(s,id);return`<div class="dk-att" id="att_${a}">
 <div class="dk-row" style="justify-content:space-between"><b style="color:var(--p)">${ICLIP}붙여넣기 메모</b><button class="btn sub mini" onclick="DK.clipText('${s}','${id}')">📋 클립보드에서 붙여넣기</button></div>
 <textarea class="dk-ta dk-paste" id="pa_${a}" placeholder="번역기·해설·풀이를 길게 눌러 ‘붙여넣기’ 해도 돼요 ✍" oninput="DK.pasteEdit('${s}','${id}',this.value)" onpaste="DK.onPaste(event,'${s}','${id}')">${esc(o.paste)}</textarea>
 <div class="dk-row" style="justify-content:space-between;margin-top:8px"><b style="color:var(--p)">${IIMG}스크린샷 (${o.shots.length})</b><span><button class="btn sub mini" onclick="DK.clipImg('${s}','${id}')">🖼 이미지 붙여넣기</button><label class="btn sub mini">📂 갤러리<input type="file" accept="image/*" multiple style="display:none" onchange="DK.addShots(this,'${s}','${id}')"></label></span></div>
 <div class="dk-pz" contenteditable="true" onpaste="DK.onPaste(event,'${s}','${id}')" oninput="this.textContent=''">여기를 누르고 Ctrl+V · 길게 눌러 ‘붙여넣기’로 이미지 붙이기</div>
 <div class="dk-gal" id="gal_${a}">${galHTML(s,id)}</div><div class="dk-ocrbar" id="ob_${a}" style="display:none"><i></i></div><div class="dk-amsg" id="am_${a}"></div></div>`}
function amsg(s,id,m){const e=document.getElementById('am_'+aid(s,id));if(e)e.textContent=m}
function updAtt(s,id){const a=aid(s,id),g=document.getElementById('gal_'+a);if(g)g.innerHTML=galHTML(s,id);const b=document.querySelector('#att_'+a+' b:nth-of-type(1)');const hd=document.querySelectorAll('#att_'+a+' > .dk-row b')[1];if(hd)hd.innerHTML=IIMG+'스크린샷 ('+aObj(s,id).shots.length+')';const qb=document.getElementById('dkQuota');if(qb)qb.innerHTML=qbar()}
function blobURL(b){return new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(b)})}
async function compress(blob,target){const url=URL.createObjectURL(blob);const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url});
 let max=1000,q=.72,out='';for(let k=0;k<8;k++){const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0,c.width,c.height);out=c.toDataURL('image/jpeg',q);if(out.length*.75<=target)break;if(q>.5)q-=.08;else max=Math.round(max*.82)}
 URL.revokeObjectURL(url);return out}
async function addBlobs(s,id,blobs){const o=aObj(s,id);if(!o)return;blobs=blobs.filter(b=>b&&/^image\//.test(b.type));if(!blobs.length){amsg(s,id,'이미지를 찾지 못했어요 🥲');return}
 if(quota().pct>=90&&!confirm('저장 공간이 거의 꽉 찼어요(90%↑). 그래도 추가할까요?'))return;
 amsg(s,id,'이미지 줄이는 중…');let ok=0;
 for(const b of blobs){try{const src=await compress(b,70000),sh={id:'s'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),src,t:Date.now()};RAW[sh.id]=b;o.shots.push(sh);if(s!='n'&&!dSave(true)){o.shots.pop();alert('저장 공간이 가득 찼어요 😢 오래된 스크린샷이나 사진을 지운 뒤 다시 시도해 주세요.');break}ok++}catch(e){amsg(s,id,'이미지를 읽지 못했어요: '+(e.message||e))}}
 updAtt(s,id);if(ok){amsg(s,id,`스크린샷 ${ok}장 추가! (약 70KB로 줄여 저장)`);if(quota().pct>=80)amsg(s,id,`스크린샷 ${ok}장 추가! ⚠ 저장 공간 ${quota().pct}% — 곧 꽉 차요`)}}
function zoomOpen(src){let z=document.getElementById('dkZoom');if(!z){z=document.createElement('div');z.id='dkZoom';z.onclick=()=>z.remove();document.body.appendChild(z)}z.innerHTML=`<img src="${src}" alt="확대"><span>탭하면 닫혀요</span>`}
const ATT={
 pasteEdit(s,id,v){const o=aObj(s,id);if(!o)return;o.paste=v;if(s!='n')dSave()},
 async clipText(s,id){const ta=document.getElementById('pa_'+aid(s,id));try{if(!navigator.clipboard||!navigator.clipboard.readText)throw 0;const t=await navigator.clipboard.readText();if(!t){amsg(s,id,'클립보드가 비어 있어요');return}ta.value=(ta.value?ta.value+'\n\n':'')+t;ATT.pasteEdit(s,id,ta.value);amsg(s,id,'붙여넣었어요! 📋')}catch(e){ta&&ta.focus();amsg(s,id,'이 브라우저는 자동 붙여넣기를 막아 두었어요. 칸을 길게 눌러 ‘붙여넣기’를 선택해 줘! 👆')}},
 async clipImg(s,id){try{if(!navigator.clipboard||!navigator.clipboard.read)throw 0;const items=await navigator.clipboard.read(),bl=[];for(const it of items){const ty=it.types.find(t=>t.startsWith('image/'));if(ty)bl.push(await it.getType(ty))}if(!bl.length){amsg(s,id,'클립보드에 이미지가 없어요. 스크린샷을 복사했는지 확인해 줘!');return}addBlobs(s,id,bl)}catch(e){const pz=document.querySelector('#att_'+aid(s,id)+' .dk-pz');pz&&pz.focus();amsg(s,id,'자동으로 못 읽었어요. 아래 분홍 칸을 길게 눌러 ‘붙여넣기’ 하거나 갤러리에서 골라 줘!')}},
 onPaste(ev,s,id){const cd=ev.clipboardData;if(!cd)return;const fs=[...cd.items||[]].filter(i=>i.kind=='file'&&i.type.startsWith('image/')).map(i=>i.getAsFile());if(fs.length){ev.preventDefault();addBlobs(s,id,fs)}else if(ev.target.classList.contains('dk-pz')){ev.preventDefault();const t=cd.getData('text');if(t){const ta=document.getElementById('pa_'+aid(s,id));ta.value=(ta.value?ta.value+'\n\n':'')+t;ATT.pasteEdit(s,id,ta.value);amsg(s,id,'글자는 붙여넣기 메모에 넣었어요 📋')}}},
 addShots(inp,s,id){addBlobs(s,id,[...(inp.files||[])]);inp.value=''},
 zoom(s,id,sid){const sh=aObj(s,id).shots.find(x=>x.id==sid);if(sh)zoomOpen(sh.src)},
 zoomSrc(src){zoomOpen(src)},
 shotDel(s,id,sid){if(!confirm('이 스크린샷을 지울까요?'))return;const o=aObj(s,id);o.shots=o.shots.filter(x=>x.id!=sid);delete RAW[sid];if(s!='n')dSave();updAtt(s,id);amsg(s,id,'지웠어요 🗑')},
 async shotOCR(s,id,sid){const o=aObj(s,id),sh=o.shots.find(x=>x.id==sid);if(!sh||ATT.busy)return;ATT.busy=true;const a=aid(s,id),bar=document.getElementById('ob_'+a);bar.style.display='block';const setB=(p,m)=>{bar.firstChild.style.width=p+'%';amsg(s,id,m)};setB(3,'OCR 엔진 불러오는 중…');
  try{await loadTess();const src=RAW[sid]?await compress(RAW[sid],900000):sh.src;const lang=(s=='w'?DM[id]&&DM[id].sub:s=='p'?o.sub:(document.getElementById('dkPS')||{}).value)=='en'?'eng+kor':'kor+eng';
   const r=await Tesseract.recognize(src,lang,{logger:m=>{if(m.status)setB(Math.round((m.progress||0)*100),({'loading language traineddata':'인식 데이터 내려받는 중','recognizing text':'글자 읽는 중'})[m.status]||'준비 중')}});
   const t=(r.data.text||'').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();const ta=document.getElementById('pa_'+a);if(t&&ta){ta.value=(ta.value?ta.value+'\n\n':'')+'[스크린샷 글자]\n'+t;ATT.pasteEdit(s,id,ta.value)}setB(100,t?'다 읽었어요! 붙여넣기 메모에 넣어 뒀어 ✍ 틀린 글자는 고쳐 줘':'글자를 찾지 못했어요 🥲')}catch(e){setB(0,'😢 '+(e.message||e))}
  ATT.busy=false;setTimeout(()=>bar.style.display='none',800)}
};

window.DK={...ATT,
 open(k){view='dk';sub=k||'home';run=null;loadData(()=>{rr();scrollTo(0,0)});rr()},
 load(cb){loadData(()=>cb(DQ,DM))},
 startSet(id){const L=DQ.filter(q=>q.src==id);start('orig',L,'📚 '+SETN(id))},curId(){return view=='dk'&&sub=='run'&&run&&run.list?run.list[run.i]:null},
 curMode(){return run&&run.mode},
 startIds(ids,m,title){loadData(()=>{view='dk';const L=ids.map(i=>DM[i]).filter(Boolean);start(m||'orig',L,title||'🔖 북마크 독해')})},
 stats(){return{res:D.res,wrong:D.wrong,photo:D.photo}},
 go(k){sub=k;if(k!='run')run=null;rr();scrollTo(0,0)},
 setF(fn,k,v){const f=fn=='h'?D.f:noteF;f[k]=(k=='year'&&v!='all')?+v:v;if(fn=='h')dSave();rr()},
 start(m){start(m)},start1(k){start('orig',[DM[k]],'📒 오답 다시 풀기')},
 retry(m){const L=Object.keys(D.wrong).filter(k=>DM[k]&&!D.wrong[k].done&&(noteF.sub=='all'||DM[k].sub==noteF.sub)&&(noteF.year=='all'||DM[k].year==noteF.year)&&(noteF.type=='all'||DM[k].type==noteF.type)).map(k=>DM[k]);start(m,L,`📒 오답 다시 풀기(${m=='var'?'변형':'원본'})`)},
 ans,mv(d){run.i+=d;run.picked=null;tab='a';rr();scrollTo(0,0)},tab(k){tab=k;rr()},
 vans(k,n){run=run||{vp:{}};run.vp[k]=n;rr()},
 reason(k,r){const w=D.wrong[k];if(!w)return;const i=w.reasons.indexOf(r);i<0?w.reasons.push(r):w.reasons.splice(i,1);dSave();rr()},
 memo(k,v){if(D.wrong[k]){D.wrong[k].memo=v;dSave()}},
 done(k){D.wrong[k].done=!D.wrong[k].done;dSave();rr()},del(k){if(confirm('이 오답을 지울까요?')){delete D.wrong[k];dSave();rr()}},
 pick(inp){const f=inp.files&&inp.files[0];if(!f)return;lastFile=f;shrink(f,520,.6).then(u=>{ocr.thumb=u;ocr.msg='「글자 뽑기」를 눌러 주세요';rr()})},
 async runOCR(){if(!lastFile||ocr.busy)return;ocr.busy=true;setP(2,'OCR 엔진 불러오는 중…');rr();
  try{await loadTess();const big=await shrink(lastFile,2200,.92);const lang=document.getElementById('dkPS')?.value=='en'?'eng+kor':'kor+eng';
   const r=await Tesseract.recognize(big,lang,{logger:m=>{if(m.status)setP(Math.round((m.progress||0)*100),({'loading language traineddata':'인식 데이터 내려받는 중','recognizing text':'글자 읽는 중','initializing api':'준비 중','loading tesseract core':'엔진 준비 중'})[m.status]||m.status)}});
   ocr.text=(r.data.text||'').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();ocr.msg='완료! 틀린 글자는 직접 고쳐 주세요 ✍';if(!RM.matches)confetti(20)}catch(e){ocr.msg='😢 '+(e.message||e)}
  ocr.busy=false;ocr.p=100;rr()},
 ocrTxt(v){ocr.text=v},
 psave(){const t=document.getElementById('dkTxt').value.trim();if(!t&&!draft.paste.trim()&&!draft.shots.length&&!ocr.thumb){alert('지문 텍스트나 붙여넣기 메모, 스크린샷 중 하나는 넣어 줘!');return}const rs=[...document.querySelectorAll('.dk-chip.on[data-r]')].map(b=>b.dataset.r);
  D.photo.push({id:'ph'+Date.now(),sub:document.getElementById('dkPS').value,type:document.getElementById('dkPT').value,text:t,memo:document.getElementById('dkPM').value,reasons:rs,t:Date.now(),thumb:document.getElementById('dkKeep').checked?ocr.thumb:'',paste:draft.paste,shots:draft.shots,done:false});if(!dSave()){D.photo.pop();return}draft={paste:'',shots:[]};ocr={busy:false,p:0,text:'',thumb:'',msg:''};lastFile=null;confetti(30);DK.go('note')},
 copyRaw(){copyText(tmpl(document.getElementById('dkPS').value,document.getElementById('dkPT').value,document.getElementById('dkTxt').value,document.getElementById('dkPM').value,draft.paste))},
 copy(id){const p=D.photo.find(x=>x.id==id);if(p)copyText(tmpl(p.sub,p.type,p.text,p.memo,p.paste))},
 pedit(id,k,v){const p=D.photo.find(x=>x.id==id);if(p){p[k]=v;dSave()}},
 preason(id,r){const p=D.photo.find(x=>x.id==id);const i=p.reasons.indexOf(r);i<0?p.reasons.push(r):p.reasons.splice(i,1);dSave();rr()},
 pdone(id){const p=D.photo.find(x=>x.id==id);p.done=!p.done;dSave();rr()},pdel(id){if(confirm('이 지문을 지울까요?')){D.photo=D.photo.filter(x=>x.id!=id);dSave();rr()}}
};
const _nr=navR;navR=function(){_nr();const n=document.getElementById('nav'),b=document.createElement('button');b.innerHTML='📖 독해';b.id='dkNav';if(view_is())b.className='on';b.onclick=()=>{view='dk';sub='home';run=null;loadData(rr);rr()};n.insertBefore(b,n.lastChild)};
function view_is(){return view=='dk'}
const _r=render;render=function(){_r.apply(this,arguments);if(view=='dk')document.getElementById('app').innerHTML=view_()};
function view_(){return dkView()}
if(location.hash=='#dokhae'){view='dk';loadData(rr)}
render();
})();
