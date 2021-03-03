import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import './SinglePostPage.css'
import axios from 'axios'
import { useParams, useHistory } from 'react-router'
import Navbar from '../../Components/Navigation/Navbar/Navbar'
import PlaceholderSpinner from '../../Components/UIComponents/Loader/PlaceholderSpinner'
import { useUserContext } from '../../Contexts/UserContext'
import CreatePostVault from '../../ModalVaults/CreatePostVault/CreatePostVault'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useGeneralContext } from '../../Contexts/GeneralContext'

const SinglePostPage = () => {
   const { title: postTitle } = useParams()
   const {
      userData: { username },
   } = useUserContext()
   const { updateData: deleteImage } = useGeneralContext()
   const history = useHistory()
   const [post, setPost] = useState({})
   const [pageLoading, setPageLoading] = useState(false)

   useEffect(() => {
      ;(async () => {
         try {
            setPageLoading(true)
            const { data: post } = await axios.get(`${username}/post/${postTitle}`)
            if (post) {
               setPageLoading(false)
               setPost(post)
            }
         } catch (error) {
            setPageLoading(false)
            history.push('/error')
            console.log(error)
         }
      })()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   const deletePostImage = useCallback(
      async (imageIndex) => {
         const postImage = post.blogImages?.find((_, index) => imageIndex === index)
         await deleteImage(
            'DELETE',
            null,
            `profile/post/delete/${post.title}/post-image/${postImage.publicId}`,
            `Image deleted from ${post.title}`,
         )
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <div className='post-page m-left-s'>
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

export default memo(SinglePostPage)