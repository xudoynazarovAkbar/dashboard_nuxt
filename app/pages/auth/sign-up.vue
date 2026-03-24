<script setup lang="ts">
import { Form, Field, type SubmissionHandler } from 'vee-validate'

definePageMeta({ layout: 'alternative' })

const {
  eyeText,
  isLoading,
  buttonText,
  showPassword,
  signUpSchema,
  handleSignUp,
  handleEyeToggle,
} = useForm()

const onSubmit = handleSignUp(ROLES.USER)
</script>

<template>
  <Form
    @submit="onSubmit as SubmissionHandler"
    :validation-schema="signUpSchema"
    v-slot="{ meta }"
    class="bg-(--primary) border-2 border-(--text) rounded-3xl w-full max-w-150 p-8 flex flex-col gap-5"
  >
    <Field
      name="firstName"
      v-slot="{ field, errorMessage }"
    >
      <CustomInput
        v-bind="field"
        placeholder="John"
        label="First Name"
        :error="errorMessage"
      />
    </Field>

    <Field
      name="lastName"
      v-slot="{ field, errorMessage }"
    >
      <CustomInput
        v-bind="field"
        placeholder="Doe"
        label="Last Name"
        :error="errorMessage"
      />
    </Field>

    <Field
      name="email"
      v-slot="{ field, errorMessage }"
    >
      <CustomInput
        v-bind="field"
        type="email"
        placeholder="john.doe@example.com"
        label="Email Address"
        :error="errorMessage"
      />
    </Field>

    <Field
      name="password"
      v-slot="{ field, errorMessage }"
    >
      <CustomInput
        v-bind="field"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        label="Password"
        :error="errorMessage"
      >
        <button
          type="button"
          @click="handleEyeToggle"
        >
          {{ eyeText }}
        </button>
      </CustomInput>
    </Field>

    <CustomButton
      type="submit"
      class="submit"
      :disabled="isLoading || !meta.valid"
    >
      {{ buttonText }}
    </CustomButton>
  </Form>
</template>

<style scoped lang="scss">
.submit {
  border-radius: 5px;
  margin-top: 8px;
}
</style>
