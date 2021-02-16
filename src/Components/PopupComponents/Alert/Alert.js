import React, { memo } from 'react'
import { ImCross } from 'react-icons/im'
import { useUserContext } from '../../../Contexts/UserContext'
import './Alert.css'
const Alert = memo(() => {
   const { alert, setAlert } = useUserContext()
   return (
      <section
         className={`${
            alert?.show ? `show-alert ${alert?.type}` : ''
         } alert transition flex-x-between`}>
         <h1 className='alert-message'>{alert?.message}</h1>
         <i className='icon' onClick={() => setAlert({ show: false })}>
            <ImCross />
         </i>
      </section>
   )
})
export default Alert
