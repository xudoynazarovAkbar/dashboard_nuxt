export default defineEventHandler((event) => {
  setCookie(event, 'auth_user', '', { maxAge: 0 })
  return { success: true }
})
