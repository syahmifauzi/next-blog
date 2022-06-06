import Head from 'next/head'

import { PostList } from '@components'
import { useRequest } from '@hooks/useRequest'

export default function HomePage({ posts = [] }) {
  const { data, error } = useRequest(`/`, { initialData: posts })

  return (
    <div>
      <Head>
        <title>Next Blog</title>
      </Head>
      <h1 className="text-3xl font-medium text-center mb-6">All Posts</h1>
      {error && <div>Error loading posts.</div>}
      {!error && !data && <div>Loading posts...</div>}
      {!error && data && <PostList posts={data} />}
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  return {
    props: {
      posts
    }
  }
}
