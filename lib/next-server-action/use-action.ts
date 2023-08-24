import { useTransition } from 'react'
import { Callback } from './types'

export function useAction<A extends Callback>(action: A) {
  const [isPending, startTransition] = useTransition()

  async function run(...args: Parameters<A>) {
    let promise: Promise<any>
    startTransition(() => {
      promise = action(...args)
      return promise
    })
    await promise!
  }

  return { run, isPending }
}
