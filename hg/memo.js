/* 합격온 — 사진 메모 (촬영/갤러리 + S펜 필기 + 메모 · 기기 안 IndexedDB 저장, 외부 전송 없음) */
(function(){
const G=window,DB='hapgyeokon_pm',ST='m';
const SUBS=['국어','영어','세법개론','회계학','회계원리','한국사','기타'];
const COL=['#2b2350','#e5486f','#3f6fe0'];
const ea=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let db=null,L=[],loaded=false,URLS={},flt={chk:0,sub:'all'};
const PM=G.PM_STATE={ed:null};
function open(){return new Promise((res,rej)=>{if(!G.indexedDB)return rej('no idb');const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{r.result.createObjectStore(ST,{keyPath:'id'})};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function tx(mode,fn){return new Promise((res,rej)=>{const t=db.transaction(ST,mode),s=t.objectStore(ST);const r=fn(s);t.oncomplete=()=>res(r&&r.result);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error)})}
async function load(){try{db=db||await open();L=(await tx('readonly',s=>s.getAll()))||[];L.sort((a,b)=>b.t-a.t)}catch(e){L=[]}loaded=true;if(view=='note'&&noteType=='pm')G.render()}
const url=m=>{if(!m.thumb)return'';if(!URLS[m.id]||URLS[m.id].b!==m.thumb){if(URLS[m.id])URL.revokeObjectURL(URLS[m.id].u);URLS[m.id]={b:m.thumb,u:URL.createObjectURL(m.thumb)}}return URLS[m.id].u};
/* ---------- css ---------- */
document.head.insertAdjacentHTML('beforeend',`<style>
.pm-tool{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:8px 0}
.pm-tool button{border:2px solid #e5dbff;background:#fff;border-radius:999px;min-width:40px;height:40px;padding:0 10px;font:inherit;font-size:14px;color:#5b4b8a;cursor:pointer}
.pm-tool button.on{border-color:var(--p,#7c5cff);background:#f3eeff;font-weight:700}
.pm-tool .dot{width:40px;padding:0}.pm-tool .dot i{display:inline-block;width:18px;height:18px;border-radius:50%;vertical-align:middle}
.pm-stage{position:relative;overflow:hidden;border-radius:18px;border:3px dashed var(--p2,#cdbdff);background:#f6f0ff;touch-action:none;user-select:none;-webkit-user-select:none;max-height:70vh}
.pm-z{transform-origin:0 0;position:relative}.pm-z canvas{display:block;width:100%;height:auto}.pm-z #pmInk{position:absolute;left:0;top:0}
.pm-f{display:grid;gap:8px;margin-top:10px}.pm-f textarea,.pm-f input,.pm-f select{font:inherit;font-size:15px;border:2px solid #e5dbff;border-radius:14px;padding:8px 10px;width:100%;box-sizing:border-box;background:#fff}
.pm-f label.ck{display:flex;align-items:center;gap:8px;font-weight:700;color:#c2386b}
.pm-it{display:flex;gap:10px;align-items:flex-start}.pm-it img{width:96px;height:96px;object-fit:cover;border-radius:14px;border:2px solid #eee4ff;flex:none;cursor:pointer;background:#f6f0ff}
.pm-it .b{flex:1;min-width:0}.pm-it p{margin:4px 0;font-size:14px;white-space:pre-wrap;word-break:break-all}
.pm-star{border:none;background:none;font-size:22px;cursor:pointer;padding:0 2px}
.pm-hint{font-size:12px;color:#8a7fa6;margin:4px 0}
</style>`);
/* ---------- list ---------- */
function typeSel(){return`유형 <select onchange="noteType=this.value;render()"><option value="all">전체</option><option value="mc">객관식</option><option value="ox">OX</option><option value="pm" selected>📸 사진 메모</option></select>`}
function list(){
 const nC=L.filter(m=>m.chk).length;let xs=L.filter(m=>(!flt.chk||m.chk)&&(flt.sub=='all'||m.sub==flt.sub));
 let h=`<div class="card">${mascot(nC?M.serious:M.cute,!loaded?'사진 메모 불러오는 중… ⏳':L.length?(nC?`다시 볼 사진 메모가 ${nC}개 있어! ✔ 표시한 것부터 보자 💪`:'사진 메모 잘 모으고 있네! 👍'):'문제·필기를 찍어서 펜으로 표시하고 메모해 봐! 📸')}
 <div style="margin:6px 0;display:flex;gap:8px;flex-wrap:wrap;align-items:center">${typeSel()} 보기 <select onchange="PM.f('chk',+this.value)"><option value="0">전체 ${L.length}</option><option value="1" ${flt.chk?'selected':''}>✔ 다시 볼 것만 ${nC}</option></select> 과목 <select onchange="PM.f('sub',this.value)"><option value="all">전 과목</option>${SUBS.map(s=>`<option ${flt.sub==s?'selected':''}>${s}</option>`).join('')}</select></div>
 <button class="btn" onclick="PM.add()">📸 새 사진 메모</button><p class="pm-hint">사진은 이 기기 안에만 저장돼요(서버로 안 보내요). ChatGPT 분석은 사진을 직접 보여주고, 받은 답을 메모에 붙여 넣으면 돼요.</p></div>`;
 if(loaded&&!xs.length&&L.length)h+=`<div class="card"><p>조건에 맞는 사진 메모가 없어요.</p></div>`;
 xs.forEach(m=>{h+=`<div class="card wn ${m.chk?'':'done'}"><div class="pm-it"><img src="${url(m)}" alt="사진 메모" onclick="PM.edit('${m.id}')"><div class="b"><div class="qhead" style="margin:0"><b><span class="stag">${ea(m.sub)}</span>${(m.tags||'').split(/[,#\s]+/).filter(Boolean).map(t=>`<span class="oxtag">#${ea(t)}</span>`).join('')}</b><button class="pm-star" title="다시 볼 것" onclick="PM.chk('${m.id}')">${m.chk?'✔️':'☐'}</button></div>
 <small style="color:#8a7fa6">${new Date(m.t).toLocaleDateString('ko-KR')} ${m.chk?'· 다시 볼 것':''}</small>${m.memo?`<p>${ea(m.memo.length>140?m.memo.slice(0,140)+'…':m.memo)}</p>`:''}${m.gpt?`<details><summary style="font-size:13px;color:#7c5cff">💬 붙여넣은 분석</summary><p>${ea(m.gpt)}</p></details>`:''}
 <button class="btn sub mini" onclick="PM.edit('${m.id}')">✏ 열기</button></div></div></div>`});
 return h}
/* ---------- editor ---------- */
function edView(){const e=PM.ed;
 let h=`<div class="card">${mascot(M.think,e.img?'S펜이면 손바닥은 무시해요 ✍ 두 손가락으로 확대·이동!':'먼저 사진을 찍거나 골라줘 📷')}`;
 if(!e.img)h+=`<div style="display:flex;gap:8px;flex-wrap:wrap"><label class="btn" style="display:inline-block">📷 촬영<input type="file" accept="image/*" capture="environment" style="display:none" onchange="PM.pick(this)"></label><label class="btn sub" style="display:inline-block">🖼 갤러리<input type="file" accept="image/*" style="display:none" onchange="PM.pick(this)"></label></div>`;
 else h+=`<div class="pm-tool">${COL.map((c,i)=>`<button class="dot ${e.tool=='pen'&&e.col==i?'on':''}" onclick="PM.tool('pen',${i})" aria-label="펜 ${i+1}"><i style="background:${c}"></i></button>`).join('')}<button class="${e.tool=='hl'?'on':''}" onclick="PM.tool('hl')">🖍 형광</button><button class="${e.tool=='er'?'on':''}" onclick="PM.tool('er')">🧽 지우개</button><button onclick="PM.undo()" aria-label="실행취소">↶</button><button onclick="PM.fit()" aria-label="화면 맞춤">🔍</button></div>
 <div class="pm-stage" id="pmStage"><div class="pm-z" id="pmZ"><canvas id="pmBase"></canvas><canvas id="pmInk"></canvas></div></div>`;
 h+=`<div class="pm-f"><select onchange="PM.v('sub',this.value)">${SUBS.map(s=>`<option ${e.sub==s?'selected':''}>${s}</option>`).join('')}</select>
 <input placeholder="태그 (예: 부가세, 관계대명사)" value="${ea(e.tags)}" oninput="PM.v('tags',this.value)">
 <textarea rows="3" placeholder="✍ 메모" oninput="PM.v('memo',this.value)">${ea(e.memo)}</textarea>
 <label class="ck"><input type="checkbox" style="width:auto" ${e.chk?'checked':''} onchange="PM.v('chk',this.checked)">✔ 체크 · 다시 볼 것</label>
 <details ${e.gpt?'open':''}><summary style="color:#7c5cff;font-size:14px">💬 ChatGPT 분석 붙여넣기 (선택)</summary><textarea rows="4" placeholder="ChatGPT에서 받은 분석을 여기에 붙여 넣어요" oninput="PM.v('gpt',this.value)">${ea(e.gpt)}</textarea></details></div>
 <div style="margin-top:10px"><button class="btn" onclick="PM.save()">💾 저장</button><button class="btn sub" onclick="PM.close()">닫기</button>${e.id?`<button class="btn sub" onclick="PM.del()">🗑 삭제</button>`:''}</div></div>`;
 return h}
/* ---------- drawing ---------- */
let ink=null,ictx=null,cur=null,penSeen=false,ptrs=new Map(),pin=null,Z={s:1,x:0,y:0};
function bw(k){const r=ink.width/Math.max(1,ink.getBoundingClientRect().width);return r*(k=='pen'?2.4:k=='hl'?16:18)}
function drawStroke(c,s){const p=s.pts;if(!p.length)return;c.save();c.lineCap='round';c.lineJoin='round';
 if(s.k=='er'){c.globalCompositeOperation='destination-out';c.strokeStyle='#000';c.lineWidth=s.w}
 if(s.k=='hl'){c.globalAlpha=.35;c.strokeStyle='#ffe14d';c.lineWidth=s.w}
 if(s.k=='pen'){c.strokeStyle=s.c;c.fillStyle=s.c;if(p.length==1){c.beginPath();c.arc(p[0][0],p[0][1],s.w*(.35+1.3*p[0][2])/2,0,7);c.fill()}
  for(let i=1;i<p.length;i++){c.lineWidth=s.w*(.35+1.3*(p[i][2]+p[i-1][2])/2);c.beginPath();c.moveTo(p[i-1][0],p[i-1][1]);c.lineTo(p[i][0],p[i][1]);c.stroke()}}
 else{c.beginPath();c.moveTo(p[0][0],p[0][1]);if(p.length==1)c.lineTo(p[0][0]+.1,p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke()}
 c.restore()}
function redraw(){if(!ictx)return;ictx.clearRect(0,0,ink.width,ink.height);PM.ed.strokes.forEach(s=>drawStroke(ictx,s))}
function applyZ(){const z=document.getElementById('pmZ');if(z)z.style.transform=`translate(${Z.x}px,${Z.y}px) scale(${Z.s})`}
function pt(e){const r=ink.getBoundingClientRect();const pr=e.pointerType=='pen'?(e.pressure||.5):.5;return[(e.clientX-r.left)/r.width*ink.width,(e.clientY-r.top)/r.height*ink.height,Math.min(1,Math.max(.05,pr))]}
function init(){const e=PM.ed,b=document.getElementById('pmBase');ink=document.getElementById('pmInk');if(!b||!ink||!e.img){ink=null;ictx=null;return}
 b.width=ink.width=e.img.width;b.height=ink.height=e.img.height;b.getContext('2d').drawImage(e.img,0,0);ictx=ink.getContext('2d');redraw();applyZ();
 const st=document.getElementById('pmStage');
 st.addEventListener('pointerdown',ev=>{if(ev.pointerType=='pen')penSeen=true;
  if(ev.pointerType=='touch'){ptrs.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});
   if(ptrs.size==2){if(cur&&cur.touch){PM.ed.strokes.pop();cur=null;redraw()}const r=st.getBoundingClientRect(),[a,c]=[...ptrs.values()];pin={d0:Math.hypot(a.x-c.x,a.y-c.y)||1,s0:Z.s,x0:Z.x,y0:Z.y,m0:{x:(a.x+c.x)/2-r.left,y:(a.y+c.y)/2-r.top}};return}
   if(penSeen||ptrs.size>2)return}
  if(cur)return;ev.preventDefault();try{st.setPointerCapture(ev.pointerId)}catch(_){}
  cur={id:ev.pointerId,touch:ev.pointerType=='touch',s:{k:e.tool,c:COL[e.col],w:bw(e.tool),pts:[pt(ev)]}};PM.ed.strokes.push(cur.s);if(e.tool=='pen')drawStroke(ictx,cur.s);else redraw()});
 st.addEventListener('pointermove',ev=>{if(ev.pointerType=='touch'&&ptrs.has(ev.pointerId)){ptrs.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});
   if(pin&&ptrs.size>=2){const r=st.getBoundingClientRect(),[a,c]=[...ptrs.values()];const s=Math.min(6,Math.max(1,pin.s0*Math.hypot(a.x-c.x,a.y-c.y)/pin.d0)),m={x:(a.x+c.x)/2-r.left,y:(a.y+c.y)/2-r.top};const px=(pin.m0.x-pin.x0)/pin.s0,py=(pin.m0.y-pin.y0)/pin.s0;Z.s=s;Z.x=m.x-px*s;Z.y=m.y-py*s;if(s==1){Z.x=0;Z.y=0}applyZ();return}}
  if(!cur||ev.pointerId!=cur.id)return;ev.preventDefault();const evs=ev.getCoalescedEvents?ev.getCoalescedEvents():[ev];const p=cur.s.pts;
  (evs.length?evs:[ev]).forEach(x=>{const q=pt(x);if(cur.s.k=='pen'){p.push(q);const n=p.length;drawStroke(ictx,{k:'pen',c:cur.s.c,w:cur.s.w,pts:[p[n-2],p[n-1]]})}else p.push(q)});if(cur.s.k!='pen')redraw()});
 const up=ev=>{if(ev.pointerType=='touch'){ptrs.delete(ev.pointerId);if(ptrs.size<2)pin=null}if(cur&&ev.pointerId==cur.id){cur=null;if(PM.ed.strokes.length)PM.ed.dirty=1}};
 st.addEventListener('pointerup',up);st.addEventListener('pointercancel',up);st.addEventListener('pointerleave',ev=>{if(ev.pointerType!='touch')up(ev)});
 st.addEventListener('contextmenu',ev=>ev.preventDefault())}
function shrink(file,max){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),img=new Image();img.onload=()=>{const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>b?res({b,c}):rej('blob'),'image/jpeg',.82)};img.onerror=()=>{URL.revokeObjectURL(u);rej('img')};img.src=u})}
const blobImg=b=>new Promise((res,rej)=>{const u=URL.createObjectURL(b),i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=u});
function thumb(){return new Promise(res=>{const e=PM.ed,W=Math.min(480,e.img.width),s=W/e.img.width,c=document.createElement('canvas');c.width=W;c.height=Math.round(e.img.height*s);const x=c.getContext('2d');x.drawImage(e.img,0,0,c.width,c.height);if(ink)x.drawImage(ink,0,0,c.width,c.height);c.toBlob(b=>res(b),'image/jpeg',.78)})}
const toast=t=>{if(G.HG&&G.HG.toast)G.HG.toast(t);else{const d=document.createElement('div');d.textContent=t;d.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#2b2350;color:#fff;padding:10px 16px;border-radius:999px;z-index:99;font-size:14px';document.body.appendChild(d);setTimeout(()=>d.remove(),1800)}};
const rr=()=>{G.render();scrollTo(0,0)};
G.PM={
 f(k,v){flt[k]=v;G.render()},
 open(){view='note';noteType='pm';PM.ed=null;rr()},
 add(){PM.ed={id:null,img:null,blob:null,strokes:[],sub:'국어',tags:'',memo:'',gpt:'',chk:true,tool:'pen',col:0};Z={s:1,x:0,y:0};penSeen=false;rr()},
 async edit(id){const m=L.find(x=>x.id==id);if(!m)return;let img=null;try{img=await blobImg(m.photo)}catch(e){alert('사진을 불러오지 못했어요 😢');return}
  PM.ed={id:m.id,t:m.t,img,blob:m.photo,strokes:JSON.parse(JSON.stringify(m.strokes||[])),sub:m.sub,tags:m.tags||'',memo:m.memo||'',gpt:m.gpt||'',chk:!!m.chk,tool:'pen',col:0};Z={s:1,x:0,y:0};penSeen=false;rr()},
 async pick(inp){const f=inp.files&&inp.files[0];if(!f)return;try{const {b}=await shrink(f,1600);PM.ed.blob=b;PM.ed.img=await blobImg(b);PM.ed.strokes=[];Z={s:1,x:0,y:0};G.render()}catch(e){alert('이 사진은 열 수 없어요 😢 다른 사진으로 해 볼까?')}},
 tool(t,c){PM.ed.tool=t;if(c!=null)PM.ed.col=c;document.querySelectorAll('.pm-tool button').forEach(b=>b.classList.remove('on'));const bs=[...document.querySelectorAll('.pm-tool button')];(t=='pen'?bs[c||0]:t=='hl'?bs[3]:bs[4]).classList.add('on')},
 undo(){if(PM.ed&&PM.ed.strokes.length){PM.ed.strokes.pop();redraw()}},
 fit(){Z={s:1,x:0,y:0};applyZ()},
 v(k,val){if(PM.ed)PM.ed[k]=val},
 async save(){const e=PM.ed;if(!e.img){alert('사진을 먼저 넣어 줘! 📷');return}
  try{db=db||await open();const th=await thumb();const m={id:e.id||('pm'+Date.now().toString(36)+Math.random().toString(36).slice(2,5)),t:e.t||Date.now(),u:Date.now(),sub:e.sub,tags:e.tags.trim(),memo:e.memo,gpt:e.gpt,chk:!!e.chk,photo:e.blob,strokes:e.strokes,thumb:th};
   await tx('readwrite',s=>s.put(m));const i=L.findIndex(x=>x.id==m.id);if(i>=0)L[i]=m;else L.unshift(m);if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{});
   PM.ed=null;toast('사진 메모 저장 완료! 📸✨');rr()}catch(err){alert('저장하지 못했어요 😢 저장 공간을 확인해 줘.')}},
 close(){if(PM.ed&&PM.ed.strokes.length&&PM.ed.dirty&&!confirm('저장하지 않고 닫을까요?'))return;PM.ed=null;rr()},
 async del(){const e=PM.ed;if(!e||!e.id||!confirm('이 사진 메모를 지울까요?'))return;await tx('readwrite',s=>s.delete(e.id));L=L.filter(x=>x.id!=e.id);PM.ed=null;rr()},
 async chk(id){const m=L.find(x=>x.id==id);if(!m)return;m.chk=!m.chk;try{await tx('readwrite',s=>s.put(m))}catch(e){}G.render()},
 count:()=>({all:L.length,chk:L.filter(m=>m.chk).length})
};
const PMo=G.PM;Object.defineProperty(PMo,'ed',{get:()=>PM.ed,set:v=>{PM.ed=v}});
/* ---------- 오답노트 통합 ---------- */
const _note=G.note;
G.note=function(){if(noteType=='pm')return PM.ed?edView():list();
 return _note.apply(this,arguments).replace(/(<option value="ox"[^>]*>OX<\/option>)/,'$1<option value="pm">📸 사진 메모</option>')};
const _r=G.render;G.render=function(){_r.apply(this,arguments);if(view=='note'&&noteType=='pm'&&PM.ed&&PM.ed.img)init();else{ink=null;ictx=null}};
load();
})();
