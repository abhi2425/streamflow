import axios from 'axios'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useModal } from './ModalContext'
import { useUserContext } from './UserContext'
export const SettingContext = createContext()

export const SettingContextProvider = ({ children }) => {
   const {
      userData: { username, token },
      alert,
      setAlert,
   } = useUserContext()
   const { setShowModal } = useModal()
   const [pageLoading, setPageLoading] = useState(true)
   const [user, setUser] = useState({})
   const [isVaultLoading, setIsVaultLoading] = useState(false)
   const [isBtnLoading, setIsBtnLoading] = useState(false)
   const [fetchedData, setFetchedData] = useState({})

   console.log('Setting Contexts.......')
   const fetchAuthUser = useCallback(async () => {
      try {
         setPageLoading(true)
         const { data } = await axios.get(`user/${username}`)
         if (data) {
            setPageLoading(false)
            setUser(data)
            console.log(data)
         }
      } catch (error) {
         console.log(error.message)
         setPageLoading(false)
      }
   }, [username])

   const fetchData = useCallback(
      (filter) => {
         console.log('inside fetch')
         setIsVaultLoading(true)
         axios
            .get(`user/${username}/${filter}`)
            .then(({ data }) => {
               console.log(data)
               setIsVaultLoading(false)
               setFetchedData(data?.[0].data)
            })
            .catch((error) => {
               setIsVaultLoading(false)
               console.log(error.message)
            })
      },
      [username],
   )

   const popAlert = useCallback(
      (message, type) => {
         setIsBtnLoading(false)
         setShowModal(false)
         setAlert({
            show: message ? true : false,
            message,
            type,
         })
         setTimeout(() => setAlert({ show: false }), 3500)
      },
      [setAlert, setShowModal],
   )
   const updateData = useCallback(
      async (method, data = null, url, success) => {
         try {
            setIsBtnLoading(true)
            const response = await axios({
               url,
               method,
               headers: {
                  'Access-Control-Allow-Origin': '*',
                  Authorization: `Bearer ${token}`,
               },
               data,
            })
            if (response) {
               console.log(response)
               method === 'DELETE' && (await fetchAuthUser())
               url.includes('post/create') || popAlert(success, 'success')
               return response
            }
         } catch (error) {
            console.log(error.message)
            setIsBtnLoading(false)
            popAlert('Something Went Wrong!', 'danger')
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [token],
   )
   const uploadPicture = useCallback(
      async (images, url, success) => {
         try {
            setIsBtnLoading(true)
            const formData = new FormData()
            const fieldValue = url.includes('/avatar') ? 'avatar' : 'blogImages'
            for (let image of images) {
               formData.append(fieldValue, image)
            }
            const response = await axios({
               url,
               method: 'POST',
               headers: {
                  'Content-Type': 'multipart/form-data',
                  'Access-Control-Allow-Origin': '*',
                  Authorization: `Bearer ${token}`,
               },
               data: formData,
            })
            if (response) {
               fieldValue === 'avatar' && (await fetchAuthUser())
               url.includes('/post/upload') || popAlert(success, 'success')
               return response
            }
         } catch (error) {
            console.log(error.message)
            popAlert('Something Went Wrong!', 'danger')
         }
      }, // eslint-disable-next-line react-hooks/exhaustive-deps
      [token],
   )
   const createPost = useCallback(async ({ title, body, postImages }) => {
      try {
         setIsBtnLoading(true)
         let imageResponse = null
         title = title.replace(/\s/g, '-')
         const postResponse = await updateData('POST', { title, body }, 'profile/post/create')

         if (postImages?.length && postResponse) {
            imageResponse = await uploadPicture(postImages, `profile/post/upload/${title}`)
            console.log(imageResponse)
         }
         const condition = postImages ? postResponse && imageResponse : postResponse
         if (condition) {
            popAlert('Post Created!', 'success')
            return { postResponse, imageResponse }
         }
         setIsBtnLoading(false)
      } catch (error) {
         console.log(error.message)
         popAlert('Something Went Wrong!', 'danger')
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const updateUserDataOnSubmit = useCallback(async (data) => {
      console.log(data)
   }, [])
   const values = useMemo(
      () => ({
         user,
         alert,
         pageLoading,
         isVaultLoading,
         isBtnLoading,
         fetchedData,
         setAlert,
         fetchAuthUser,
         fetchData,
         updateData,
         uploadPicture,
         createPost,
         updateUserDataOnSubmit,
      }),

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [user, alert, pageLoading, isVaultLoading, fetchedData, isBtnLoading],
   )

   return <SettingContext.Provider value={values}>{children}</SettingContext.Provider>
}

export const useSettingContext = () => useContext(SettingContext)
