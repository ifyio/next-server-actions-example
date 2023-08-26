import { isActionError } from './action-error'
import { Callback } from './types'
import { useState, useTransition } from 'react'

export function useAction<A extends Callback>(action: A) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<unknown | null>(null)

  function run(...args: Parameters<A>) {
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
    return promise!
  }

  function reset() {
    setError(null)
  }

  return { run, isPending, error, reset }
}
