import React, { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import { useModal } from '../../Contexts/ModalContext'
import { useProfileContext } from '../../Contexts/ProfileContext'
import { useUserContext } from '../../Contexts/UserContext'
import Avatar from '../UIComponents/Avatar/Avatar'
import Spinner from '../UIComponents/Loader/Spinner'

const FollowingList = ({ following, params_username }) => {
  const { setShowModal } = useModal()
  const {
    userData: { username },
  } = useUserContext()
  // const { getFollowings } = useProfileContext()
  const { updateData: followerHandler } = useGeneralContext()
  const [isBtnLoading, setBtnLoading] = useState(false)
  const { checkCommonFollowers } = useProfileContext()
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const checkFollowingList = async () => {
      setBtnLoading(true)
      const isFound = await checkCommonFollowers(following.userName, username)
      if (isFound >= 0) {
        setIsFollowing(true)
        setBtnLoading(false)
      } else {
        setIsFollowing(false)
        setBtnLoading(false)
      }
    }
    let cancel = false
    !cancel && checkFollowingList()
    return () => (cancel = true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const followUnfollowHandler = useCallback(async () => {
    setBtnLoading(true)
    const username = following.userName
    const url = `profile/user/${username}/followOrUnfollow`
    const success = `you ${isFollowing ? 'Unfollowed' : 'Followed'} ${username}`
    await followerHandler('PATCH', null, url, success)
  }, [followerHandler, following.userName, isFollowing])

  // useEffect(() => {
  //   console.log('f,f')

  //   getFollowings(params_username)
  // }, [followUnfollowHandler, getFollowings, params_username])

  return (
    <li className='follow-list flex-x-between'>
      <div className='flex-x-between'>
        <Link
          to={`/profile/${following?.userName}`}
          onClick={() => setShowModal(false)}
        >
          <Avatar
            imageClass='avatar-small-profile grey-color'
            avatarImageUrl={following?.avatar?.image}
          />
        </Link>
        <div className='follow-detail flex-y-start m-left-s'>
          <p className='username' onClick={() => setShowModal(false)}>
            <Link to={`/profile/${following?.userName}`}>
              {following?.userName}
            </Link>
          </p>
          <p className='name'>{following?.name}</p>
        </div>
      </div>
      {username !== following.userName && (
        <button
          className={`btn transition ${
            isFollowing ? 'btn-cancel' : 'btn-save'
          } `}
          onClick={followUnfollowHandler}
        >
          {isBtnLoading ? (
            <Spinner styles='loader-small' />
          ) : isFollowing ? (
            'Unfollow'
          ) : (
            'Follow'
          )}
        </button>
      )}
    </li>
  )
}

export default memo(FollowingList)
