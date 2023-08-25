import { Action } from './types'

export type Decorator = (action: Action) => Action

export function createDecoratedFunction(
  decorators: Decorator[],
  action: Action
): Action {
  return decorators.reduce((decoratedAction, decorator) => {
    return decorator(decoratedAction)
  }, action)
}
