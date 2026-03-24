<script setup lang="ts">
const { restaurants, pending, error } = useRestaurants()
</script>

<template>
  <div>
    <!-- Loading state with skeletons -->
    <div v-if="pending">
      <ul class="grid grid-cols-3 gap-4">
        <li
          v-for="i in 9"
          :key="i"
          class="card card-skeleton"
        >
          <div class="skeleton-wrapper">
            <div class="skeleton-image shimmer" />
            <div class="skeleton-content">
              <div class="skeleton-title shimmer" />
              <div class="skeleton-text shimmer" />
              <div class="skeleton-text shimmer skeleton-text--short" />
              <div class="skeleton-footer">
                <div class="skeleton-badge shimmer" />
                <div class="skeleton-badge shimmer" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="error-state"
    >
      <div class="error-icon">⚠️</div>
      <CustomTitle type="medium">{{ error }}</CustomTitle>
    </div>

    <!-- Success state with restaurants -->
    <ul
      v-else
      class="grid grid-cols-3 gap-4"
    >
      <li
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="card"
      >
        <RestaurantsItem :data="restaurant" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.card {
  width: 100%;
  border: 1px solid var(--secondary-color);
  border-radius: 16px;
  background: var(--background);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(18, 40, 47, 0.06);
  }
}

/* ── Skeleton loading ─────────────────────────── */
.card-skeleton {
  pointer-events: none;

  &:hover {
    transform: none;
    box-shadow: none;
  }
}

.skeleton-wrapper {
  padding: 0;
}

.skeleton-image {
  width: 100%;
  height: 180px;
  border-radius: 16px 16px 0 0;
  background: var(--greys);
}

.skeleton-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-title {
  width: 70%;
  height: 20px;
  border-radius: 6px;
  background: var(--greys);
}

.skeleton-text {
  width: 100%;
  height: 14px;
  border-radius: 4px;
  background: var(--greys);

  &--short {
    width: 85%;
  }
}

.skeleton-footer {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.skeleton-badge {
  width: 60px;
  height: 24px;
  border-radius: 12px;
  background: var(--greys);
}

/* Shimmer animation */
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    var(--greys) 0%,
    var(--color) 50%,
    var(--greys) 100%
  );
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite linear;
}

/* ── Error state ──────────────────────────────── */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 24px;
  text-align: center;
}

.error-icon {
  font-size: 48px;
}
</style>