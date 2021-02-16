import React, { useCallback } from 'react'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'
import Avatar from '../../Components/PostsComponents/Avatar/Avatar'
import { useSettingContext } from '../../Contexts/SettingContext'
const AvatarVault = ({ avatarUrl, avatar }) => {
   const { uploadPicture: uploadAvatar, isBtnLoading } = useSettingContext()

   const onSubmit = useCallback(
      async (e) => {
         e.preventDefault()
         const success = 'Profile Picture Uploaded!'
         const response = await uploadAvatar(avatar, 'profile/me/avatar', success)
         console.log(response)
      },
      [uploadAvatar, avatar],
   )
   return (
      <form className='vault-style flex-y-center' onSubmit={(e) => onSubmit(e)}>
         <Avatar imageClass='avatar-extra-large transition' imageUrl={avatarUrl} />
         <SaveAndCancel saveLabel='Upload' isBtnLoading={isBtnLoading} />
      </form>
   )
}

export default AvatarVault
