import type { SubmissionHandler } from 'vee-validate'
import * as yup from 'yup'
import { buildYupRules } from '~/shared/utils/validation-rules'

export const useForm = () => {
  const { t } = useI18n()
  const rules = buildYupRules(t)
  const { login, register } = useAuth()

  const showPassword = ref(false)
  const isLoading = ref(false)

  function handleEyeToggle() {
    showPassword.value = !showPassword.value
  }

  const eyeText = computed(() => (showPassword.value ? 'EyeOff' : 'EyeOn'))
  const buttonText = computed(() => (isLoading.value ? t('form.loading') : t('form.submit')))

  const signInSchema = yup.object({
    email: rules.email,
    password: rules.password,
  })

  const signUpSchema = yup.object({
    firstName: rules.lettersAndSpaces,
    lastName: rules.lettersAndSpaces,
    email: rules.email,
    password: rules.password,
  })

  type SignInValues = { email: string; password: string }
  type SignUpValues = { firstName: string; lastName: string; email: string; password: string }

  const handleSignIn: SubmissionHandler<SignInValues> = async (values) => {
    isLoading.value = true
    try {
      const success = await login(values.email, values.password)
      if (success) {
        await navigateTo('/')
      } else {
        alert('Invalid credentials')
      }
    } finally {
      isLoading.value = false
    }
  }

  interface SignUpOptions {
    onSuccess?: (values: SignUpValues) => Promise<void> | void
    onError?: () => Promise<void> | void
  }

  const handleSignUp =
    (role: Role, options?: SignUpOptions): SubmissionHandler<SignUpValues> =>
    async (values) => {
      isLoading.value = true
      try {
        const success = await register(
          values.firstName,
          values.lastName,
          values.email,
          values.password,
          role,
        )
        if (success) {
          if (options?.onSuccess) {
            await options.onSuccess(values)
          } else {
            await navigateTo('/')
          }
        } else {
          alert('Registration failed')
        }
      } catch {
        await options?.onError?.()
      } finally {
        isLoading.value = false
      }
    }

  return {
    t,
    rules,
    eyeText,
    isLoading,
    buttonText,
    showPassword,
    signInSchema,
    signUpSchema,
    handleSignIn,
    handleSignUp,
    handleEyeToggle,
  }
}
