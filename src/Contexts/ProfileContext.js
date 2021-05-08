import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import date from 'date-and-time'
import { axios } from '../Utils/url'

import { ImClock, ImLocation } from 'react-icons/im'
import { IoSchoolSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import { CgChevronDoubleRightO } from 'react-icons/cg'
import { useGeneralContext } from './GeneralContext'
import { useHistory } from 'react-router-dom'
const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({})
  const [pageLoading, setPageLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const { updateData: followHandler } = useGeneralContext()
  const history = useHistory()

  const getUserProfile = useCallback(async (uname) => {
    try {
      setPageLoading(true)
      const { data: user } = await axios.get(`user/${uname}`)
      const { data: posts } = await axios.get(`${uname}/posts`)
      const { data: followers } = await axios.get(`user/${uname}/followers`)
      const { data: following } = await axios.get(`user/${uname}/following`)
      if (user && posts && followers && following) {
        setProfile({
          user,
          posts,
          followers,
          following,
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

  const getFollowingListOfLoggedInUser = useCallback(async (loggedInUser) => {
    try {
      const { data: following } = await axios.get(
        `user/${loggedInUser}/following`
      )
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
        return response
      }
    },
    [followHandler, isFollowing]
  )

  const userDetails = useMemo(() => {
    const user = profile.user
    return [
      {
        icon: <ImClock />,
        details: `Joined on-> ${date.format(
          new Date(Date.parse(user?.createdAt)),
          'ddd, MMM DD YYYY'
        )}`,
      },
      {
        icon: <IoSchoolSharp />,
        details: (
          <p>
            {user?.eduQualification
              ? `${user?.eduQualification.institution},
                        ${user?.eduQualification.name},
                        ${user?.eduQualification.subject}`
              : 'Education'}
          </p>
        ),
      },
      {
        icon: <CgChevronDoubleRightO />,
        details:
          user?.interests.length > 1 ? (
            <p>
              {user?.interests.map((interest, index) => (
                <span key={index}>
                  {user.interests.length - 1 !== index
                    ? `${interest}, `
                    : `${interest}`}
                </span>
              ))}
            </p>
          ) : (
            <p>Interests</p>
          ),
      },
      {
        icon: <MdWork />,
        details: (
          <p>
            {user?.currentlyWorking
              ? `${user?.currentlyWorking?.description}, 
                        ${user?.currentlyWorking?.startedIn}`
              : 'Work'}
          </p>
        ),
      },
      {
        icon: <ImLocation />,
        details: (
          <p>
            {user?.address
              ? `${user?.address?.country}, 
                        ${user?.address?.state},`
              : 'Address'}
            <br />
            {user?.address
              ? `${user?.address?.city},
                        ${user?.address?.pinCode}`
              : ''}
          </p>
        ),
      },
    ]
  }, [profile.user])

  const userDetailsList = useMemo(
    () =>
      userDetails.map((item, index) => (
        <li key={index} className='user-details-list'>
          <i className='icon icon-grey'>{item.icon}</i>
          <div className='content'>{item.details}</div>
        </li>
      )),
    [userDetails]
  )
  //-----------------//

  const value = useMemo(
    () => ({
      profile,
      pageLoading,
      userDetailsList,
      isFollowing,
      getUserProfile,
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
