import React, { memo, useCallback } from 'react'
import './Avatar.css'
import FormInput from '../../FormComponents/FormInput/FormInput'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FiUploadCloud } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { useModal } from '../../../Contexts/ModalContext'
import AvatarVault from '../../../ModalVaults/AvatarVault/AvatarVault'
import { useGeneralContext } from '../../../Contexts/GeneralContext'

const Avatar = ({ imageClass, iconClass, localImageUrl, avatarImageUrl, onClick }) => {
  const { setShowModal } = useModal()
  const { user, updateData: removeAvatar } = useGeneralContext()

  const displayAvatar = useCallback(
    ({ target }) => {
      const avatarUrl = target.files ? URL.createObjectURL(target.files[0]) : ''
      setShowModal({
        show: true,
        component: <AvatarVault avatarUrl={avatarUrl} avatar={target.files} />,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const deleteAvatar = useCallback(async () => {
    const success = 'Profile pic deleted!'
    const url = `profile/me/delete/${user.avatar?.publicId}`
    user.avatar?.publicId && (await removeAvatar('DELETE', null, url, success))
    user.avatar?.publicId && localStorage.removeItem('avatar')
  }, [removeAvatar, user.avatar?.publicId])

  return (
    <div
      style={{ position: 'relative', cursor: 'pointer' }}
      className='avatar-box'
      onClick={onClick}>
      {iconClass && (
        <div className='icon-box flex-y-between transition'>
          <FormInput
            label={
              <i className='icon-blue transition'>
                <FiUploadCloud />
              </i>
            }
            name='avatar'
            type='file'
            accept='image/*'
            optionalStyles={'input-as-avatar'}
            changeHandler={(e) => displayAvatar(e)}
          />
          <i className='icon-red transition' onClick={deleteAvatar}>
            <RiDeleteBinLine />
          </i>
        </div>
      )}

      {avatarImageUrl || localImageUrl ? (
        <img
          src={localImageUrl || avatarImageUrl}
          alt='Avatar'
          loading='lazy'
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
          }}
          className={imageClass}
        />
      ) : (
        <i className={imageClass}>
          <FaUserCircle color='grey' style={{ marginTop: '1rem' }} />
        </i>
      )}
    </div>
  )
}

export default memo(Avatar)
