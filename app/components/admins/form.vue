<template>
  <div>
    <h1 class="text-4xl">{{ $t('admin.createAdmin') }}</h1>
    <Form
      ref="formRef"
      @submit="onSubmit as SubmissionHandler"
      :validation-schema="signUpSchema"
      v-slot="{ meta }"
      class="flex flex-col gap-y-3 mt-5"
    >
      <Field name="firstName" v-slot="{ field, errorMessage }">
        <CustomInput
          v-bind="field"
          placeholder="John"
          label="First Name"
          :error="errorMessage"
        />
      </Field>

      <Field name="lastName" v-slot="{ field, errorMessage }">
        <CustomInput
          v-bind="field"
          placeholder="Doe"
          label="Last Name"
          :error="errorMessage"
        />
      </Field>

      <Field name="email" v-slot="{ field, errorMessage }">
        <CustomInput
          v-bind="field"
          type="email"
          placeholder="john.doe@example.com"
          label="Email Address"
          :error="errorMessage"
        />
      </Field>

      <Field name="password" v-slot="{ field, errorMessage }">
        <CustomInput
          v-bind="field"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          label="Password"
          :error="errorMessage"
        >
          <button type="button" @click="handleEyeToggle">
            {{ eyeText }}
          </button>
        </CustomInput>
      </Field>

      <div class="w-full flex justify-end mt-4">
        <CustomButton type="submit" :disabled="isLoading || !meta.valid">
          {{ buttonText }}
        </CustomButton>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, type SubmissionHandler, type FormContext } from 'vee-validate'

const formRef = ref<FormContext | null>(null)

const { optimisticCreate } = useAdmins()
const {
  eyeText,
  isLoading,
  buttonText,
  showPassword,
  signUpSchema,
  handleSignUp,
  handleEyeToggle,
} = useForm()

const onSubmit = handleSignUp(ROLES.ADMIN, {
  onSuccess: async (values) => {
    await optimisticCreate({ ...values, role: ROLES.ADMIN })
    formRef.value?.resetForm()
  },
  onError: async () => {
    await refreshNuxtData('admins')
  },
})
</script>