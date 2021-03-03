import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import { useModal } from '../../Contexts/ModalContext'
import Spinner from '../UIComponents/Loader/Spinner'
import Avatar from '../UIComponents/Avatar/Avatar'
import { useProfileContext } from '../../Contexts/ProfileContext'
import { useUserContext } from '../../Contexts/UserContext'

const FollowerList = ({ follower, params_username }) => {
   const { setShowModal } = useModal()
   const {
      userData: { username },
   } = useUserContext()
   const { updateData: followerHandler } = useGeneralContext()
   const [isBtnLoading, setBtnLoading] = useState(false)
   const { checkCommonFollowers } = useProfileContext()
   const [isFollowing, setIsFollowing] = useState(false)

   useEffect(() => {
      const checkFollowingList = async () => {
         setBtnLoading(true)
         const isFound = await checkCommonFollowers(follower.userName, username)
         if (isFound >= 0) {
            setIsFollowing(true)
            setBtnLoading(false)
         } else {
            setIsFollowing(false)
            setBtnLoading(false)
         }
      }
      username !== params_username && checkFollowingList()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const removeFollowerHandler = useCallback(async () => {
      setBtnLoading(true)
      const username = follower.userName
      const url = `/profile/user/remove/${username}`
      const success = `${username} removed from your followers list.`
      await followerHandler('PATCH', null, url, success)
   }, [follower.userName, followerHandler])

   const followUnfollowHandler = useCallback(async () => {
      setBtnLoading(true)
      const username = follower.userName
      const url = `profile/user/${username}/followOrUnfollow`
      const success = `you ${isFollowing ? 'Unfollowed' : 'Followed'} ${username}`
      await followerHandler('PATCH', null, url, success)
   }, [follower.userName, followerHandler, isFollowing])

   const defaultButton = username === params_username ? 'remove' : 'Follow'
   return (
      <li className='follow-list flex-x-between'>
         <div className='flex-x-between'>
            <Link to={`/profile/${follower?.userName}`} onClick={() => setShowModal(false)}>
               <Avatar
                  imageClass='avatar-small-profile grey-color'
                  avatarImageUrl={follower?.avatar?.image}
               />
            </Link>

            <div className='follow-detail flex-y-start m-left-s'>
               <p className='username' onClick={() => setShowModal(false)}>
                  <Link to={`/profile/${follower?.userName}`}>{follower?.userName}</Link>
               </p>
               <p className='name'>{follower?.name}</p>
            </div>
         </div>

         {username !== follower.userName && (
            <button
               className={`btn transition ${isFollowing ? 'btn-cancel' : 'btn-save'}`}
               onClick={() =>
                  isFollowing || defaultButton === 'Follow'
                     ? followUnfollowHandler()
                     : removeFollowerHandler()
               }>
               {isBtnLoading ? (
                  <Spinner styles='loader-small' />
               ) : isFollowing ? (
                  'Unfollow'
               ) : (
                  defaultButton
               )}
            </button>
         )}
      </li>
   )
}

export default FollowerList
