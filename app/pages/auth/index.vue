<template>
  <div class="w-full max-w-100 flex flex-col gap-4 items-center">
		<NuxtLink class="w-full" to="/auth/sign-in">
			<CustomButton class="w-full">
				{{ $t('auth.signin') }}
			</CustomButton>
		</NuxtLink>
		<span>{{ $t('auth.or') }}</span>
		<NuxtLink class="w-full" to="/auth/sign-up">
		<CustomButton class="w-full">
				{{ $t('auth.signup') }}
			</CustomButton>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'alternative',
})
</script>

<style scoped></style>
