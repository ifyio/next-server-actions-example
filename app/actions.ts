'use server'

import { query } from '@/lib/next-server-action/query'
import { mutation } from '@/lib/next-server-action/mutation'
import { revalidate } from '@/lib/next-server-action/revalidate'
import { todoService } from './services'

export const getTodos = query({
  tag: 'todos',
  action: () => {
    return todoService.getTodos()
  },
})

export const addTodo = mutation({
  action: async (title: string) => {
    await todoService.addTodo(title)
    revalidate(getTodos)
  },
})

export const deleteTodo = mutation({
  action: async (id: string) => {
    await todoService.deleteTodo(id)
    revalidate(getTodos)
  },
})

export type ClearTodoArgs = {
  id: string
  isDone: boolean
}

export const clearTodo = mutation({
  action: async (args: ClearTodoArgs) => {
    await todoService.clearTodo(args)
    revalidate(getTodos)
  },
})
