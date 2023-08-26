import { Addon } from '@/lib/next-server-query/addon'
import { ActionError } from '@/lib/next-server-query/action-error'
import { ZodError, ZodSchema } from 'zod'

export function ArgsMatch(schema: ZodSchema) {
  const addon: Addon = {
    execute: ({ action }) => {
      return async (...args: any[]) => {
        try {
          schema.parse(args[0])
          return await action(...args)
        } catch (error) {
          if (error instanceof ZodError) {
            throw new ActionError({
              message: 'The supplied args are invalid',
              type: 'validation',
              data: error.issues,
            })
          }
        }
      }
    },
  }
  return addon
}
