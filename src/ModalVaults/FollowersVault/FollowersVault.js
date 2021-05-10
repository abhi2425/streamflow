import React, { useMemo } from 'react'
import FollowerList from '../../Components/FollowComponents/FollowerList'
import FollowingList from '../../Components/FollowComponents/FollowingList'
import './FollowersVault.css'

const FollowersVault = ({ followData, active, params_username }) => {
  const followersList = useMemo(
    () =>
      followData.followers?.map((follower, index) => (
        <FollowerList
          follower={follower}
          key={index}
          params_username={params_username}
        />
      )),

    [followData.followers, params_username]
  )
  const followingList = useMemo(
    () =>
      followData.following?.map((following, index) => (
        <FollowingList
          following={following}
          key={index}
          params_username={params_username}
        />
      )),
    [followData.following, params_username]
  )
  return (
    <section
      className='vault-style flex-y-between'
      style={{ height: '60rem', overflow: 'auto' }}
    >
      {active === 'followersList' ? (
        <div className='follow-container'>
          <p className='follow-count'>
            {`${followData.followers?.length || '0'} Followers`}
          </p>
          {followersList}
        </div>
      ) : (
        <div className='follow-container'>
          <p className='follow-count'>
            {`${followData.following?.length || '0'} Following`}
          </p>
          {followingList}
        </div>
      )}
    </section>
  )
}

export default FollowersVault
