import { useEffect, useState } from 'react';
import { createContext } from 'vm';
import './App.css';
import Todo from './components/Todo';

/// コンテキスト使う DBもコンテキストに入れれば便利
export const DBcontext = createContext()

function App() {
  const dbName = 'MyDB'
  const objectStoreName = 'todos'
  const [db, setDb] = useState<IDBDatabase | null>(null)

  useEffect(() => {
    const openRequest: IDBOpenDBRequest = indexedDB.open(dbName, 1)

    openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event?.target as IDBOpenDBRequest).result

      if(!db.objectStoreNames.contains(objectStoreName)) {
        db.createObjectStore(objectStoreName, {keyPath: 'id', autoIncrement: true})
      }
    }

    openRequest.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result
      setDb(db)
    }
  }, [db])

  return (
    <DBcontext.Provider value={db}>
      <Todo></Todo>
    </DBcontext.Provider>
  );
}

export default App;
