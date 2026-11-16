const C="ascend-v9";
const FILES=["./","index.html","vision_bundle.mjs","model.wasm","wasm/vision_wasm_internal.js","wasm/vision_wasm_internal.wasm","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET") return;
  const put=res=>{ if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));} return res; };
  if (e.request.mode==="navigate") { e.respondWith(fetch(e.request).then(put).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html")))); return; }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(put))); });
