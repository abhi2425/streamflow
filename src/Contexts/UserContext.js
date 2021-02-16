import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { axios } from '../Utils/url'
import { useHistory } from 'react-router-dom'
import { getUserFromLocalStorage } from '../Utils/localStorage'
export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(false)
   const [login, setLogin] = useState(false)
   const [userData, setUserData] = useState(() => getUserFromLocalStorage())
   const [alert, setAlert] = useState({})

   const history = useHistory()
   console.log('userContext----------------->')

   const popAlert = useCallback((message, type) => {
      setIsLoading(false)
      setAlert({
         show: true,
         message,
         type,
      })
      setTimeout(() => setAlert({ show: false }), 3500)
   }, [])

   const signIn_login_OnSubmit = useCallback(
      async (formData, url) => {
         try {
            setIsLoading(true)
            const { data } = await axios({
               url,
               method: 'POST',
               headers: {
                  'Access-Control-Allow-Origin': '*',
               },
               data: formData,
            })

            if (data) {
               setUserData({
                  token: data.token,
                  username: data.user.userName,
               })
               localStorage.setItem(
                  'user-data',
                  JSON.stringify({
                     token: data?.token,
                     username: data.user?.userName,
                  }),
               )
               history.push('/profile')
               popAlert(`Hii ${data?.user?.userName} welcome in streamFlow!`, 'success')
            }
         } catch (e) {
            console.log(e.message)
            popAlert('Something Went wrong! Try again.', 'danger')
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [setIsLoading, setUserData],
   )
   const logoutUser = useCallback(async () => {
      try {
         const response = await axios({
            url: 'profile/user/logout',
            method: 'POST',
            headers: {
               'Access-Control-Allow-Origin': '*',
               Authorization: `Bearer ${userData?.token}`,
            },
         })
         response && localStorage.removeItem('user-data')
         response && history.push('/')
      } catch (error) {
         console.log(error.message)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userData?.token])

   const value = useMemo(
      () => ({
         isLoading,
         userData,
         login,
         alert,
         setAlert,
         setLogin,
         setIsLoading,
         logoutUser,
         signIn_login_OnSubmit,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isLoading, login, alert, userData],
   )

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
