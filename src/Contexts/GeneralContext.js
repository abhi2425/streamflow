import { axios } from '../Utils/url'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useModal } from './ModalContext'
import { useUserContext } from './UserContext'
export const GeneralContext = createContext()

export const GeneralContextProvider = ({ children }) => {
   const { popAlert } = useModal()
   const {
      userData: { username, token },
   } = useUserContext()
   const [pageLoading, setPageLoading] = useState(true)
   const [user, setUser] = useState({})
   const [isVaultLoading, setIsVaultLoading] = useState(false)
   const [isBtnLoading, setIsBtnLoading] = useState(false)
   const [fetchedData, setFetchedData] = useState({})

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
         setIsVaultLoading(true)
         axios
            .get(`user/${username}/${filter}`)
            .then(({ data }) => {
               setIsVaultLoading(false)
               setFetchedData(data?.[0].data)
            })
            .catch((error) => {
               setIsVaultLoading(false)
               console.log(error)
            })
      },
      [username],
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
               setIsBtnLoading(false)
               method === 'DELETE' && (await fetchAuthUser())
               url.includes('post/create') ||
                  url.includes('post/update') ||
                  popAlert(success, 'success')
               return response
            }
         } catch (error) {
            setIsBtnLoading(false)
            popAlert('Something Went Wrong!', 'danger')
            console.log(error)
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
               setIsBtnLoading(false)
               fieldValue === 'avatar' && (await fetchAuthUser())
               url.includes('profile/post/upload') || popAlert(success, 'success')
               return response
            }
         } catch (error) {
            console.log(error)
            popAlert('Something Went Wrong!', 'danger')
         }
      }, // eslint-disable-next-line react-hooks/exhaustive-deps
      [token],
   )

   const createORupdatePost = useCallback(
      async (method, url, success, { title, body, postImages }) => {
         try {
            setIsBtnLoading(true)
            title = title.replace(/\s/g, '-')

            const postResponse = await updateData(method, { title, body }, url)
            const imageResponse =
               postImages?.length &&
               postResponse &&
               (await uploadPicture(postImages, `profile/post/upload/${title}`))

            const condition = postImages.length !== 0 ? postResponse && imageResponse : postResponse
            if (condition) {
               setIsBtnLoading(false)
               popAlert(success, 'success')
            }
         } catch (error) {
            console.log(error)
            popAlert('Something Went Wrong!', 'danger')
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
   )
   const updateUserDataOnSubmit = useCallback(async (data) => {
      console.log(data)
   }, [])
   const values = useMemo(
      () => ({
         user,
         pageLoading,
         isVaultLoading,
         isBtnLoading,
         fetchedData,
         fetchAuthUser,
         fetchData,
         updateData,
         uploadPicture,
         createORupdatePost,
         updateUserDataOnSubmit,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [user, pageLoading, isVaultLoading, fetchedData, isBtnLoading],
   )

   return <GeneralContext.Provider value={values}>{children}</GeneralContext.Provider>
}

export const useGeneralContext = () => useContext(GeneralContext)
