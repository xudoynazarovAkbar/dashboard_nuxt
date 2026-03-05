import { posts } from '#server/data/posts'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Post ID is required',
    })
  }

  const post = posts.find((p) => p.id === id)

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }

  if (body.title !== undefined) post.title = body.title
  if (body.body !== undefined) post.body = body.body

  return {
    success: true,
    post,
  }
})
