(()=>{
'use strict';
const KEY='michishirube-mobile-v07';
const RECOVERY='michishirube-mobile-recovery-v08';
const HISTORY='michishirube-reflection-history-v08';
const DB='michishirube-stability-v08',STORE='kv',DB_STATE='state',DB_RECOVERY='recovery',DB_HISTORY='reflection-history';
const rawGet=Storage.prototype.getItem,rawSet=Storage.prototype.setItem;
let db=null,mirrorEnabled=false,writeQueue=Promise.resolve();

function safeParse(v){try{return v?JSON.parse(v):null}catch{return null}}
function validState(v){const s=typeof v==='string'?safeParse(v):v;return !!(s&&typeof s==='object'&&(Array.isArray(s.tasks)||Array.isArray(s.inbox)||s.goal))}
function openDB(){return new Promise((resolve,reject)=>{if(!('indexedDB'in window))return reject(new Error('IndexedDB unavailable'));const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE)};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function getDB(k){return new Promise((resolve,reject)=>{if(!db)return resolve(null);const r=db.transaction(STORE,'readonly').objectStore(STORE).get(k);r.onsuccess=()=>resolve(r.result??null);r.onerror=()=>reject(r.error)})}
function putDB(k,v){if(!db)return Promise.resolve();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(v,k);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}
function setStatus(text,error=false){let el=document.querySelector('#stabilityState');if(!el){const v=document.querySelector('.version');if(!v)return;v.textContent='v0.8';el=document.createElement('div');el.id='stabilityState';el.style.cssText='font-size:9px;color:#707571;margin-top:2px';v.parentNode.appendChild(el)}el.textContent=text;el.style.color=error?'#9a4545':'#707571'}
function queueMirror(value){if(!mirrorEnabled||!db)return;writeQueue=writeQueue.catch(()=>{}).then(()=>putDB(DB_STATE,value)).then(()=>setStatus('保存済み')).catch(()=>setStatus('予備保存のみ',true))}
Storage.prototype.setItem=function(k,v){
  const result=rawSet.call(this,k,v);
  if(this===localStorage&&k===KEY){
    setStatus('保存中');
    queueMirror(v);
  }
  return result;
};
function currentRaw(){return rawGet.call(localStorage,KEY)}
function recoverySnapshot(){const v=currentRaw();if(!validState(v))return;try{rawSet.call(localStorage,RECOVERY,v)}catch{};if(db)putDB(DB_RECOVERY,v).catch(()=>{})}
function todayLocal(){const d=new Date(),p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`}
function saveHistory(){
  const state=safeParse(currentRaw());if(!state)return;
  const r=state.reflection;if(!r||r.date!==todayLocal())return;
  let hist=safeParse(rawGet.call(localStorage,HISTORY));if(!Array.isArray(hist))hist=[];
  const row={date:r.date,mood:r.mood||'',note:String(r.note||'').slice(0,5000),updatedAt:Date.now()};
  const i=hist.findIndex(x=>x&&x.date===row.date);if(i>=0)hist[i]=row;else hist.push(row);hist=hist.filter(Boolean).slice(-365);
  try{rawSet.call(localStorage,HISTORY,JSON.stringify(hist))}catch{}
  if(db)putDB(DB_HISTORY,hist).catch(()=>{});
}
function download(data,name){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function addTools(){
  const version=document.querySelector('.version');if(version)version.textContent='v0.8';
  setStatus(db?'二重保存':'予備保存');
  const backup=document.querySelector('#backupBtn');if(backup&&!document.querySelector('#stableBackup')){
    const b=document.createElement('button');b.id='stableBackup';b.className='btn primary';b.textContent='完全バックアップ';
    b.onclick=()=>{const state=safeParse(currentRaw()),history=safeParse(rawGet.call(localStorage,HISTORY))||[];download({app:'michishirube',version:'0.8',type:'stable-backup',exportedAt:new Date().toISOString(),state,reflectionHistory:history},`michishirube-stable-${todayLocal()}.json`)};
    backup.parentNode.insertBefore(b,backup);
    const r=document.createElement('button');r.id='stableRecover';r.className='btn';r.textContent='直前の状態へ戻す';r.onclick=async()=>{let v=null;try{v=await getDB(DB_RECOVERY)}catch{};if(!validState(v))v=rawGet.call(localStorage,RECOVERY);if(!validState(v))return alert('戻せる直前データはありません');if(!confirm('直前の状態へ戻しますか？'))return;rawSet.call(localStorage,KEY,typeof v==='string'?v:JSON.stringify(v));location.reload()};
    backup.parentNode.appendChild(r);
  }
  const reflectionTitle=[...document.querySelectorAll('.section-title')].find(x=>x.textContent.includes('今日の感覚'));if(reflectionTitle)reflectionTitle.textContent='今日の振り返り';
  const reflection=document.querySelector('#reflection');if(reflection){reflection.placeholder='何が良かった・大変だったか（任意）';const note=reflection.parentElement.querySelector('.status-note');if(note)note.textContent='自動保存され、今後PC版で提案方法を調整する判断材料にします。'}
  const details=[...document.querySelectorAll('details.card')].find(d=>d.textContent.includes('データ管理'));if(details&&!document.querySelector('#stableStorageInfo')){
    const p=document.createElement('p');p.id='stableStorageInfo';p.className='status-note';p.textContent=db?'保存方式：IndexedDB＋予備保存':'保存方式：予備保存（IndexedDB未使用）';details.insertBefore(p,details.querySelector('.actions'));
  }
}
document.addEventListener('click',e=>{
  const destructive=e.target.closest?.('[data-del-task],[data-del-memo],[data-done],[data-move],[data-defer],[data-convert],[data-restore-task],#saveEdit,#goalSave');
  if(destructive)recoverySnapshot();
  if(e.target.closest?.('.mood'))setTimeout(saveHistory,20);
},true);
let histTimer=null;
document.addEventListener('input',e=>{if(e.target?.id==='reflection'){clearTimeout(histTimer);histTimer=setTimeout(saveHistory,500)}},true);
addEventListener('error',()=>setStatus('動作エラー',true));
addEventListener('unhandledrejection',()=>setStatus('保存確認',true));

(async()=>{
  try{db=await openDB()}catch{db=null}
  const local=currentRaw();
  let stored=null;try{stored=await getDB(DB_STATE)}catch{}
  if(!validState(local)&&validState(stored)){
    try{rawSet.call(localStorage,KEY,typeof stored==='string'?stored:JSON.stringify(stored));sessionStorage.setItem('michishirube-restored','1');location.reload();return}catch{}
  }
  mirrorEnabled=true;
  if(validState(local)&&db)putDB(DB_STATE,local).catch(()=>{});
  let hist=safeParse(rawGet.call(localStorage,HISTORY));if(!Array.isArray(hist)){try{hist=await getDB(DB_HISTORY)}catch{};if(Array.isArray(hist))try{rawSet.call(localStorage,HISTORY,JSON.stringify(hist))}catch{}}
  try{if(navigator.storage?.persist)await navigator.storage.persist()}catch{}
  setTimeout(addTools,0);
  if(sessionStorage.getItem('michishirube-restored')){sessionStorage.removeItem('michishirube-restored');setTimeout(()=>alert('予備保存からデータを復旧しました。'),100)}
})();
})();