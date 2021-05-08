export const getUserFromLocalStorage = () => {
  return localStorage.getItem('user-data')
    ? JSON.parse(localStorage.getItem('user-data'))
    : { userName: null, token: null, avatarUrl: null }
}

// export const getProfileFromLocalStorage = () => {
//   return localStorage.getItem('user-profile')
//     ? JSON.parse(localStorage.getItem('user-profile'))
//     : {}
// }
