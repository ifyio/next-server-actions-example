import { Action } from '@/lib/next-server-query/types'
import { ActionError } from '@/lib/next-server-query/action-error'

export function HandleError(action: Action) {
  return async (...args: any[]) => {
    try {
      return await action(...args)
    } catch (error) {
      if (error instanceof ActionError) {
        return error.serialize()
      } else if (error instanceof Error) {
        return new ActionError({
          message: 'Something went wrong: ' + error.message,
          type: 'unknown',
        }).serialize()
      } else {
        return new ActionError({
          message: 'An unknown error occurred',
          type: 'unknown',
          data: error,
        }).serialize()
      }
    }
  }
}
