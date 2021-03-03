import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserContext } from '../../Contexts/UserContext'
const PrivateRoute = ({ children, ...props }) => {
   const {
      userData: { token },
   } = useUserContext()
   return <Route {...props} render={() => (token ? children : <Redirect to='/' />)} />
}
export default PrivateRoute
