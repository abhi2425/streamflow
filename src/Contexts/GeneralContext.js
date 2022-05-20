import { axios, request } from '../Utils/url'
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
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchData, setSearchData] = useState([])

  const fetchAuthUser = useCallback(async () => {
    try {
      setPageLoading(true)
      const { data } = await axios.get(`user/${username}`)
      if (data) {
        setPageLoading(false)
        setUser(data)
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
        })
    },
    [username],
  )

  const updateData = useCallback(
    async (method, data = null, url, success) => {
      setIsBtnLoading(true)
      const { status, response } = await request(url, method, data)
      if (status === 'success') {
        setIsBtnLoading(false)
        method === 'DELETE' && (await fetchAuthUser())
        success && popAlert(success, 'success')
        return response
      }
      if (status === 'failure') {
        setIsBtnLoading(false)
        popAlert('Something Went Wrong!', 'danger')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token],
  )

  const uploadPicture = useCallback(
    async (images, url, success) => {
      const formData = new FormData()
      const fieldValue = url.includes('/avatar') ? 'avatar' : 'blogImages'
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      }
      for (let image of images) formData.append(fieldValue, image)

      setIsBtnLoading(true)
      const { status, response } = await request(url, 'POST', formData, headers)

      if (status === 'success') {
        setIsBtnLoading(false)
        fieldValue === 'avatar' && (await fetchAuthUser())
        url.includes('profile/post/upload') || popAlert(success, 'success')
        return response
      }
      if (status === 'failure') {
        setIsBtnLoading(false)
        popAlert(`couldn't upload the post!`, 'danger')
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
          return true
        }
      } catch (error) {
        console.log(error)
        setIsBtnLoading(false)
        popAlert(`couldn't upload the post!`, 'danger')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const getSearchResult = useCallback(async (searchTerm = '') => {
    const url = `/search?search=${searchTerm}`
    setSearchLoading(true)
    const { response, status } = await request(url, 'GET')

    if (status === 'success') {
      setSearchLoading(false)
      setSearchData([...response?.data])
    }
    if (status === 'failure') {
      setSearchLoading(false)
      setSearchData([{ success: false }])
    }
  }, [])

  const values = useMemo(
    () => ({
      user,
      pageLoading,
      isVaultLoading,
      isBtnLoading,
      fetchedData,
      searchData,
      searchLoading,
      fetchAuthUser,
      fetchData,
      updateData,
      uploadPicture,
      createORupdatePost,
      getSearchResult,
      setSearchData,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, pageLoading, isVaultLoading, fetchedData, isBtnLoading, searchData, searchLoading],
  )

  return <GeneralContext.Provider value={values}>{children}</GeneralContext.Provider>
}

export const useGeneralContext = () => useContext(GeneralContext)
