import React, { memo, useCallback } from 'react'
import './Avatar.css'
import FormInput from '../../FormComponents/FormInput/FormInput'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FiUploadCloud } from 'react-icons/fi'
import { FaUserAlt } from 'react-icons/fa'
import { useModal } from '../../../Contexts/ModalContext'
import AvatarVault from '../../../ModalVaults/AvatarVault/AvatarVault'
import { useSettingContext } from '../../../Contexts/SettingContext'

const Avatar = memo(({ imageClass, iconClass, imageUrl }) => {
   const { setShowModal } = useModal()
   const { user, updateData: removeAvatar } = useSettingContext()

   const displayAvatar = useCallback(
      ({ target }) => {
         const avatarUrl = target.files ? URL.createObjectURL(target.files[0]) : ''
         setShowModal({
            show: true,
            component: <AvatarVault avatarUrl={avatarUrl} avatar={target.files} />,
         })
      },
      [setShowModal],
   )

   const deleteAvatar = useCallback(async () => {
      const success = 'Profile pic deleted!'
      await removeAvatar('DELETE', null, `profile/me/delete/${user.avatar?.publicId}`, success)
   }, [removeAvatar, user.avatar?.publicId])

   return (
      <div style={{ position: 'relative', cursor: 'pointer' }} className='avatar-box'>
         {iconClass && (
            <div className={`${iconClass[0]} flex-y-between transition`}>
               <FormInput
                  label={
                     <i className={`${iconClass[1]} transition`}>
                        <FiUploadCloud />
                     </i>
                  }
                  name='avatar'
                  type='file'
                  accept='image/*'
                  optionalStyles={'input-as-avatar'}
                  changeHandler={(e) => displayAvatar(e)}
               />
               <i className={`${iconClass[2]} transition`} onClick={() => deleteAvatar()}>
                  <RiDeleteBinLine />
               </i>
            </div>
         )}
         {user.avatar?.image || imageUrl ? (
            <img
               src={imageUrl || user.avatar?.image}
               alt='Avatar'
               style={{
                  objectFit: 'cover',
                  borderRadius: '50%',
               }}
               className={imageClass}
            />
         ) : (
            <i className={imageClass}>
               <FaUserAlt />
            </i>
         )}
      </div>
   )
})

export default Avatar
