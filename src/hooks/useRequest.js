import axios from 'axios'
import useSWR from 'swr'

const baseUrl = `https://jsonplaceholder.typicode.com/posts`

const fetcher = (url) => axios(url).then((res) => res.data)

export const useRequest = (path, options = {}) => {
  if (!path) {
    throw new Error(`Path is required`)
  }

  const { data, error } = useSWR(`${baseUrl}${path}`, fetcher, {
    revalidateOnMount: true,
    ...options
  })

  return { data, error }
}
