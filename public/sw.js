const VERSION='sunroom-v1';
const SHELL_CACHE=`${VERSION}-shell`;
const CONTENT_CACHE=`${VERSION}-content`;
const FALLBACKS=['/','/index.html','/manifest.webmanifest','/sun.svg'];

async function cacheAppShell(){
 const cache=await caches.open(SHELL_CACHE);
 await cache.addAll(FALLBACKS);

 // Discover Vite's fingerprinted production assets from the built page.
 const page=await fetch('/index.html',{cache:'no-store'});
 const html=await page.text();
 const urls=[...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
  .map(match=>new URL(match[1],self.location.origin))
  .filter(url=>url.origin===self.location.origin)
  .map(url=>url.pathname);
 await Promise.allSettled([...new Set(urls)].map(url=>cache.add(url)));
}

self.addEventListener('install',event=>{
 event.waitUntil(cacheAppShell().then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keep=new Set([SHELL_CACHE,CONTENT_CACHE]);
  await Promise.all((await caches.keys()).filter(key=>!keep.has(key)).map(key=>caches.delete(key)));
  await self.clients.claim();
 })());
});

async function navigationResponse(request){
 try{
  const response=await fetch(request);
  if(response.ok)(await caches.open(SHELL_CACHE)).put('/index.html',response.clone());
  return response;
 }catch{
  return (await caches.match('/index.html')) || (await caches.match('/'));
 }
}

async function cachedAsset(request){
 const cached=await caches.match(request,{ignoreSearch:true});
 if(cached)return cached;
 try{
  const response=await fetch(request);
  if(response.ok&&response.type==='basic'){
   const cache=await caches.open(CONTENT_CACHE);
   cache.put(request,response.clone());
  }
  return response;
 }catch{
  return new Response('This resource has not been saved for offline use yet.',{
   status:503,
   headers:{'Content-Type':'text/plain; charset=utf-8'}
  });
 }
}

self.addEventListener('fetch',event=>{
 const {request}=event;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;
 if(request.mode==='navigate')event.respondWith(navigationResponse(request));
 else event.respondWith(cachedAsset(request));
});
