import { useEffect } from "react"
import TodoTitle from "./TodoTitle"

function Todo({title, completed}: TodoProps) {
  useEffect(() => {

  })

  return (
    <div>
      <TodoTitle title={title} completed={completed}></TodoTitle>
    </div>
  )
}

export default Todo