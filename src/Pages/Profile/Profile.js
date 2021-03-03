import React, { useCallback, useEffect } from 'react'
import './Profile.css'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../Components/UIComponents/Avatar/Avatar'
import { useUserContext } from '../../Contexts/UserContext'

import Navbar from '../../Components/Navigation/Navbar/Navbar'
import FollowersVault from '../../ModalVaults/FollowersVault/FollowersVault'
import { useModal } from '../../Contexts/ModalContext'
import { ProfileContextProvider, useProfileContext } from '../../Contexts/ProfileContext'
import Spinner from '../../Components/UIComponents/Loader/Spinner'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import PlaceholderSpinner from '../../Components/UIComponents/Loader/PlaceholderSpinner'
import UserPosts from '../../Components/PostsComponents/UserPosts/UserPosts'
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
      checkCommonFollowers,
      followUnfollowHandler,
   } = useProfileContext()
   const { username: params_username } = useParams()

   useEffect(() => {
      username !== params_username && checkCommonFollowers(params_username, username)
   }, [checkCommonFollowers, params_username, username])

   useEffect(() => {
      document.title = `StreamFlow | ${params_username}`
      getUserProfile(params_username)
   }, [getUserProfile, params_username])

   const followVaultHandler = useCallback(
      (followers, following, active) => {
         setShowModal({
            show: true,
            component: (
               <ProfileContextProvider>
                  <FollowersVault
                     followData={{
                        followers,
                        following,
                     }}
                     active={active}
                     params_username={params_username}
                  />
               </ProfileContextProvider>
            ),
         })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [params_username],
   )
   return (
      <div className='page'>
         <main className='main-profile margin-t-l flex-y-evenly'>
            <Navbar />
            {pageLoading ? (
               <PlaceholderSpinner styles='lds-spinner-medium' />
            ) : (
               <>
                  <section className='profile-section flex-x-evenly'>
                     <div className='flex-y-between'>
                        <Avatar
                           avatarImageUrl={profile.user?.avatar?.image}
                           imageClass='avatar-profile'
                        />
                        <div className='flex-y-center'>
                           <p className='username'>{params_username}</p>
                           <p className='status'>{profile.user?.status || 'Status 😊'}</p>
                        </div>
                        {params_username === username ? (
                           <div className='edit-profile'>
                              <Link to='/profile/settings'> Edit Profile </Link>
                           </div>
                        ) : (
                           <button
                              className='btn btn-save transition'
                              onClick={() => followUnfollowHandler(params_username)}>
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
                                 followVaultHandler(
                                    profile.followers,
                                    profile.following,
                                    'followersList',
                                 )
                              }>
                              <div className='count'>{profile.followers?.length || 0}</div>
                              <p className='tag'>Followers</p>
                           </div>
                           <div
                              className='margin-s  transition profile-details flex-y-between'
                              onClick={() =>
                                 followVaultHandler(profile.followers, profile.following)
                              }>
                              <div className='count'>{profile.following?.length || 0}</div>
                              <p className='tag'>Following</p>
                           </div>
                        </div>
                        <ul className='user-details flex-y-start'>{userDetailsList}</ul>
                     </div>
                  </section>
                  <section className='post-section flex-y-evenly' id='posts'>
                     {profile.posts?.length === 0 ? (
                        <p className='post-heading'>No Posts To Show!</p>
                     ) : (
                        <>
                           <p className='post-heading margin-b-s'>Posts</p>
                           <UserPosts />
                        </>
                     )}
                  </section>
               </>
            )}
         </main>
      </div>
   )
}

export default Profile
