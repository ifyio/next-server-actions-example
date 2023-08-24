import tw from 'tailwind-styled-components'
import { use } from 'react'
import { getTodos } from '../actions'

const H1 = tw.h1`text-6xl`

export function TodoHeaderText() {
  const todos = use(getTodos())

  return <H1>Todos ({todos.length})</H1>
}
