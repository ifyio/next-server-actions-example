import { use } from 'react'
import { getTodos } from '../actions'
import { TodoItem } from './todo-item'

export function TodoList() {
  const todos = use(getTodos())

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  )
}
