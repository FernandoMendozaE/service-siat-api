import { z } from 'zod'

export const GetOrDeleteUserSchema = z.object({
  params: z.object({
    id: z.string().nonempty().length(24, { message: 'Invalid id' })
  })
})

export const UpdateUserSchema = z.object({
  body: z
    .object({
      username: z.string().min(3).max(20).optional(),
      firstname: z.string().min(3).max(50).optional(),
      lastname: z.string().min(3).max(50).optional(),
      email: z.string().email('Writte a correct email').optional(),
      password: z.string().min(6, 'Password too short').optional(),
      roles: z.enum(['user', 'moderator', 'admin']).array().min(1).optional()
    })
    .strict(),
  params: z.object({
    id: z.string().nonempty().length(24, { message: 'Invalid id' })
  })
})

export type GetOrDeleteUserParamsType = z.infer<typeof GetOrDeleteUserSchema>['params']

export type UpdateUserBodyType = z.infer<typeof UpdateUserSchema>['body']
export type UpdateUserParamsType = z.infer<typeof UpdateUserSchema>['params']
