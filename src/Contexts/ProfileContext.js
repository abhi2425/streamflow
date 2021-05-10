import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { axios } from '../Utils/url'
import { useGeneralContext } from './GeneralContext'
import { useHistory } from 'react-router-dom'
import { generateUserDetailList } from '../Utils/userDetailsList'
import { generateSocialMediaLinks } from '../Utils/socialMediaList'
const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({})
  const [followers, setFollowers] = useState({})
  const [followings, setFollowings] = useState({})

  const [pageLoading, setPageLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const { updateData: followHandler } = useGeneralContext()
  const history = useHistory()

  const getUserProfile = useCallback(async (uname) => {
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
      console.log(error.message)
      setPageLoading(false)
      history.push('/error')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getFollowers = useCallback(async (uname) => {
    const { data: followers } = await axios.get(`user/${uname}/followers`)
    setFollowers(followers)
  }, [])
  const getFollowings = useCallback(async (uname) => {
    const { data: following } = await axios.get(`user/${uname}/following`)
    setFollowings(following)
  }, [])

  const getFollowingListOfLoggedInUser = useCallback(async (loggedInUser) => {
    try {
      const url = `user/${loggedInUser}/following`
      const { data: following } = await axios.get(url)
      return following
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  const checkCommonFollowers = useCallback(
    async (uname, loggedInUser) => {
      const followingList = await getFollowingListOfLoggedInUser(loggedInUser)
      if (followingList) {
        const isFound = followingList.findIndex(
          (list) => list.userName === uname
        )
        isFound === -1 ? setIsFollowing(false) : setIsFollowing(true)
        return isFound
      }
    },
    [getFollowingListOfLoggedInUser]
  )
  const followUnfollowHandler = useCallback(
    async (username) => {
      const url = `profile/user/${username}/followOrUnfollow`
      const success = `you ${
        isFollowing ? 'unfollowed' : 'followed'
      } ${username}`
      const response = await followHandler('PATCH', null, url, success)
      if (response) {
        setIsFollowing((prev) => !prev)
        await getFollowers(username)
        await getFollowings(username)
        return response
      }
    },
    [isFollowing, followHandler, getFollowers, getFollowings]
  )

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
        const href = `https://${url}.com`
        return (
          <li key={index} style={{ display: 'block' }} className='m-left-s'>
            <a href={href} target='blank'>
              <i className='icon icon-blue transition'>{icon}</i>
            </a>
          </li>
        )
      }),
    [profile.user]
  )
  //-----------------//

  const value = useMemo(
    () => ({
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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile, pageLoading, userDetailsList, isFollowing]
  )
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export const useProfileContext = () => useContext(ProfileContext)
