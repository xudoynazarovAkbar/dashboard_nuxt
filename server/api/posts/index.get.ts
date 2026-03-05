import { posts } from '#server/data/posts'

export default defineEventHandler((event) => {
  return posts
})
