import React, { memo } from 'react'
import './Modal.css'
import { useModal } from '../../../Contexts/ModalContext'
import './Modal.css'

const Modal = ({ children }) => {
  const { showModal, setShowModal } = useModal()

  return (
    <>
      <main
        onClick={() => setShowModal({ show: false })}
        className={`${showModal?.show ? 'overlay show-overlay' : ''} overlay`}
      ></main>
      <section
        className={`${showModal?.show ? 'show-modal' : ''} modal-container`}
      >
        {children}
      </section>
    </>
  )
}

export default memo(Modal)
