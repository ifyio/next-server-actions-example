'use server'

import { query } from '@/lib/next-server-query/query'
import { mutation } from '@/lib/next-server-query/mutation'
import { ArgsMatch } from './addons/args-match'
import { revalidate } from '@/lib/next-server-query/revalidate'
import { todoService } from './services'
import { ClearTodoArgs, ClearTodoArgsSchema } from './schemas'

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

export const clearTodo = mutation({
  addons: [ArgsMatch(ClearTodoArgsSchema)],
  action: async (args: ClearTodoArgs) => {
    await todoService.clearTodo(args)
    revalidate(getTodos)
  },
})
