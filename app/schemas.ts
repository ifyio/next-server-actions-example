import { z } from 'zod'

export type ClearTodoArgs = z.infer<typeof ClearTodoArgsSchema>

export const ClearTodoArgsSchema = z.object({
  id: z.string(),
  isDone: z.boolean(),
})
