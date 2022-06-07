import { PostComments, PostContent } from '@components'
import { useRequest } from '@hooks/useRequest'
import Head from 'next/head'

export default function PostPage({ post = {}, comments = [] }) {
  const { data: postData, error: postErr } = useRequest(`/${post.id}`, {
    initialData: post
  })
  const { data: cmtData, error: cmtErr } = useRequest(`/${post.id}/comments`, {
    initialData: comments
  })

  return (
    <div>
      <Head>
        <title>{post.title} | Next Blog</title>
        <meta name="description" content={post.body?.substr(0, 150)} />
      </Head>

      {postErr && <div>Error loading post.</div>}
      {!postErr && !postData && <div>Loading post...</div>}
      {!postErr && postData && <PostContent post={postData} />}

      <hr className="my-12 border-dashed border border-gray-300" />

      <h2 className="text-2xl font-medium text-center my-6">Comments</h2>
      {cmtErr && <div>Error loading comments.</div>}
      {!cmtErr && !cmtData && <div>Loading comments...</div>}
      {!cmtErr && cmtData && <PostComments comments={cmtData} />}
    </div>
  )
}

export const getStaticPaths = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/posts'
  const postRes = await fetch(`${baseUrl}/${params.id}`)
  const post = await postRes.json()
  const commentsRes = await fetch(`${baseUrl}/${params.id}/comments`)
  const comments = await commentsRes.json()
  // const MOCK_POST = { id: 1, title: 'Hello World', body: 'sample post body.' }
  return {
    props: {
      post,
      // post: MOCK_POST, // uncomment & open view-source to see mock data
      comments
    }
  }
}
