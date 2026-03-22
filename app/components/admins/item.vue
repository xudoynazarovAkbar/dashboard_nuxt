<template>
  <div class="flex w-full gap-x-3 items-center">
    <div class="grow">{{ props.firstName }} {{ props.lastName }}</div>
    <CustomButton @click="onDelete">{{ $t('actions.delete') }}</CustomButton>
  </div>
</template>

<script setup lang="ts">
import type { User } from '#shared/types/models'

const props = defineProps<Omit<User, 'password'>>()
const { optimisticDelete } = useAdmins()

const onDelete = () => optimisticDelete(props.id)
</script>
```

---

The data flow is now very clean:
```
useFetch (page)  →  seeds 'admins' cache
useNuxtData      →  any component reads the same cache
optimisticCreate/Delete  →  mutate cache instantly, then refresh in background