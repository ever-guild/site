const CACHE_RESET_VERSION = 'ever-guild-cache-reset-2026-06-23'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.registration.unregister()

      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
      })

      await Promise.all(
        clients.map((client) => {
          if ('navigate' in client) {
            return client.navigate(client.url).catch(() => undefined)
          }

          return undefined
        }),
      )
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request))
})

void CACHE_RESET_VERSION
