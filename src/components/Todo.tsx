import { useContext, useEffect } from "react"
import TodoCheckbox from "./TodoCheckbox"
import TodoTitle from "./TodoTitle"
import { DBcontext } from "../App"

function Todo() {
  const db = useContext(DBcontext)
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