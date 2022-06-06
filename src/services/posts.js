import axios from 'axios'
import toast from 'react-hot-toast'

export const updatePostById = async (id, content = {}) => {
  try {
    const res = await axios.put(`/api/posts`, { id, content })
    if (res.status === 200) {
      toast.success('Post updated!')
      return res.data
    }
    toast.error('Error editing post!')
    return null
  } catch (error) {
    console.log({ error })
    toast.error('Error editing post!')
    return null
  }
}

export const deletePostById = async (postId) => {
  try {
    const res = await axios.delete(`/api/posts`, { data: { postId } })
    if (res.status === 200) {
      toast.success('Post deleted!')
      return postId
    }
    toast.error('Error deleting post!')
    return null
  } catch (error) {
    console.log({ error })
    toast.error('Error deleting post!')
    return null
  }
}

export const deletePostCommentById = async (postId, commentId) => {
  try {
    const res = await axios.delete(`/api/posts`, {
      data: { postId, commentId }
    })
    if (res.status === 200) {
      toast.success('Comment deleted!')
      return commentId
    }
    toast.error('Error deleting comment!')
    return null
  } catch (error) {
    console.log({ error })
    toast.error('Error deleting comment!')
    return null
  }
}
