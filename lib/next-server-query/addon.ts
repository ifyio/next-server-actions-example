import { Action } from './types'
// TODO: Sort out the typing for this
export type Config = { [key: string]: any }

export const SKIP = Symbol('SKIP')
export const CONTINUE = Symbol('CONTINUE')
export const TERMINATE = Symbol('TERMINATE')

export type ActionResult = {
  status: typeof TERMINATE | typeof SKIP | typeof CONTINUE
  result?: any
}

export interface AddonArgs {
  action: Action
  config: Config
}

export type Addon = (args: AddonArgs) => Action

export interface CreateDecoratedFunctionArgs {
  addons: Addon[]
  action: Action
  config: Config
}

export function createActionWithAddons(
  args: CreateDecoratedFunctionArgs
): Action {
  // If no decorators are provided, return the original action function
  if (args.addons.length === 0) {
    return args.action
  }

  return args.addons.reduce((decoratedAction, decorator) => {
    return async (...callArgs: any[]) => {
      const result = await decorator({
        action: decoratedAction,
        config: args.config,
      })(...callArgs)

      // Check if the decorator returned an object with a status field
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

      // Fallback for decorators that don't return an object with a status field
      return result
    }
  }, args.action)
}
