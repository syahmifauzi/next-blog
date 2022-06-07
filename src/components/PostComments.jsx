import { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'

import { useAuthContext } from '@contexts/AuthContext'
import { deletePostCommentById } from '@services/posts'

const PostComments = ({ comments = [] }) => {
  const { isAuthenticated } = useAuthContext()
  const [items, setItems] = useState(comments)

  const deleteComment = async (postId, commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const res = await deletePostCommentById(postId, commentId)
      if (res) setItems(items.filter((comment) => comment.id !== commentId))
    }
  }

  return (
    <>
      {!items.length && <p>No comments yet!</p>}
      <ul>
        {items.map(({ postId, id, name, email, body }) => (
          <li key={id} className="relative">
            <div className="bg-white border rounded shadow-sm p-3 mb-2">
              <div className="flex items-start gap-2">
                <div className="w-full">
                  <h3 className="sm:inline text-lg font-medium mr-2">{name}</h3>
                  <p className="sm:inline text-sm font-light">({email})</p>
                </div>
                {isAuthenticated && (
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full"
                    onClick={() => deleteComment(postId, id)}>
                    <MdDeleteForever />
                  </button>
                )}
              </div>
              <p className="text-sm mt-2 whitespace-pre-line">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostComments
