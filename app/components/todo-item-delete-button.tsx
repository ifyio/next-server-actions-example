'use client'

import tw from 'tailwind-styled-components'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import { useAction } from '@/lib/next-server-query/use-action'
import { deleteTodo } from '../actions'

const CloseIcon = tw(X)`w-4 h-4`

type DeleteTodoButtonProps = {
  todoId: string
}

export function TodoItemDeleteButton({ todoId }: DeleteTodoButtonProps) {
  const deleteTodoAction = useAction(deleteTodo)

  async function handleSubmit() {
    await deleteTodoAction.run(todoId)
  }

  return (
    <Button variant="ghost" onClick={handleSubmit}>
      {deleteTodoAction.isPending ? <Spinner /> : <CloseIcon />}
    </Button>
  )
}
