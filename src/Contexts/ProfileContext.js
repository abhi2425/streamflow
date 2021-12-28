import React, { createContext, useContext, useMemo, useState } from 'react'
import { axios, request } from '../Utils/url'
import { useGeneralContext } from './GeneralContext'
import { useHistory } from 'react-router-dom'
import { generateUserDetailList } from '../Utils/userDetailsList'
import { generateSocialMediaLinks } from '../Utils/socialMediaList'
const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({})
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])

  const [pageLoading, setPageLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const { updateData: followHandler } = useGeneralContext()
  const history = useHistory()

  const getUserProfile = async (uname) => {
    try {
      setPageLoading(true)
      const { data: user } = await axios.get(`user/${uname}`)
      const { data: posts } = await axios.get(`${uname}/posts`)
      if (user && posts) {
        setProfile({
          user,
          posts,
        })
        setPageLoading(false)
      }
    } catch (error) {
      setPageLoading(false)
    }
  }

  const getFollowers = async (uname) => {
    const {
      response: { data: followers },
    } = await request(`user/${uname}/followers`, 'GET')
    setFollowers(followers)
  }
  const getFollowings = async (uname) => {
    const {
      response: { data: following },
    } = await request(`user/${uname}/following`, 'GET')
    setFollowings(following)
  }

  const getFollowingListOfLoggedInUser = async (loggedInUser) => {
    try {
      const url = `user/${loggedInUser}/following`
      const { data: following } = await axios.get(url)
      return following
    } catch (error) {
      console.log(error.message)
    }
  }

  const checkCommonFollowers = async (uname, loggedInUser) => {
    const followingList = await getFollowingListOfLoggedInUser(loggedInUser)
    if (followingList) {
      const isFound = followingList.findIndex((list) => list.userName === uname)
      isFound === -1 ? setIsFollowing(false) : setIsFollowing(true)
      return isFound
    }
  }

  const followUnfollowHandler = async (username) => {
    const url = `profile/user/${username}/followOrUnfollow`
    const success = `you ${isFollowing ? 'unfollowed' : 'followed'} ${username}`
    const response = await followHandler('PATCH', null, url, success)
    if (response) {
      setIsFollowing((prev) => !prev)
      await getFollowers(username)
      await getFollowings(username)
      return response
    }
  }

  const userDetailsList = useMemo(
    () =>
      generateUserDetailList(profile.user).map((item, index) => (
        <li key={index} className='user-details-list'>
          <i className='icon icon-grey'>{item.icon}</i>
          <div className='content'>{item.details}</div>
        </li>
      )),
    [profile.user]
  )

  const socialMediaLinks = useMemo(
    () =>
      profile.user &&
      generateSocialMediaLinks(profile.user).map(({ url, icon }, index) => {
        return (
          <li key={index} style={{ display: 'block' }} className='m-left-s'>
            <a href={url} target='blank'>
              <i className='icon icon-blue transition'>{icon}</i>
            </a>
          </li>
        )
      }),
    [profile.user]
  )

  return (
    <ProfileContext.Provider
      value={{
        profile,
        followers,
        followings,
        pageLoading,
        userDetailsList,
        isFollowing,
        socialMediaLinks,
        getUserProfile,
        getFollowers,
        getFollowings,
        checkCommonFollowers,
        followUnfollowHandler,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = () => useContext(ProfileContext)
