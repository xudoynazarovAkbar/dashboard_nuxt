export const useTheme = () => {
  const theme = useState<'dark' | 'light'>('theme', () => 'dark')

  const isDark = computed(() => theme.value === 'dark')

  const toggleTheme = () => {
    theme.value = isDark.value ? 'light' : 'dark'
  }

  return {
    theme,
    isDark,
    toggleTheme,
  }
}
