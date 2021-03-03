import React, { memo } from 'react'
import { ImCross } from 'react-icons/im'
import { useModal } from '../../../Contexts/ModalContext'
import './Alert.css'
const Alert = () => {
   const { alert, setAlert } = useModal()
   return (
      <section className={`${alert?.show ? `show-alert ${alert?.type}` : ''} alert transition`}>
         <h1 className='alert-message'>{alert?.message}</h1>
         <i className='icon m-left-s' onClick={() => setAlert({ show: false })}>
            <ImCross />
         </i>
      </section>
   )
}
export default memo(Alert)
