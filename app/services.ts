import 'server-only'
import axios from 'axios'
import { Todo } from './types'

const client = axios.create({
  baseURL: 'https://64cfe63affcda80aff52469d.mockapi.io/api/v1/',
})

export const todoService = {
  getTodos: async () => {
    const { data } = await client.get<Todo[]>('todos')
    return data
  },
  addTodo: (title: string) => {
    return client.post('todos', { title, isDone: false })
  },
  deleteTodo: (id: string) => {
    return client.delete(`todos/${id}`)
  },
  clearTodo: ({ id, isDone }: { id: string; isDone: boolean }) => {
    return client.put(`todos/${id}`, { id, isDone })
  },
}
