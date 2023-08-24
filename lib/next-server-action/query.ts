import { unstable_cache } from 'next/cache'
import { Callback, QueryFn, Unpromisify } from './types'

type CacheOptions = NonNullable<Parameters<typeof unstable_cache>[2]>

type QueryConfig<T extends Callback> = {
  action: T
  tag: string
  tags?: string[]
  revalidate?: CacheOptions['revalidate']
}

export function query<T extends Callback>({
  tag,
  tags,
  action,
  revalidate,
}: QueryConfig<T>) {
  type R = Unpromisify<ReturnType<T>>
  const queryFn: QueryFn<T> = (...args: Parameters<T>) => {
    return unstable_cache<Callback<R>>(action, undefined, {
      tags: [tag, ...(tags || [])],
      revalidate,
    })(...args)
  }

  queryFn.tag = tag

  return queryFn
}
