import Router from 'next/router'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'

import { useAuthContext } from '@contexts/AuthContext'
import { deletePostById, updatePostById } from '@services/posts'

const PostContent = ({ post = {} }) => {
  const { isAuthenticated } = useAuthContext()
  const [content, setContent] = useState(post)
  const [contentOri, setContentOri] = useState(post) // to demonstrate content change
  const [isEditing, setIsEditing] = useState(false)
  const [contentChanged, setContentChanged] = useState(false)

  useEffect(() => {
    if (post) {
      setContent(post)
      setContentOri(post)
    }
  }, [post])

  useEffect(() => {
    setContentChanged(JSON.stringify(content) !== JSON.stringify(contentOri))
  }, [content, contentOri])

  const handleInputChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    if (!contentChanged) {
      setIsEditing(false)
      toast.success('Editing canceled!')
    } else if (window.confirm('Are you sure you want to cancel editing?')) {
      setIsEditing(false)
      setContent(contentOri)
      toast.success('Editing canceled!')
    }
  }

  const handleSave = async () => {
    if (window.confirm('Are you sure you want to save?')) {
      const { title, body } = content
      const res = await updatePostById(post.id, { title, body })
      if (res) {
        setContentOri(content)
        setIsEditing(false)
      }
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const res = await deletePostById(post.id)
      if (res) Router.push('/')
    }
  }

  if (isEditing) {
    return (
      <>
        <div className="w-full">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-title">
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-title"
            type="text"
            name="title"
            placeholder="Enter post title"
            value={content.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-content">
            Content
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded h-40 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-content"
            name="body"
            placeholder="Enter post content"
            value={content.body}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            disabled={!contentChanged}
            className={`text-white ${
              contentChanged ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
            } px-3 py-2 rounded-md`}
            onClick={handleSave}>
            Save
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium mb-2">
          {content.title}
          {isAuthenticated && (
            <>
              <button
                className="text-sm font-normal ml-2 text-white bg-blue-500 hover:bg-blue-600 p-1.5 rounded-full"
                onClick={() => setIsEditing(true)}>
                <FiEdit />
              </button>
              <button
                className="text-sm font-normal ml-2 text-white bg-red-500 hover:bg-red-600 p-1.5 rounded-full"
                onClick={handleDelete}>
                <MdDeleteForever />
              </button>
            </>
          )}
        </h1>
      </div>
      <p className="whitespace-pre-line">{content.body}</p>
    </>
  )
}

export default PostContent
