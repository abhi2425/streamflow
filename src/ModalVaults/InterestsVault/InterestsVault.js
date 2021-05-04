import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'

import Interests from '../../Components/FormComponents/ControlledInput/ControlledInput'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'
import { useGeneralContext } from '../../Contexts/GeneralContext'

import { interestsOptions } from '../../Utils/selectsOptions'

const InterestsVault = ({ interests }) => {
	const { handleSubmit, control } = useForm({
		mode: 'onBlur',
	})
	const { updateData: updateInterestField, isBtnLoading } = useGeneralContext()
	const onSubmit = useCallback(
		async (data) => {
			if (data.interests === '') return
			const interests = data.interests?.map((item) => item.value)
			const success = 'Your Interests are Updated!'
			await updateInterestField(
				'PATCH',
				{ interests },
				'profile/user/me',
				success,
			)
		},
		[updateInterestField],
	)
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='vault-style flex-y-between'
				style={{ height: '50rem' }}
			>
				<Interests
					Controller={Controller}
					control={control}
					name='interests'
					label='What Do You Love!!'
					defaultControl={interests?.[0]}
					isMulti={true}
					isSearchable={true}
					selectOptions={interestsOptions}
				/>
				<SaveAndCancel isBtnLoading={isBtnLoading} />
			</form>
		</>
	)
}

export default InterestsVault
