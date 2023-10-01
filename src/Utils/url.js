import axios from 'axios'
import { getDataFromLocalStorage } from './localStorage'

export const BASE_URL = 'https://streamflow-blog-api.vercel.app/'
export const source = axios.CancelToken.source()
axios.defaults.baseURL = BASE_URL
export { axios }

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  async (config) => {
    const userData = getDataFromLocalStorage('user-data')
    if (userData?.token)
      config.headers.Authorization = `Bearer ${userData?.token}`
    return config
  },
  (error) => Promise.reject(error)
)

export const request = async (
  url = '',
  method = '',
  data = null,
  headers = {}
) => {
  try {
    const response = await axiosInstance({ url, method, data, headers })
    return { response, status: 'success' }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    }

    return {
      response: error.response,
      status: 'failure',
    }
  }
}
