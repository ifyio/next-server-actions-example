import 'server-only'

import { HandleError } from './addons/handle-error'
import { revalidateTag } from 'next/cache'
import { Addon, createActionWithAddons } from './addon'
import { Action, Callback, QueryFn, Unpromisify } from './types'

type MutationConfig<A extends Action> = {
  invalidates?: QueryFn<Callback>
  addons?: Addon[]
  throw?: boolean
  action: A
}

export function mutation<A extends Callback>(config: MutationConfig<A>) {
  type Result = Unpromisify<ReturnType<A>>
  const { addons = [], invalidates, action } = config
  return async (...args: Parameters<A>) => {
    const $action = createActionWithAddons({
      addons: [...addons, HandleError],
      action,
    })
    const result = await $action(...args)
    if (invalidates) revalidateTag(invalidates.tag)
    return result as Result
  }
}
