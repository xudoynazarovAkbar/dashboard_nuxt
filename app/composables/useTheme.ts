export const useTheme = () => {
  const theme = useState<'dark' | 'light'>('theme', () => 'dark')

  const toggleTheme = () => {
    if (theme.value === 'dark') {
      theme.value = 'light'
      return
    }
    theme.value = 'dark'
  }

  return {
    theme,
    toggleTheme,
  }
}
