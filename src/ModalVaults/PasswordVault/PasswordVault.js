import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'
import { useGeneralContext } from '../../Contexts/GeneralContext'

const PasswordVault = () => {
  const { updateData: updatePassword, isBtnLoading } = useGeneralContext()
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const onSubmit = useCallback(
    async ({ newPassword, oldPassword, confirmPassword }) => {
      if (newPassword === confirmPassword) {
        const success = 'Password updated!'
        await updatePassword(
          'PATCH',
          { newPassword, oldPassword },
          'profile/user/me/password',
          success
        )
      }
    },
    [updatePassword]
  )
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='vault-style'>
      <div className='form-action'>
        <FormInput
          label='Old Password'
          name='oldPassword'
          type={showOldPassword ? 'text' : 'password'}
          reference={register({
            required: {
              message: 'required Field',
              value: true,
            },
          })}
          error={errors}
          showPassword={showOldPassword}
          setShowPassword={setShowOldPassword}
        />
      </div>
      <div className='form-action'>
        <FormInput
          label='New Password'
          name='newPassword'
          type={showNewPassword ? 'text' : 'password'}
          reference={register({
            required: {
              message: 'required field',
              value: true,
            },
            minLength: {
              message: 'weak password!',
              value: 9,
            },
          })}
          error={errors}
          showPassword={showNewPassword}
          setShowPassword={setShowNewPassword}
        />
      </div>
      <div className='form-action'>
        <FormInput
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          reference={register({
            required: {
              message: 'required Field',
              value: true,
            },
          })}
          error={errors}
        />
      </div>
      <SaveAndCancel isBtnLoading={isBtnLoading} />
    </form>
  )
}

export default PasswordVault
