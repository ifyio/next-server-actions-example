import { ActionErrorResponse } from './action-error'

export type Unpromisify<T> = T extends Promise<infer R> ? R : T
export type Callback<R = any> = (...args: any[]) => Promise<R>

export type QueryFn<C extends Callback = Callback> = {
  // NOTE: The return type is redundant but needs to be this way for now for the
  // type of QueryFn to be inferred correctly.
  (...args: Parameters<C>): Promise<Unpromisify<ReturnType<C>>>
  // (...args: Parameters<C>): ReturnType<C>
  tag: string
}

export type ActionResponse = any | ActionErrorResponse

export type Action<R extends ActionResponse = ActionResponse> = (
  ...args: any[]
) => Promise<R>
