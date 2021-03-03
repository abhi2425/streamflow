import React, { memo } from 'react'
import Spinner from './Spinner'
import streamFlowImage from '../../../Assets/StreamFlow.svg'
import logoutImage from '../../../Assets/Logging Out.svg'
import Loader from './Spinner'
export const SpinButton = memo(({ spinClass }) => (
   <h1>
      <button className={`btn ${spinClass} transition flex-x-between`} disabled={true}>
         Loading
         <Spinner styles='loader-small' />
      </button>
   </h1>
))

export const StreamFlowLoading = memo(({ logout }) => (
   <div
      style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%,-50%)',
      }}
      className='flex-x-between'>
      <img
         src={logout ? logoutImage : streamFlowImage}
         alt={logout ? 'Logging Out.....' : 'Loading....'}
      />
      <Loader styles='loader-medium' />
   </div>
))
export const LoadingVault = memo(() => (
   <div className='vault-style flex-x-center' style={{ height: '40rem' }}>
      <Spinner styles='loader-large' />
   </div>
))
