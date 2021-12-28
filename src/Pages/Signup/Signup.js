import React from 'react'
import SignInVault from '../../ModalVaults/SignInVault/SignInVault'
import pic from '../../Assets/Capa 4.svg'
import './Signup.css'
const Signup = () => {
  return (
    <main className='signup-page'>
      <div className='m-left-s margin-b-s' style={{ paddingTop: '1.5rem' }}>
        <pre className='streamflow' style={{ color: 'white' }}>
          StreamFlow
        </pre>
      </div>

      <main style={{ paddingBottom: '2.5rem' }}>
        <div className='flex-x-evenly '>
          <img src={pic} alt='Hands Up Robot' className='capa' />
          <SignInVault />
        </div>
      </main>
    </main>
  )
}
export default Signup
