import { posts } from '#server/data/posts'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Post ID is required',
    })
  }

  const index = posts.findIndex((p) => p.id === id)

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }

  const deletedPost = posts.splice(index, 1)[0]

  return {
    success: true,
    post: deletedPost,
  }
})
