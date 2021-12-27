import React, { useEffect, useMemo } from 'react'
import SinglePost from '../../Components/PostsComponents/SinglePost/SinglePost'
import { StreamFlowLoading } from '../../Components/UIComponents/Loader/Loaders'
import { usePostContext } from '../../Contexts/PostContext'

const Home = () => {
  const { getAllPost, allPosts, postsLoading } = usePostContext()
  useEffect(() => {
    getAllPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const _allPosts = useMemo(
    () =>
      allPosts?.map((post, postIndex) => (
        <SinglePost
          key={`${postIndex}-post`}
          post={post}
          user={{
            image: post?.avatar?.image,
            name: post?.postOwner,
          }}
          editMode={false}
        />
      )),
    [allPosts]
  )

  if (postsLoading)
    return (
      <div className='margin-t-l flex-y-center'>
        <StreamFlowLoading styles={'flex-y-center'} />
      </div>
    )

  return (
    <main className='margin-t-l flex-y-center'>
      <section style={{ width: '80%' }}>{_allPosts}</section>
    </main>
  )
}

export default Home
