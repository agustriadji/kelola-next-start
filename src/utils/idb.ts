import { IDB_NAME, IDB_STORE } from "@/constants/storage"

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: "name" })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => {
      const reason =
        request.error instanceof Error
          ? request.error
          : new Error(String(request.error))
      reject(reason)
    }
  })
}

export async function setToDB(name: string, data: unknown): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite")
    const store = tx.objectStore(IDB_STORE)
    store.put({ name, data })

    tx.oncomplete = () => resolve()
    tx.onerror = () =>
      reject(tx.error instanceof Error ? tx.error : new Error(String(tx.error)))
    tx.onabort = () =>
      reject(tx.error instanceof Error ? tx.error : new Error(String(tx.error)))
  })
}

export async function getFromDB<T = unknown>(name: string): Promise<T | null> {
  const db = await openDB()
  return new Promise((resolve) => {
    const tx = db.transaction(IDB_STORE, "readonly")
    const store = tx.objectStore(IDB_STORE)
    const req = store.get(name)
    req.onsuccess = () => resolve(req.result?.data ?? null)
    req.onerror = () => resolve(null)
  })
}

export async function removeFromDB(name: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite")
    const store = tx.objectStore(IDB_STORE)
    store.delete(name)

    tx.oncomplete = () => resolve()
    tx.onerror = () =>
      reject(tx.error instanceof Error ? tx.error : new Error(String(tx.error)))
    tx.onabort = () =>
      reject(tx.error instanceof Error ? tx.error : new Error(String(tx.error)))
  })
}
