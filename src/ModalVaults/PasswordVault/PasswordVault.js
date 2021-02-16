import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import FormInput from '../../Components/FormComponents/FormInput/FormInput'

import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'
import { useSettingContext } from '../../Contexts/SettingContext'

const PasswordVault = () => {
   const { updateData: updatePassword, isBtnLoading } = useSettingContext()
   const { register, errors, handleSubmit } = useForm({
      mode: 'onBlur',
   })

   const onSubmit = useCallback(
      async ({ newPassword, oldPassword, confirmPassword }) => {
         if (newPassword === confirmPassword) {
            const success = 'Password updated!'
            await updatePassword(
               'PATCH',
               { newPassword, oldPassword },
               'profile/user/me/password',
               success,
            )
         }
      },
      [updatePassword],
   )
   return (
      <form onSubmit={handleSubmit(onSubmit)} className='vault-style'>
         <div className='form-action'>
            <FormInput
               label='Old Password'
               name='oldPassword'
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
         <div className='form-action'>
            <FormInput
               label='New Password'
               name='newPassword'
               type='password'
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
