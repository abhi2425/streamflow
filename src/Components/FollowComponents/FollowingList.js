import React, { memo, useEffect, useState } from 'react'
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
  const { updateData: followerHandler } = useGeneralContext()
  const [isBtnLoading, setBtnLoading] = useState(false)
  const { checkCommonFollowers, getFollowings } = useProfileContext()
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    let cancel = false
    const checkFollowingList = async () => {
      setBtnLoading(true)
      const isFound = await checkCommonFollowers(following?.userName, username)
      if (!cancel) {
        if (isFound >= 0) {
          setIsFollowing(true)
          setBtnLoading(false)
        } else {
          setIsFollowing(false)
          setBtnLoading(false)
        }
      }
    }
    !cancel && checkFollowingList()
    return () => (cancel = true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [following?.userName, username])

  const followUnfollowHandler = async () => {
    setBtnLoading(true)
    const username = following.userName
    const url = `profile/user/${username}/followOrUnfollow`
    const success = `you ${isFollowing ? 'Unfollowed' : 'Followed'} ${username}`
    await followerHandler('PATCH', null, url, success)
    await getFollowings(params_username)
  }

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
