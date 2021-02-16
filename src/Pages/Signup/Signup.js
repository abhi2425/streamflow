import React, { memo } from 'react'
import SignInVault from '../../ModalVaults/SignInVault/SignInVault'
import Capa from '../../Assets/Capa 4.svg'
import './Signup.css'
import { useUserContext } from '../../Contexts/UserContext'
const Signup = memo(() => {
   const { login, setLogin } = useUserContext()
   console.log('signup---Page')
   return (
      <main className='signup-page flex-x-center'>
         <div className='container flex-x-between'>
            <btn className='login-btn btn transition' onClick={() => setLogin((prev) => !prev)}>
               {!login ? 'Login' : 'Sign up'}
            </btn>
            <img src={Capa} alt='Hands Up Robot' className='capa' />
            <SignInVault />
         </div>
      </main>
   )
})
export default Signup
