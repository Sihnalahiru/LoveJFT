const CACHE='jft-master-v16-final-release';
const CORE=['./','./index.html','./styles.css','./app.js','./data-inline.js','./manifest.json','./data/past-papers.json','./data/past-paper-evidence-bank-v2.json','./data/kanji-450-source.json','./data/source-catalog.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(k=>k.put(e.request,c)).catch(()=>{});}return r}).catch(()=>caches.match('./index.html'))));});
