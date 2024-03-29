import React, { memo } from 'react'
import Spinner from './Spinner'
import Loader from './Spinner'

export const SpinButton = memo(({ spinClass, fullWidth }) => (
  <div style={{ width: fullWidth ? '100%' : 'auto' }}>
    <button
      style={{ width: '100%' }}
      className={`btn ${spinClass} transition flex-x-center`}
      disabled={true}
    >
      <div className='flex-x-between'>
        Loading..
        <Spinner styles='loader-small' />
      </div>
    </button>
  </div>
))

export const StreamFlowLoading = memo(({ logout }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    }}
    className='flex-x-between'
  >
    <pre style={{}} className='streamflow'>
      {logout ? 'Logging Out...' : 'StreamFlow...'}
    </pre>
    <Loader styles='loader-medium' />
  </div>
))
export const LoadingVault = memo(() => (
  <div className='vault-style flex-x-center' style={{ height: '40rem' }}>
    <Spinner styles='loader-large' />
  </div>
))
