export const getUserFromLocalStorage = () => {
  return localStorage.getItem('user-data')
    ? JSON.parse(localStorage.getItem('user-data'))
    : { userName: null, token: null, avatarUrl: null }
}

export const getDataFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    if (data) return JSON.parse(data)

    return null
  } catch (error) {
    console.log(error)
    return null
  }
}
