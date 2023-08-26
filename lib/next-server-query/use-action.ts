import { isActionError } from './action-error'
import { Callback } from './types'
import { useState, useTransition } from 'react'

export function useAction<A extends Callback>(action: A) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<unknown | null>(null)

  async function run(...args: Parameters<A>) {
    let promise: Promise<any>
    startTransition(() => {
      promise = action(...args)
      return promise
        .then((result) => {
          if (isActionError(result)) {
            throw result
          }
          return result
        })
        .catch((error) => {
          setError(error)
        })
    })
    await promise!
  }

  return { run, isPending, error }
}
