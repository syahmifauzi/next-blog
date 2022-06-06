const updatePostById = async (id, body) => ({ id, ...body })
const deletePostById = async (id) => id
const deletePostCommentById = async (postId, commentId) => commentId

export default async function handler(req, res) {
  try {
    if (req.method === 'PUT') {
      const { id, content } = req.body
      const updatedPost = await updatePostById(id, content)
      console.log({ updatedPost })
      res.status(200).json(updatedPost)
    }

    if (req.method === 'DELETE') {
      const { postId, commentId } = req.body
      if (postId && commentId) {
        const deletedCommentId = await deletePostCommentById(postId, commentId)
        console.log({ deletedCommentId })
        res.status(200).json(deletedCommentId)
      } else if (postId) {
        const deletedPostId = await deletePostById(postId)
        console.log({ deletedPostId })
        res.status(200).json(deletedPostId)
      }
    }
  } catch (error) {
    console.log({ error })
    res.status(500).json({ error: error.message })
  }
}
