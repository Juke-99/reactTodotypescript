const dbName = 'todos'

export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyDB', 1)

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore(dbName, {keyPath: 'id', autoIncrement: true})
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => [
      reject(request.error)
    ]
  })
}

export async function addTodo(todo: any): Promise<number> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(dbName, 'readwrite')
    const store = transaction.objectStore(dbName)
    const request = store.add(todo)

    request.onsuccess = () => {
      resolve(request.result as number)
    }

    request.onerror = () => {
      reject(request.error)
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}