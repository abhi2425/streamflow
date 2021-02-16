import React, { memo } from 'react'
import Spin from './Spinner'
import streamFlowIcon from '../../Assets/StreamFlow.......svg'
import logoutImage from '../../Assets/Logging Out.....svg'
export const SpinButton = memo(() => (
   <h1>
      <button className='btn btn-save-modal transition flex-x-between' disabled={true}>
         Loading
         <Spin styles='loader-small' />
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
         marginLeft: logout ? 'none' : '15rem',
      }}>
      <img
         src={logout ? logoutImage : streamFlowIcon}
         alt={logout ? 'Logging Out.....' : 'Loading....'}
      />
   </div>
))
export const LoadingVault = memo(() => (
   <div className='vault-style flex-x-center' style={{ height: '40rem' }}>
      <Spin styles='loader-large' />
   </div>
))
