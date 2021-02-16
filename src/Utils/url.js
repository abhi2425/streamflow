import axios from 'axios'

export const BASE_URL = 'https://node-stream-flow-blog-api.herokuapp.com/'

axios.defaults.baseURL = BASE_URL
export { axios }
