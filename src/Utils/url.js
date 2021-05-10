import axios from 'axios'

export const BASE_URL = 'https://node-stream-flow-blog-api.herokuapp.com/'
// export const BASE_URL = (axios.defaults.baseURL = 'http://localhost:5000/')
export const source = axios.CancelToken.source()
axios.defaults.baseURL = BASE_URL
export { axios }
