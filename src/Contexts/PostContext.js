import { createContext, useCallback, useContext, useState } from 'react'
import { request } from '../Utils/url'
const PostContext = createContext(null)

export const PostContextProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState([])
  const [postsLoading, setPostLoading] = useState(false)

  const getAllPost = useCallback(async () => {
    setPostLoading(true)
    const { response, status } = await request('posts', 'GET')

    if (status === 'success') {
      setPostLoading(false)
      const posts = response?.data.reverse()
      setAllPosts(posts)
    }

    if (status === 'failure') {
      setPostLoading(false)
    }
  }, [])

  return (
    <PostContext.Provider value={{ allPosts, postsLoading, getAllPost }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => useContext(PostContext)
