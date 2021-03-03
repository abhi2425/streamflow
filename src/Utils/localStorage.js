export const getUserFromLocalStorage = () => {
   return localStorage.getItem('user-data')
      ? JSON.parse(localStorage.getItem('user-data'))
      : { userName: null, token: null, avatarUrl: null }
}
