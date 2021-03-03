import React, { memo, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useGeneralContext } from '../../../Contexts/GeneralContext'
import { useModal } from '../../../Contexts/ModalContext'

import AddressVault from '../../../ModalVaults/AddressVault/AddressVault'
import EducationVault from '../../../ModalVaults/EducationVault/EducationVault'
import InterestsVault from '../../../ModalVaults/InterestsVault/InterestsVault'
import PasswordVault from '../../../ModalVaults/PasswordVault/PasswordVault'
import WorkVault from '../../../ModalVaults/WorkVault/WorkVault'

const Tooltip = () => {
   const { setShowModal } = useModal()
   const [showTooltip, setShowTooltip] = useState(false)
   const { user } = useGeneralContext()
   return (
      <div className='tooltip' onMouseLeave={() => setShowTooltip(false)}>
         <i className='icon-blue transition' onMouseOver={() => setShowTooltip(true)}>
            <BsThreeDotsVertical />
         </i>
         <article className={`${showTooltip ? 'show-tooltip' : ''} tooltip-content`}>
            <button
               className='btn transition-slow btn-save'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <PasswordVault />,
                  })
               }}>
               Change Password
            </button>
            <button
               className='btn transition-slow btn-save'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <WorkVault workData={user.currentlyWorking} />,
                  })
               }}>
               Work Status
            </button>
            <button
               className='btn transition-slow btn-save'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <EducationVault />,
                  })
               }}>
               Education
            </button>
            <button
               className='btn transition-slow btn-save'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <AddressVault />,
                  })
               }}>
               Address
            </button>
            <button
               className='btn transition-slow btn-save'
               onClick={() => {
                  setShowModal({
                     show: true,
                     component: <InterestsVault interests={user.interests} />,
                  })
               }}>
               Interests
            </button>
         </article>
      </div>
   )
}

export default memo(Tooltip)
