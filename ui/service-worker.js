const CACHE_NAME = 'cashflow'
const DYNAMIC_CACHE_NAME = 'cashflow-dynamic'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  // '/favicon.svg',
  '/src/main.ts',
  '/cashflow.manifest.json'
]

const API_ROUTES = [
  '/api/transactions/expenses/aggregate',
  '/api/transactions/expenses/categories',
  '/api/transactions/expenses/sub-categories',
  '/api/transactions/expenses/payment-modes'
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(STATIC_ASSETS)
    })
  )
})

self.addEventListener('activate', (e) => {
  console.log('activated')
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok && API_ROUTES.some((route) => url.pathname.includes(route))) {
            const clone = res.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request.url, clone)
            })
          }

          return res
        })
        .catch((err) => {
          return caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            // Return empty data with proper structure for different endpoints
            if (url.pathname.includes('/aggregate')) {
              return new Response(JSON.stringify({ totalAmount: 0 }))
            }
            return new Response(JSON.stringify([]))
          })
        })
    )
  } else {
    e.respondWith(
      caches.match(e.request).then(
        (response) =>
          response ||
          fetch(e.request).then((fetchRes) => {
            return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(e.request.url, fetchRes.clone())
              return fetchRes
            })
          })
      )
    )
  }
})
