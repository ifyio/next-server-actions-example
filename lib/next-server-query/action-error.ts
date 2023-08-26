import { ZodIssue } from 'zod'

type ActionErrorType = 'authentication' | 'validation' | 'unknown'

export type ActionErrorResponse = {
  status: 'error'
  message: string
  type: ActionErrorType
  issues?: ZodIssue[]
  data?: unknown
}

type ActionErrorProps = {
  message: string
  type?: ActionErrorType
  issues?: ZodIssue[]
  data?: unknown
}

export class ActionError extends Error {
  type: ActionErrorType
  issues?: ZodIssue[]
  data?: unknown

  constructor(props: ActionErrorProps) {
    super(props.message)
    this.type = props.type || 'unknown'
    this.data = props.data
    this.issues = props.issues

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }

  serialize(): ActionErrorResponse {
    return {
      status: 'error',
      message: this.message,
      type: this.type,
      data: this.data,
      issues: this.issues,
    }
  }
}

export function isActionError(
  response: unknown
): response is ActionErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status' in response &&
    response['status'] === 'error'
  )
}
