import { ChangeEvent, useEffect, useState } from "react"
import { openDatabase } from "../indexedDB/indexed"

/**
 * 
 * Todoのチェックボックス。Todoが完了したらチェックボックスをチェックする。
 * 
 * @returns Todoのチェックボックス
 * 
 */
function TodoCheckbox(todoTitle: string) {
  const [checked, setChecked] = useState<boolean>(false)
  const dbName = 'todos'

  useEffect(() => {
    const updateTodoCompleted = async () => {
      const db = await openDatabase()
      const transaction = db.transaction(dbName, 'readwrite')
      const objectStore = transaction.objectStore(dbName)
      const index = objectStore.index('todoTitle')
      const request = index.get(todoTitle)

      request.onsuccess = () => {
        const record = request.result

        if(record) {
          record.completed = checked
          const update = objectStore.put(record)

          update.onsuccess = () => {
            if(checked) {
              console.log('Todoが完了しました。')
            } else {
              console.log('Todoの完了を取り消しました。')
            }
          }

          update.onerror = () => {
            console.error('Todoの完了後進が失敗しました。', update.error)
          }
        } else {
          console.warn('指定されたレコードはありません。')
        }
      }

      request.onerror = () => {
        console.error('後進が失敗しました。', request.error)
      }

      transaction.onerror = () => {
        console.error('トランザクションが失敗しました。', transaction.error)
      }
    }

    updateTodoCompleted()
  }, [checked])
  
  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <input type="checkbox" checked={checked} onChange={handleCheckbox}></input>
  )
}

export default TodoCheckbox