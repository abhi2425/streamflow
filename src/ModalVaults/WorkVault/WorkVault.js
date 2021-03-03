import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import FormInput from '../../Components/FormComponents/FormInput/FormInput'

import { useGeneralContext } from '../../Contexts/GeneralContext'
import { LoadingVault } from '../../Components/UIComponents/Loader/Loaders'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'

const WorkVault = () => {
   const { register, errors, handleSubmit } = useForm({
      mode: 'onBlur',
   })
   const {
      isVaultLoading,
      isBtnLoading,
      fetchedData,
      fetchData: getWorkInfo,
      updateData: updateWorkDetails,
   } = useGeneralContext()

   useEffect(() => getWorkInfo('currentlyWorking'), [getWorkInfo])

   const onSubmit = useCallback(
      async (data) => {
         const success = 'Work details updated!'
         await updateWorkDetails(
            'PATCH',
            { currentlyWorking: { ...data } },
            'profile/user/me',
            success,
         )
      },
      [updateWorkDetails],
   )

   if (isVaultLoading) return <LoadingVault />
   return (
      <form onSubmit={handleSubmit(onSubmit)} className='vault-style'>
         <div className='form-action'>
            <FormInput
               label='Started In'
               name='startedIn'
               type='date'
               defaultValue={fetchedData?.startedIn}
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
               label='Description'
               name='description'
               type='text'
               defaultValue={fetchedData?.description}
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

export default WorkVault
