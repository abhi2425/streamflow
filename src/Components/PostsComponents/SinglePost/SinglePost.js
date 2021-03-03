import React, { memo, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../../Contexts/UserContext'
import Avatar from '../../UIComponents/Avatar/Avatar'
import { FaThumbsUp, FaThumbsDown, FaRegComment } from 'react-icons/fa'
import date from 'date-and-time'
import { VscCircleFilled } from 'react-icons/vsc'
import { voteReducer } from '../../../Utils/voteHandler/voteReducer'
import { initialVoteState } from '../../../Utils/voteHandler/initialVoteState'
import axios from 'axios'
import PostTooltip from '../../UIComponents/Tooltip/PostTooltip'
import { useModal } from '../../../Contexts/ModalContext'

const SinglePost = ({ post, user }) => {
   const { title, body, postOwner, updatedAt, upVote, downVote } = post
   const { popAlert } = useModal()
   const {
      userData: { username, token },
   } = useUserContext()
   const [readMore, setReadMore] = useState(false)
   const [state, dispatch] = useReducer(voteReducer, initialVoteState({ upVote, downVote }))
   const [toggleUp, setToggleUp] = useState(true)
   const [toggleDown, setToggleDown] = useState(true)

   useEffect(() => {
      const hasUpVoted = upVote?.findIndex((name) => name === username)
      const hasDownVoted = downVote?.findIndex((name) => name === username)
      if (hasUpVoted >= 0) {
         dispatch({ type: 'UPVOTED_ALREADY' })
         setToggleUp(false)
      }
      if (hasDownVoted >= 0) {
         dispatch({ type: 'DOWNVOTED_ALREADY' })
         setToggleDown(false)
      }
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
   const voteHandler = useCallback(
      async (flag) => {
         try {
            const url = `profile/post/votes/${title}`
            if (flag) {
               toggleUp
                  ? dispatch({ type: 'UP_VOTE_ADD', payload: username })
                  : dispatch({ type: 'UP_VOTE_REMOVE', payload: username })
            } else {
               toggleDown
                  ? dispatch({ type: 'DOWN_VOTE_ADD', payload: username })
                  : dispatch({ type: 'DOWN_VOTE_REMOVE', payload: username })
            }
            console.log(state)
            const data = flag ? { upVote: state.upVote } : { downVote: state.downVote }
            const response = await axios({
               url,
               method: 'PATCH',
               headers: {
                  'Access-Control-Allow-Origin': '*',
                  Authorization: `Bearer ${token}`,
               },
               data,
            })
            console.log(response, data)
         } catch (error) {
            console.log(error)
            popAlert('Something went wrong!', 'danger')
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [state, title, toggleDown, toggleUp, username],
   )
   console.log(state, toggleUp)
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
            {username === postOwner && <PostTooltip title={title} />}
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
            {body?.length < 200 ? body : readMore ? body : body?.substring(0, 200) + ' . . .'}
            {body?.length > 200 && (
               <button
                  className='btn read-more transition'
                  onClick={() => setReadMore((prev) => !prev)}>
                  {readMore ? 'Show Less' : 'Read More'}
               </button>
            )}
         </div>
         <div className='post-images flex-column'>{postImages}</div>
         <div className='reviews flex-x-between margin-t-s'>
            <div className='m-left-s'>
               <i
                  className='icon m-right-s'
                  id='upVote'
                  onClick={() => {
                     setToggleUp((prev) => !prev)
                     voteHandler(true)
                  }}>
                  <FaThumbsUp
                     id='upVote'
                     fill={
                        state.upVote_active ? 'var(--color-profile-1)' : 'var(--color-dark-grey)'
                     }
                  />
               </i>
               <i
                  id='downVote'
                  className='icon m-right-s'
                  onClick={() => {
                     setToggleDown((prev) => !prev)
                     voteHandler(false)
                  }}>
                  <FaThumbsDown
                     id='downVote'
                     fill={
                        state.downVote_active ? 'var(--color-profile-1)' : 'var(--color-dark-grey)'
                     }
                  />
               </i>
               <i className='icon icon-grey m-right-s'>
                  <FaRegComment />
               </i>
            </div>
            <p> {`${state.upVote_count || 0} Upvotes, ${state.downVote_count || 0} Downvotes`}</p>
         </div>
      </article>
   )
}
export default memo(SinglePost)
