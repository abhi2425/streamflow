import React, { useMemo } from 'react'
import { useProfileContext } from '../../../Contexts/ProfileContext'
import SinglePost from '../SinglePost/SinglePost'
import './UsersPosts.css'
const UserPosts = () => {
  const {
    profile: { posts, user },
  } = useProfileContext()
  const userPosts = useMemo(
    () =>
      posts?.map((post, postIndex) => (
        <SinglePost
          key={`${postIndex}-post`}
          post={post}
          user={{
            image: user?.avatar?.image,
            name: user?.name,
          }}
          editMode={false}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posts]
  )
  return <section className='post-width'>{userPosts}</section>
}

export default UserPosts
