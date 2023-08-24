import { revalidateTag } from 'next/cache'
import { Callback, QueryFn, Unpromisify } from './types'

type ActionConfig<A extends Callback> = {
  action: A
  invalidates?: QueryFn<Callback>
}

export function mutation<A extends Callback>({
  action,
  invalidates,
}: ActionConfig<A>) {
  return async (...args: Parameters<A>) => {
    type Result = Unpromisify<ReturnType<A>>
    const result = await action(...args)
    if (invalidates) revalidateTag(invalidates.tag)
    return result as Result
  }
}
