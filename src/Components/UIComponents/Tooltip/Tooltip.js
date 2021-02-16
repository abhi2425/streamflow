import React, { memo, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useModal } from '../../../Contexts/ModalContext'

import AddressVault from '../../../ModalVaults/AddressVault/AddressVault'
import EducationVault from '../../../ModalVaults/EducationVault/EducationVault'
import InterestsVault from '../../../ModalVaults/InterestsVault/InterestsVault'
import PasswordVault from '../../../ModalVaults/PasswordVault/PasswordVault'
import WorkVault from '../../../ModalVaults/WorkVault/WorkVault'

const Tooltip = memo(() => {
   const { setShowModal } = useModal()
   const [showTooltip, setShowTooltip] = useState(false)
   return (
      <div className='tooltip' onMouseLeave={() => setShowTooltip(false)}>
         <i className='icon-blue transition' onMouseOver={() => setShowTooltip(true)}>
            <BsThreeDotsVertical />
         </i>
         <article className={`${showTooltip ? 'show-tooltip' : ''} tooltip-content`}>
            <button
               className='btn transition-slow btn-save-modal'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <PasswordVault />,
                  })
               }}>
               Change Password
            </button>
            <button
               className='btn transition-slow btn-save-modal'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <WorkVault />,
                  })
               }}>
               Work Status
            </button>
            <button
               className='btn transition-slow btn-save-modal'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <EducationVault />,
                  })
               }}>
               Education
            </button>
            <button
               className='btn transition-slow btn-save-modal'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <AddressVault />,
                  })
               }}>
               Address
            </button>
            <button
               className='btn transition-slow btn-save-modal'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <InterestsVault />,
                  })
               }}>
               Interests
            </button>
         </article>
      </div>
   )
})

export default Tooltip
