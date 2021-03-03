import React, { memo } from 'react'
import { SpinButton } from '../Loader/Loaders'
import { useModal } from '../../../Contexts/ModalContext'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../../Contexts/UserContext'

const SaveAndCancel = ({ isBtnLoading, label }) => {
   const { setShowModal } = useModal()
   const {
      userData: { username },
   } = useUserContext()
   return (
      <div className='form-action flex-x-evenly margin-t-s'>
         {isBtnLoading ? (
            <SpinButton spinClass='btn-save' />
         ) : (
            <button className={`btn transition-slow btn-save`}>{label || 'Save'}</button>
         )}

         {label === 'Update' ? (
            <Link to={`/profile/${username}`}>
               <button className='btn transition-slow btn-cancel'>Cancel</button>
            </Link>
         ) : (
            <button className='btn transition-slow btn-cancel' onClick={() => setShowModal(false)}>
               Cancel
            </button>
         )}
      </div>
   )
}

export default memo(SaveAndCancel)
