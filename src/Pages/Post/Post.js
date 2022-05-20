import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SinglePost from '../../Components/PostsComponents/SinglePost/SinglePost'
import { StreamFlowLoading } from '../../Components/UIComponents/Loader/Loaders'

const Post = () => {
  const { title: postTitle, owner: name } = useParams()
  const [post, setPost] = useState({})
  const [user, setUser] = useState({})
  const [pageLoading, setPageLoading] = useState(false)

  const getData = useCallback(async () => {
    try {
      setPageLoading(true)
      const { data: post } = await axios.get(`${name}/post/${postTitle}`)
      const { data: user } = await axios.get(`user/${name}`)

      if (post) {
        setPageLoading(false)
        setPost(post)
        setUser(user)
      }
    } catch (error) {
      setPageLoading(false)
      console.log(error)
    }
  }, [postTitle, name])

  useEffect(() => {
    let isCancelled = false
    !isCancelled && getData()
    return () => (isCancelled = true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData])

  if (pageLoading) return <StreamFlowLoading />

  return (
    <main className='flex-y-center' style={{ marginTop: '15rem' }}>
      <section style={{ width: '80%' }}>
        <SinglePost post={post} user={{ image: user?.avatar?.image, name: user?.name }} />
      </section>
    </main>
  )
}

export default Post
