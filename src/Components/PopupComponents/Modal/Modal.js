import React, { memo } from 'react'
import './Modal.css'
import { ImCross } from 'react-icons/im'
import { useModal } from '../../../Contexts/ModalContext'
const Modal = ({ children }) => {
   const { showModal, setShowModal } = useModal()
   console.log('Modal ')
   return (
      <main className={showModal.show ? 'overlay transition show-overlay' : 'overlay transition'}>
         <section
            className={
               showModal.show
                  ? 'modal-container transition show-modal'
                  : 'modal-container transition'
            }>
            <i className='icon cancel' onClick={() => setShowModal(false)}>
               <ImCross />
            </i>
            {children}
         </section>
      </main>
   )
}

export default memo(Modal)
