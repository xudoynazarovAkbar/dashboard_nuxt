import { posts } from '#server/data/posts'
import { v4 as uuid } from 'uuid'

export default defineEventHandler(async (event) => {
  const { title, body } = await readBody(event)

  if (!title || !body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and body are required',
    })
  }

  const newPost = {
    id: uuid(),
    title,
    body,
    createdAt: new Date(),
  }

  posts.push(newPost)

  return {
    success: true,
    post: newPost,
  }
})
