import React from 'react'
import { useModal } from '../../Contexts/ModalContext'
import AddressVault from '../../ModalVaults/AddressVault/AddressVault'
import EducationVault from '../../ModalVaults/EducationVault/EducationVault'
import InterestsVault from '../../ModalVaults/InterestsVault/InterestsVault'
import PasswordVault from '../../ModalVaults/PasswordVault/PasswordVault'
import WorkVault from '../../ModalVaults/WorkVault/WorkVault'

const AdvanceSettings = ({ user }) => {
  const { setShowModal } = useModal()
  return (
    <div className='flex-y-start adv-settings margin-t-s'>
      <button
        className='btn transition-slow btn-save'
        onClick={() => {
          setShowModal({
            show: true,
            component: <PasswordVault />,
          })
        }}
      >
        Change Password
      </button>
      <button
        className='btn transition-slow btn-save'
        onClick={() => {
          setShowModal({
            show: true,
            component: <WorkVault workData={user.currentlyWorking} />,
          })
        }}
      >
        Work Status
      </button>
      <button
        className='btn transition-slow btn-save'
        onClick={() => {
          setShowModal({
            show: true,
            component: <EducationVault />,
          })
        }}
      >
        Education
      </button>
      <button
        className='btn transition-slow btn-save'
        onClick={() => {
          setShowModal({
            show: true,
            component: <AddressVault />,
          })
        }}
      >
        Address
      </button>
      <button
        className='btn transition-slow btn-save'
        onClick={() => {
          setShowModal({
            show: true,
            component: <InterestsVault interests={user.interests} />,
          })
        }}
      >
        Interests
      </button>
    </div>
  )
}

export default AdvanceSettings
