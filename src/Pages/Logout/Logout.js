import React, { useEffect } from 'react'
import { StreamFlowLoading } from '../../Components/Loader/Loaders'
import { useUserContext } from '../../Contexts/UserContext'
const Logout = () => {
   const { logoutUser } = useUserContext()

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => logoutUser(), [])
   return (
      <>
         <StreamFlowLoading logout={true} />
      </>
   )
}
export default Logout
