<template>
  <header class="flex w-full border-b-2 border-b-(--text)">
    <div class="custom-container flex justify-between items-center w-full p-3">
      <LayoutHeaderLogo />
      <div class="flex items-center gap-3">
        <div
          class="lang-wrap"
          ref="langWrap"
        >
          <div
            class="lang-glider"
            ref="glider"
          />
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="lang-btn"
            :class="{ active: currentLocale === lang.code }"
            :ref="
              (el) => {
                if (el) langRefs[lang.code] = el as HTMLElement
              }
            "
            @click="selectLang(lang.code)"
          >
            {{ lang.label }}
          </button>
        </div>

        <!-- Theme toggle -->
        <button
          class="theme-toggle"
          @click="toggleTheme"
        >
          <svg
            class="theme-icon"
            :class="isDark ? 'icon-out' : 'icon-in'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <svg
            class="theme-icon"
            :class="isDark ? 'icon-in' : 'icon-out'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="4"
            />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { toggleTheme, isDark } = useTheme()

const currentLocale = computed(() => locale.value)

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
] as const

const langWrap = ref<HTMLElement | null>(null)
const glider = ref<HTMLElement | null>(null)
const langRefs: Record<string, HTMLElement> = {}

const moveGlider = (code: string) => {
  const wrap = langWrap.value
  const gl = glider.value
  const btn = langRefs[code]
  if (!wrap || !gl || !btn) return

  const wrapRect = wrap.getBoundingClientRect()
  const btnRect = btn.getBoundingClientRect()
  gl.style.left = `${btnRect.left - wrapRect.left + 3}px`
  gl.style.width = `${btnRect.width - 6}px`
}

const selectLang = (code: typeof languages[number]['code']) => {
  setLocale(code)
  moveGlider(code)
}

onMounted(() => moveGlider(currentLocale.value))
watch(currentLocale, (val) => moveGlider(val))
</script>

<style scoped>
.lang-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color);
  border: 0.5px solid var(--greys);
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
}

.lang-glider {
  position: absolute;
  top: 3px;
  height: calc(100% - 6px);
  background: var(--active);
  border-radius: 999px;
  transition: left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
              width 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}

.lang-btn {
  position: relative;
  z-index: 1;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--secondary-color);
  padding: 4px 11px;
  border-radius: 999px;
  transition: color 0.2s ease;
  line-height: 1;
}

.lang-btn.active {
  color: var(--white);
}

/* ── Theme toggle ── */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color);
  border: 0.5px solid var(--greys);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.theme-toggle:hover {
  border-color: var(--active);
  background: var(--background);
}

.theme-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  color: var(--text);
  transition: opacity 0.25s ease,
              transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.icon-in {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.icon-out {
  opacity: 0;
  transform: scale(0.4) rotate(-90deg);
}
</style>
