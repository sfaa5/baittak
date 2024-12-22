import { z } from 'zod'
 
export const SignUpFormSchema = z.object({
  username:z.string().min(4,{message:"please enter at least 4 characters"}),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Be at least 6 characters long' })
    .trim(),
phoneNumber:z.string().regex(/^\d{10,15}$/,{message:"Please enter a valid phone number (10-15 digits)"}),
})
 
export type FormState =| {
     errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
        phoneNumber?:string[]
      }
      message?: string
    }
  | undefined