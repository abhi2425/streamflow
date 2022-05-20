/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import './EditPostPage.css'
import axios from 'axios'
import { useParams } from 'react-router'
import Navbar from '../../Components/Navigation/Navbar/Navbar'
import PlaceholderSpinner from '../../Components/UIComponents/Loader/PlaceholderSpinner'
import { useUserContext } from '../../Contexts/UserContext'
import CreatePostVault from '../../ModalVaults/CreatePostVault/CreatePostVault'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useGeneralContext } from '../../Contexts/GeneralContext'

const EditPostPage = () => {
  const { title: postTitle } = useParams()
  const {
    userData: { username },
  } = useUserContext()
  const { updateData: deleteImage } = useGeneralContext()
  const [post, setPost] = useState({})
  const [pageLoading, setPageLoading] = useState(false)

  const getPosts = useCallback(async () => {
    try {
      setPageLoading(true)
      const { data: post } = await axios.get(`${username}/post/${postTitle}`)
      if (post) {
        setPageLoading(false)
        setPost(post)
      }
    } catch (error) {
      setPageLoading(false)
      console.log(error)
    }
  }, [postTitle, username])

  useEffect(() => {
    let isCancelled = false
    !isCancelled && getPosts()
    return () => (isCancelled = true)
  }, [])

  const deletePostImage = useCallback(
    async (imageIndex) => {
      const postImage = post.blogImages?.find((_, index) => imageIndex === index)
      const response = await deleteImage(
        'DELETE',
        null,
        `profile/post/delete/${post.title}/post-image/${postImage.publicId}`,
        `Image deleted from ${post.title}`,
      )
      response && getPosts()
    },
    [post.blogImages, post.title],
  )
  const postImages = useMemo(
    () =>
      post.blogImages?.map((item, imageIndex) => (
        <div key={`${imageIndex}-image`} className='postImage-box transition'>
          <img
            src={item.image}
            alt={`postImage-${imageIndex}`}
            className='margin-s post-image transition'
          />
          <i className='icon icon-red transition' onClick={() => deletePostImage(imageIndex)}>
            <RiDeleteBinLine />
          </i>
        </div>
      )),
    [post.blogImages],
  )
  return (
    <div className='page'>
      <main className='main-profile margin-t-l flex-y-evenly'>
        <Navbar />
        {pageLoading ? (
          <PlaceholderSpinner styles='lds-spinner-medium' />
        ) : (
          <>
            <div className='post-page m-left-s post-small-screen'>
              <div className='flex-column'>
                <h1 className='margin-t-s'>Post Details</h1>
                <CreatePostVault post={post} editingMode={true} />
              </div>
              {postImages?.length > 0 && (
                <div className='flex-column margin-t-s'>
                  <h1>Post Images</h1>
                  <div className='grid-2'>{postImages}</div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default memo(EditPostPage)
