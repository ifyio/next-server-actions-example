'use client'

import tw from 'tailwind-styled-components'
import { addTodo } from '../actions'
import { Spinner } from './ui/spinner'
import { useState } from 'react'
import { useAction } from '@/lib/next-server-query/use-action'
import { Input as NInput } from './ui/input'
import { FormSubmitEvent } from '../types'

const Form = tw.form`
  flex
  gap-4
  relative
`

const Input = tw(NInput)`
  border-gray-300
  dark:border-white
  dark:border-opacity-20
  placeholder-gray-100
  placeholder:opacity-30
  text-lg
  h-[100px]
  px-9
`

const SpinnerContainer = tw.div`
  absolute
  top-0
  right-9
  bottom-0
  left-0
  flex
  items-center
  justify-end
  opacity-40
`

export function TodoForm() {
  const [todoText, setTodoText] = useState('')
  const addTodoAction = useAction(addTodo)

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault()
    await addTodoAction.run(todoText)
    setTodoText('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={todoText}
        onChange={(event) => setTodoText(event.target.value)}
        disabled={addTodoAction.isPending}
        placeholder="Add a task"
      />
      {addTodoAction.isPending && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </Form>
  )
}
