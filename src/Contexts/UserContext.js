/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { axios } from '../Utils/url'
import { useHistory } from 'react-router-dom'
import { getUserFromLocalStorage } from '../Utils/localStorage'
import { useModal } from './ModalContext'
export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(() => getUserFromLocalStorage())
  const { popAlert } = useModal()
  const history = useHistory()

  const signIn_login_OnSubmit = useCallback(
    async (formData, url) => {
      const headers = { 'Access-Control-Allow-Origin': '*' }
      try {
        setIsLoading(true)
        const { data } = await axios({
          url,
          method: 'POST',
          headers,
          data: formData,
        })
        if (data) {
          const message = `Hii ${data.user?.userName} welcome in streamFlow!`
          setUserData({
            token: data.token,
            username: data.user?.userName,
          })

          localStorage.setItem(
            'user-data',
            JSON.stringify({
              token: data?.token,
              username: data.user?.userName,
            })
          )
          localStorage.setItem(
            'avatar',
            JSON.stringify(data.user.avatar?.image)
          )
          history.push('/')
          popAlert(message, 'success', setIsLoading)
        }
      } catch (e) {
        const message = 'Wrong Credentials! Plz try again.'
        setIsLoading(false)
        popAlert(message, 'danger', setIsLoading)
      }
    },
    [setIsLoading, setUserData]
  )

  const logoutUser = useCallback(async () => {
    try {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userData?.token}`,
      }
      const response = await axios({
        url: 'profile/user/logout',
        method: 'POST',
        headers,
      })
      if (response) {
        const keys = Object.keys(localStorage)
        for (const key of keys) localStorage.removeItem(key)
        history.push('/signup')
      }
    } catch (error) {
      console.log(error.message)
    }
  }, [userData?.token])

  const value = useMemo(
    () => ({
      isLoading,
      userData,
      logoutUser,
      signIn_login_OnSubmit,
    }),
    [isLoading, userData]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
