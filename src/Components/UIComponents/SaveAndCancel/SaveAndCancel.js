import React, { memo } from 'react'
import { SpinButton } from '../../Loader/Loaders'
import { useModal } from '../../../Contexts/ModalContext'

const SaveAndCancel = memo(({ isBtnLoading, saveLabel }) => {
   const { setShowModal } = useModal()
   return (
      <div className='form-action flex-x-evenly margin-t-s'>
         {isBtnLoading ? (
            <SpinButton />
         ) : (
            <button className={`btn transition-slow btn-save-modal`}>
               {saveLabel ? saveLabel : 'Save'}
            </button>
         )}

         <button className='btn transition-slow btn-cancel' onClick={() => setShowModal(false)}>
            Cancel
         </button>
      </div>
   )
})

export default SaveAndCancel
