import Form from './form-components/Form'
import FormInput from './form-components/FormInput'
import { SubmitHandler } from 'react-hook-form'
import FormSubmitButton from './form-components/SubmitButton'
import { z } from 'zod'
import EyeIcon from '../icons/EyeIcon'
import { useState } from 'react'
import EyeSlashIcon from '../icons/EyeSlashIcon'
import { useZodForm } from '../../lib/zod/zod'
import { registerSchema } from '../../lib/schema/signInSchema'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../lib/toast'

type SignupFormSchemaType = z.infer<typeof registerSchema>

const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  const form = useZodForm({
    schema: registerSchema,
  })

  const handleSubmit: SubmitHandler<SignupFormSchemaType> = async (data) => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseObject = await res.json()

      if (!res.ok) {
        notify(responseObject.message, 'failure')
      } else {
        if (res.ok) notify(responseObject.message, 'success')

        navigate('/login')
      }
    } catch (err) {
      notify(JSON.stringify(err), 'failure')
    }

    setLoading(false)
  }

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput
          label="Email"
          placeholder="johndoe@email.com"
          required
          type="text"
          {...form.register('email')}
        />

        <div className="relative">
          <FormInput
            label="Password"
            required
            type={showPassword ? 'text' : 'password'}
            {...form.register('password')}
          />

          <div
            className="absolute right-3 top-[45px] -translate-y-1/2 transform cursor-pointer bg-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon height={20} width={20} />
            ) : (
              <EyeSlashIcon height={20} width={20} />
            )}
          </div>
        </div>

        <div className="relative">
          <FormInput
            label="Confirm password"
            required
            type={showPassword ? 'text' : 'password'}
            {...form.register('confirmPassword')}
          />

          <div
            className="absolute right-3 top-[45px] -translate-y-1/2 transform cursor-pointer bg-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon height={20} width={20} />
            ) : (
              <EyeSlashIcon height={20} width={20} />
            )}
          </div>
        </div>

        <FormSubmitButton className="h-10 w-full text-lg" loading={loading}>
          Signup
        </FormSubmitButton>
      </div>
    </Form>
  )
}

export default SignupForm
