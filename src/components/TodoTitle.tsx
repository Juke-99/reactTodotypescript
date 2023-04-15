/**
 * 
 * Todoのタイトルのコンポーネント。Todoのタスクのタイトルを表示とタスクが消化されるとタイトルの名前に打消し船を付ける。
 * TodoDeleteButtonコンポーネントによってタスクが削除される。
 * 
 * @param TodoTitleのprops
 * @returns Todoのタイトルのコンポーネント
 * 
 */
function TodoTitle({ title, completed } : TodoProps) {
  if(completed) {
    return <p><s>{title}</s></p>
  } else {
    return <p>{title}</p>
  }
}

export default TodoTitle