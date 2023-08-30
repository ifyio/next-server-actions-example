'use server'

import { todoService } from './services'
import { revalidateTag } from 'next/cache'
import { query, mutator } from 'next-server-query'
import { ensureArgsMatch } from './addons/ensure-args-match'
import { ClearTodoArgs, ClearTodoArgsSchema } from './schemas'

export const getTodos = query({
  tags: ['todos'],
  action: () => {
    return todoService.getTodos()
  },
})

export const addTodo = mutator({
  action: async (title: string) => {
    await todoService.addTodo(title)
    revalidateTag('todos')
  },
})

export const deleteTodo = mutator({
  action: async (id: string) => {
    await todoService.deleteTodo(id)
    revalidateTag('todos')
  },
})

export const clearTodo = mutator({
  '@': [ensureArgsMatch(ClearTodoArgsSchema)],
  action: async (args: ClearTodoArgs) => {
    await todoService.clearTodo(args)
    revalidateTag('todos')
  },
})
