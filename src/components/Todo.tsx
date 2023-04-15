import { useEffect } from "react"
import TodoCheckbox from "./TodoCheckbox"
import TodoTitle from "./TodoTitle"

function Todo({title, completed}: TodoProps) {
  useEffect(() => {

  })

  return (
    <div>
      <TodoTitle title={title} completed={completed}></TodoTitle>
      <TodoCheckbox todoTitle={title}></TodoCheckbox>
    </div>
  )
}

export default Todo