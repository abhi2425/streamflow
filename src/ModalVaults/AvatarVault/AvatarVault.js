import React, { useCallback } from 'react'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'
import Avatar from '../../Components/UIComponents/Avatar/Avatar'
import { useGeneralContext } from '../../Contexts/GeneralContext'
const AvatarVault = ({ avatarUrl, avatar }) => {
	const { uploadPicture: uploadAvatar, isBtnLoading } = useGeneralContext()

	const onSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			const success = 'Profile Picture Uploaded!'
			const response = await uploadAvatar(avatar, 'profile/me/avatar', success)
			localStorage.setItem('avatar', JSON.stringify(response.data?.url))
		},
		[uploadAvatar, avatar],
	)
	return (
		<form className='vault-style flex-y-center' onSubmit={(e) => onSubmit(e)}>
			<Avatar
				imageClass='avatar-extra-large transition'
				localImageUrl={avatarUrl}
			/>
			<SaveAndCancel saveLabel='Upload' isBtnLoading={isBtnLoading} />
		</form>
	)
}

export default AvatarVault
