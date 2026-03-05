<template>
  <Form
    @submit="onSubmit as any"
    v-slot="{ meta }"
    class="bg-(--primary) border-2 border-(--text) rounded-3xl w-full max-w-150 p-8 flex flex-col gap-5"
  >
    <Field
      name="username"
      v-slot="{ field, errors }"
      :rules="usernameRules"
    >
      <CustomInput
        v-bind="field"
        :label="t('form.username')"
        placeholder="John_123"
        :error="errors[0]"
      />
    </Field>

    <Field
      name="password"
      v-slot="{ field, errors }"
      :rules="passwordRules"
    >
      <CustomInput
        v-bind="field"
        type="password"
        :label="t('form.password')"
        :error="errors[0]"
      />
    </Field>

    <CustomButton
      :disabled="!meta.valid"
      type="submit"
      class="submit"
    >
      {{ t('form.submit') }}
    </CustomButton>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const { login } = useAuth()

const usernameRules = yup.string().required(t('errors.required'))
const passwordRules = yup.string().required(t('errors.required')).min(8, t('errors.min'))

const onSubmit = async (values: { username: string; password: string }) => {
  const success = await login(values.username, values.password)
  if (success) {
    navigateTo('/')
  } else {
    alert('invalid credentials')
  }
}
</script>

<style scoped>
.submit {
  border-radius: 5px;
  margin-top: 8px;
}
</style>
