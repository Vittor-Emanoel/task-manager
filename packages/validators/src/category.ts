import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(2),
  color: z.hex(),
})


export type CreateCategoryInput = z.infer<typeof categorySchema>
