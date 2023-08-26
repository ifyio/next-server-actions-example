import { Action } from './types'

// export type Config = { [key: string]: any }

export const SKIP = Symbol('SKIP')
export const CONTINUE = Symbol('CONTINUE')
export const TERMINATE = Symbol('TERMINATE')

export type ActionResult = {
  status: typeof TERMINATE | typeof SKIP | typeof CONTINUE
  result?: any
}

export interface AddonArgs {
  action: Action
  // config: Config
}

export interface Addon {
  execute: (args: AddonArgs) => Action
}

export interface CreateDecoratedFunctionArgs {
  addons: Addon[]
  action: Action
  // config: Config
}

export function createActionWithAddons(
  args: CreateDecoratedFunctionArgs
): Action {
  // If no addons are provided, return the original action function
  if (args.addons.length === 0) {
    return args.action
  }

  return args.addons.reduce((decoratedAction, addon) => {
    return async (...callArgs: any[]) => {
      const result = await addon.execute({
        action: decoratedAction,
        // config: args.config,
      })(...callArgs)

      // Check if the addon returned an object with a status field
      if (result && typeof result === 'object' && 'status' in result) {
        if (result.status === TERMINATE) {
          return result.result
        }

        if (result.status === SKIP) {
          return await decoratedAction(...callArgs)
        }

        if (result.status === CONTINUE) {
          return result.result
        }
      }

      // Fallback for addons that don't return an object with a status field
      return result
    }
  }, args.action)
}
