import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().min(1, 'Please enter a valid email!'),
  password: z.string().min(5, 'Password must be at least 5 characters long!'),
})

export const registerSchema = z
  .object({
    email: z.string().email().min(5, 'Please enter a valid email!'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine(
        (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
        'Password must contain at least one special character!'
      )
      .refine(
        (val) => /[a-zA-Z]/.test(val),
        'Password must contain at least one letter!'
      )
      .refine(
        (val) => /[0-9]/.test(val),
        'Password must contain at least one number!'
      ),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password did not match!',
        path: ['confirmPassword'],
      })
    }
  })
