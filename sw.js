/* 별 수가르기 — 오프라인 캐싱 + 자동 업데이트 서비스워커 */
/* HTML은 '네트워크 우선'이라 내용을 고쳐 배포하면 다음 실행 때 자동 반영됩니다.
   아래 버전 숫자는 sw.js 자체나 ASSETS 목록을 바꿀 때만 올리면 됩니다. */
const CACHE = "byeolsugarugi-v9";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const req = e.request;
  const isHTML = req.mode === "navigation" || (req.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    // 화면(HTML)은 네트워크 우선: 온라인이면 항상 최신, 실패(오프라인)하면 캐시
    e.respondWith(
      fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put("./index.html", copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // 그 외(아이콘·매니페스트 등)는 캐시 우선
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return resp;
      }).catch(() => cached);
    })
  );
});
