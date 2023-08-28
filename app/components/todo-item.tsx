'use client'

import tw from 'tailwind-styled-components'
import { Todo } from '../types'
import { Spinner } from './ui/spinner'
import { Checkbox } from './ui/checkbox'
import { HTMLProps } from 'react'
import { clearTodo } from '../actions'
import { useAction } from 'next-server-query/client'
import { TodoItemDeleteButton } from './todo-item-delete-button'

type RootProps = {
  $disabled: boolean
} & HTMLProps<HTMLDivElement>

const Root = tw.div<RootProps>`
  h-[100px]
  border-b
  border-gray-300
  dark:border-white
  dark:border-opacity-20
  flex
  items-center
  space-x-4
  ${(p) => p.$disabled && 'line-through opacity-50'}
`

const Label = tw.label`
  flex-1
  text-lg
  leading-none
  peer-disabled:cursor-not-allowed
  peer-disabled:opacity-70
`

type TodoItemProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const clearTodoAction = useAction(clearTodo)
  return (
    <Root $disabled={todo.isDone}>
      {!clearTodoAction.isPending ? (
        <Checkbox
          id={todo.id}
          checked={todo.isDone}
          onCheckedChange={() => {
            clearTodoAction.run({
              id: todo.id,
              isDone: !todo.isDone,
            })
          }}
        />
      ) : (
        <Spinner />
      )}

      <Label htmlFor={todo.id}>{todo.title}</Label>
      <TodoItemDeleteButton todoId={todo.id} />
    </Root>
  )
}
