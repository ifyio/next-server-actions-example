import { revalidateTag } from 'next/cache'
import { QueryFn } from './types'

export function revalidate(queryFn: QueryFn) {
  return revalidateTag(queryFn.tag)
}
