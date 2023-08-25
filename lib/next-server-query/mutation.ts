import 'server-only'

import { HandleError } from './decorators/handle-error'
import { revalidateTag } from 'next/cache'
import { Decorator, createDecoratedFunction } from './decorator'
import { Action, Callback, QueryFn, Unpromisify } from './types'

type MutationConfig<A extends Action> = {
  invalidates?: QueryFn<Callback>
  decorators?: Decorator[]
  throw?: boolean
  action: A
}

export function mutation<A extends Callback>({
  action,
  invalidates,
  decorators = [],
}: MutationConfig<A>) {
  type Result = Unpromisify<ReturnType<A>>
  return async (...args: Parameters<A>) => {
    const $action = createDecoratedFunction(
      [...decorators, HandleError],
      action
    )
    const result = await $action(...args)
    if (invalidates) revalidateTag(invalidates.tag)
    return result as Result
  }
}
