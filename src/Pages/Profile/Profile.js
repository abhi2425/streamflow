import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../Components/UIComponents/Avatar/Avatar'
import { useUserContext } from '../../Contexts/UserContext'
import FollowersVault from '../../ModalVaults/FollowersVault/FollowersVault'
import { useModal } from '../../Contexts/ModalContext'
import { useProfileContext } from '../../Contexts/ProfileContext'
import Spinner from '../../Components/UIComponents/Loader/Spinner'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import UserPosts from '../../Components/PostsComponents/UserPosts/UserPosts'
import { RiUserFollowFill } from 'react-icons/ri'
import { StreamFlowLoading } from '../../Components/UIComponents/Loader/Loaders'

const Profile = () => {
  const {
    userData: { username },
  } = useUserContext()
  const { isBtnLoading } = useGeneralContext()
  const { setShowModal } = useModal()
  const {
    profile,
    getUserProfile,
    userDetailsList,
    pageLoading,
    isFollowing,
    socialMediaLinks,
    checkCommonFollowers,
    followUnfollowHandler,
    followers,
    followings,
    getFollowers,
    getFollowings,
  } = useProfileContext()
  const { username: params_username } = useParams()
  const [displayDescription, setDisplayDescription] = useState(false)

  useEffect(() => {
    document.title = `StreamFlow | ${params_username}`
    let cancel = false
    if (!cancel) {
      getUserProfile(params_username)
      getFollowers(params_username)
      getFollowings(params_username)
    }
    return () => (cancel = true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params_username])

  useEffect(() => {
    let cancel = false
    if (!cancel)
      username !== params_username &&
        checkCommonFollowers(params_username, username)

    return () => (cancel = true)
  }, [checkCommonFollowers, params_username, username])

  const followVaultHandler = (followers, following, active) => {
    setShowModal({
      show: true,
      component: (
        <FollowersVault
          followData={{
            followers,
            following,
          }}
          active={active}
          params_username={params_username}
        />
      ),
    })
  }

  if (pageLoading) return <StreamFlowLoading />
  return (
    <div className='page'>
      <main className='main-profile margin-t-m flex-y-evenly'>
        <>
          <section className='flex-x-evenly profile-section'>
            <div className='flex-y-between'>
              <div
                style={{ position: 'relative' }}
                onClick={() => setDisplayDescription((prev) => !prev)}
              >
                <Avatar
                  avatarImageUrl={profile.user?.avatar?.image}
                  imageClass='avatar-profile transition'
                />
                {profile.user?.quotes && (
                  <div
                    className={`profile-description transition ${
                      displayDescription && 'show-description'
                    }`}
                  >
                    {profile.user?.quotes}
                  </div>
                )}
              </div>

              <div className='flex-y-center'>
                <p className='username'>{params_username}</p>
                <p className='status'>{profile.user?.status || 'Status 😊'}</p>
              </div>
              {params_username === username ? (
                <div className='edit-profile'>
                  <Link to={`/profile/${params_username}/settings`}>
                    {' '}
                    Edit Profile{' '}
                  </Link>
                </div>
              ) : (
                <button
                  className='btn btn-save transition'
                  onClick={() => followUnfollowHandler(params_username)}
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
            </div>
            <div className='flex-y-evenly margin-b-m'>
              <div className='flex-x-evenly'>
                <a href='#posts'>
                  <div className='margin-s transition  profile-details flex-y-between'>
                    <div className='count'>{profile.posts?.length || 0}</div>
                    <p className='tag'>Posts</p>
                  </div>
                </a>
                <div
                  className='margin-s transition  profile-details flex-y-between'
                  onClick={() =>
                    followVaultHandler(followers, followings, 'followersList')
                  }
                >
                  <div className='count'>{followers?.length || 0}</div>
                  <p className='tag'>Followers</p>
                </div>
                <div
                  className='margin-s  transition profile-details flex-y-between'
                  onClick={() => followVaultHandler(followers, followings)}
                >
                  <div className='count'>{followings?.length || 0}</div>
                  <p className='tag'>Following</p>
                </div>
              </div>
              <ul className='user-details flex-y-start'>{userDetailsList}</ul>
              {profile.user?.socialMedia?.length ? (
                <section className='flex-row' style={{ width: '100%' }}>
                  <div className='icon icon-grey'>
                    <RiUserFollowFill />
                  </div>
                  <ul className='flex-row'>{socialMediaLinks}</ul>
                </section>
              ) : null}
            </div>
          </section>
          <section className='post-section flex-y-evenly' id='posts'>
            {profile.posts?.length === 0 ? (
              <p className='post-heading margin-b-s'>No Posts To Show!</p>
            ) : (
              <>
                <p className='post-heading margin-b-s'>Posts</p>
                <UserPosts />
              </>
            )}
          </section>
        </>
      </main>
    </div>
  )
}

export default Profile
