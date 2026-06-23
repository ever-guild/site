const BUILD_STORAGE_KEY = 'ever-guild:build-id'

function getStorage(name: 'localStorage' | 'sessionStorage') {
  try {
    return window[name]
  } catch {
    return null
  }
}

function hasStorage(storage: Storage) {
  try {
    const testKey = 'ever-guild:storage-test'
    storage.setItem(testKey, '1')
    storage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

async function clearCacheStorage() {
  if (!('caches' in window)) return

  const keys = await caches.keys()
  await Promise.all(keys.map((key) => caches.delete(key)))
}

async function unregisterServiceWorkers() {
  if (!('serviceWorker' in navigator)) return []

  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(registrations.map((registration) => registration.unregister()))

  return registrations
}

async function clearIndexedDB() {
  if (!('indexedDB' in window) || typeof indexedDB.databases !== 'function') return

  const databases = await indexedDB.databases()
  await Promise.all(
    databases
      .map((database) => database.name)
      .filter((name): name is string => Boolean(name))
      .map(
        (name) =>
          new Promise<void>((resolve) => {
            const request = indexedDB.deleteDatabase(name)
            request.addEventListener('success', () => resolve(), { once: true })
            request.addEventListener('error', () => resolve(), { once: true })
            request.addEventListener('blocked', () => resolve(), { once: true })
          }),
      ),
  )
}

export async function resetBrowserCache(buildId: string) {
  if (typeof window === 'undefined') return

  const local = getStorage('localStorage')
  const session = getStorage('sessionStorage')
  const canUseLocalStorage = Boolean(local && hasStorage(local))
  const canUseSessionStorage = Boolean(session && hasStorage(session))
  const previousBuildId = canUseLocalStorage && local ? local.getItem(BUILD_STORAGE_KEY) : null
  const buildChanged = previousBuildId !== buildId

  const hadController = Boolean(navigator.serviceWorker?.controller)
  const registrations = await unregisterServiceWorkers()

  if (buildChanged || registrations.length > 0) {
    await Promise.all([clearCacheStorage(), clearIndexedDB()])

    if (buildChanged) {
      if (canUseLocalStorage && local) {
        local.clear()
        local.setItem(BUILD_STORAGE_KEY, buildId)
      }

      if (canUseSessionStorage && session) {
        session.clear()
      }
    }
  }

  if ((hadController || registrations.length > 0) && canUseSessionStorage && session) {
    const reloadKey = `ever-guild:cache-reset-reloaded:${buildId}`

    if (session.getItem(reloadKey) !== '1') {
      session.setItem(reloadKey, '1')
      window.location.reload()
    }
  }
}
