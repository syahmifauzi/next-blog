import Link from 'next/link'

const PostList = ({ posts = [] }) => {
  return (
    <ul>
      {!posts.length && <div>No posts yet.</div>}
      {posts.length > 0 &&
        posts.map(({ id, title, body }) => (
          <li
            key={id}
            className="bg-white border rounded shadow-sm hover:shadow-md transition-all mb-2 border-l-8 hover:border-l-blue-500">
            <Link href={`/posts/${id}`}>
              <a className="p-2 block">
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="font-light">{body.substr(0, 150)}...</p>
              </a>
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default PostList
