const CACHE_PREFIX='michishirube-beta-';
const CACHE='michishirube-beta-v09-reflection-submit';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./stability-v09.js'];

function enhanceHtml(text){
  if(text.includes('stability-v09.js')) return text;
  return text.replace('<script>','<script src="./stability-v09.js"></script><script>');
}
async function enhancedResponse(res){
  const text=enhanceHtml(await res.text());
  const headers=new Headers(res.headers);
  headers.set('content-type','text/html; charset=utf-8');
  return new Response(text,{status:res.status,statusText:res.statusText,headers});
}

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const res=await fetch(event.request,{cache:'no-store'});
        const enhanced=await enhancedResponse(res);
        const cache=await caches.open(CACHE);
        await cache.put('./index.html',enhanced.clone());
        return enhanced;
      }catch{
        const hit=await caches.match('./index.html');
        if(hit) return enhancedResponse(hit.clone());
        return caches.match('./');
      }
    })());
    return;
  }

  if(url.pathname.includes('/michishirube-beta/')){
    event.respondWith(
      caches.match(event.request).then(hit=>{
        const network=fetch(event.request).then(res=>{
          if(res&&res.ok){
            const copy=res.clone();
            caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
          }
          return res;
        });
        return hit||network;
      })
    );
  }
});
