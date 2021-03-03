import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../../Contexts/UserContext'
import Avatar from '../../UIComponents/Avatar/Avatar'
import { FaThumbsUp, FaThumbsDown, FaRegComment } from 'react-icons/fa'
import date from 'date-and-time'
import { VscCircleFilled } from 'react-icons/vsc'
// import axios from 'axios'
import { useGeneralContext } from '../../../Contexts/GeneralContext'

const SinglePost = ({ post, user }) => {
   const { title, body, postOwner, updatedAt, upVote, downVote } = post
   const [readMore, setReadMore] = useState(false)
   const {
      userData: { username },
      setAlert,
   } = useUserContext()
   const { updateData: sendVoteRequest } = useGeneralContext()
   const [upVote_client, setUpVote_client] = useState(() => ({
      upVote,
      count: upVote.length,
      activeClass: false,
   }))
   const [downVote_client, setDownVote] = useState(() => ({
      downVote,
      count: downVote.length,
      activeClass: false,
   }))

   useEffect(() => {
      const hasUpVoted = upVote?.findIndex((name) => name === username)
      const hasDownVoted = downVote?.findIndex((name) => name === username)
      hasUpVoted >= 0 && setUpVote_client((prev) => ({ ...prev, activeClass: true }))
      hasDownVoted >= 0 && setDownVote((prev) => ({ ...prev, activeClass: true }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const updated_At = useMemo(() => {
      const pattern = date.compile('MMM D YYYY hh:mm:ss A')
      return date.format(new Date(Date.parse(updatedAt)), pattern)
   }, [updatedAt])

   const postImages = useMemo(
      () =>
         post.blogImages?.map((item, imageIndex) => (
            <a href={item.image} target='blank' key={`${imageIndex}-image`}>
               <img src={item.image} alt={`postImage-${imageIndex}`} className='margin-s' />
            </a>
         )),
      [post.blogImages],
   )
   console.log(upVote_client)

   const voteHandler = useCallback(
      async (flag) => {
         try {
            console.log(upVote_client)
            const url = `profile/post/update/${title}`
            flag
               ? setUpVote_client((prev) => ({
                    activeClass: !prev.activeClass,
                    count: !prev.activeClass ? prev.count + 1 : prev.count - 1,
                    upVote: !prev.activeClass
                       ? [...prev.upVote, username]
                       : prev.upVote.filter((name) => name !== username),
                 }))
               : setDownVote((prev) => ({
                    activeClass: !prev.activeClass,
                    count: !prev.activeClass ? prev.count + 1 : prev.count - 1,
                    downVote: prev.activeClass
                       ? [...prev.downVote, username]
                       : prev.downVote.filter((name) => name !== username),
                 }))
            const data = flag
               ? { upVote: upVote_client.upVote }
               : { downVote: downVote_client.downVote }
            // const response = await axios({
            //    url,
            //    method: 'PATCH',
            //    headers: {
            //       'Access-Control-Allow-Origin': '*',
            //       Authorization: `Bearer ${token}`,
            //    },
            //    data,
            // })
            const response = await sendVoteRequest('PATCH', data, url)
            console.log(response, data)
         } catch (error) {
            console.log(error)
            setAlert({
               show: true,
               type: 'danger',
               message: 'Sorry! Something went wrong',
            })
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [downVote_client, title, upVote_client],
   )

   return (
      <article className='single-post margin-b-m'>
         <div className='flex-x-between'>
            <div className='flex-row'>
               <Link to={`/profile/${postOwner}`}>
                  <Avatar avatarImageUrl={user.image} imageClass='avatar-small' />
               </Link>
               <div className='post-owner'>
                  <h3>
                     <Link to={`/profile/${postOwner}`}>{user.name}</Link>
                  </h3>
                  <p> {postOwner}</p>
               </div>
            </div>
            {username === postOwner && (
               <i className='icon icon-grey '>
                  <BsThreeDotsVertical />
               </i>
            )}
         </div>
         <div className='post-title flex-row'>
            <p>{title?.replace(/-/g, ' ')}</p>
            <div className='created-at flex-row'>
               <i>
                  <VscCircleFilled />
               </i>
               <div>{updated_At}</div>
            </div>
         </div>
         <div className='post-body m-left-s'>
            {body.length < 200 ? body : readMore ? body : body.substring(0, 200) + ' . . .'}
            {body.length > 200 && (
               <button
                  className='btn read-more transition'
                  onClick={() => setReadMore((prev) => !prev)}>
                  {readMore ? 'Show Less' : 'Read More'}
               </button>
            )}
         </div>
         <div className='post-images flex-column'>{postImages}</div>
         <div className='reviews flex-x-between'>
            <div className='m-left-s'>
               <i className='icon m-right-s' id='upVote' onClick={() => voteHandler(true)}>
                  <FaThumbsUp
                     id='upVote'
                     fill={
                        upVote_client.activeClass
                           ? 'var(--color-profile-1)'
                           : 'var(--color-dark-grey)'
                     }
                  />
               </i>
               <i id='downVote' className='icon m-right-s' onClick={() => voteHandler(false)}>
                  <FaThumbsDown
                     id='downVote'
                     fill={
                        downVote_client.activeClass
                           ? 'var(--color-profile-1)'
                           : 'var(--color-dark-grey)'
                     }
                  />
               </i>
               <i className='icon icon-grey m-right-s'>
                  <FaRegComment />
               </i>
            </div>
            <p> {`${upVote_client.count || 0} Upvotes, ${downVote_client.count || 0} Downvotes`}</p>
         </div>
      </article>
   )
}
export default memo(SinglePost)
