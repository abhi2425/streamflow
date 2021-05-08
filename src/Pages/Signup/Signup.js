import React from 'react'
import SignInVault from '../../ModalVaults/SignInVault/SignInVault'
import pic from '../../Assets/Capa 4.svg'
import './Signup.css'
const Signup = () => {
  return (
    <main className='signup-page flex-x-center'>
      <div className='container flex-x-evenly margin-t-l'>
        <img src={pic} alt='Hands Up Robot' className='capa' />
        <SignInVault />
      </div>
    </main>
  )
}
export default Signup
