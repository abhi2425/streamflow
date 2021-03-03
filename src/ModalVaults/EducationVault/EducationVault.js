import React, { memo, useCallback, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import ControlledInput from '../../Components/FormComponents/ControlledInput/ControlledInput'
import { institutionOptions, completedOptions } from '../../Utils/selectsOptions'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import { LoadingVault } from '../../Components/UIComponents/Loader/Loaders'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'

const EducationVault = memo(() => {
   const {
      isVaultLoading,
      isBtnLoading,
      fetchedData,
      fetchData: getEducationInfo,
      updateData: updateEducationDetails,
   } = useGeneralContext()
   const { register, errors, handleSubmit, control } = useForm({
      mode: 'onBlur',
   })

   useEffect(() => getEducationInfo('eduQualification'), [getEducationInfo])
   const onSubmit = useCallback(
      async (data) => {
         const success = 'Education details updated!'
         const eduData = {
            eduQualification: {
               ...data,
               institution: data.institution?.value,
               completed: data.completed?.value,
            },
         }
         await updateEducationDetails('PATCH', eduData, 'profile/user/me', success)
         console.log(data)
      },
      [updateEducationDetails],
   )
   if (isVaultLoading) return <LoadingVault />
   return (
      <form onSubmit={handleSubmit(onSubmit)} className='vault-style'>
         <div className='form-action'>
            <ControlledInput
               control={control}
               Controller={Controller}
               name='institution'
               label='Institution'
               placeholder={fetchedData?.institution}
               isMulti={false}
               isSearchable={false}
               selectOptions={institutionOptions}
               errors={errors}
            />
         </div>

         <div className='form-action margin-t-s'>
            <FormInput
               label='Institution Name'
               name='name'
               type='text'
               defaultValue={fetchedData?.name}
               reference={register({
                  required: {
                     message: 'required field',
                     value: true,
                  },
                  minLength: {
                     message: 'Too Short College Name!',
                     value: 4,
                  },
               })}
               error={errors}
            />
         </div>
         <div className='form-action'>
            <FormInput
               label='Major'
               name='subject'
               type='text'
               defaultValue={fetchedData?.subject}
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
            <ControlledInput
               control={control}
               Controller={Controller}
               name='completed'
               label='Completed'
               placeholder={fetchedData?.completed ? 'Yes' : 'No'}
               isMulti={false}
               isSearchable={false}
               selectOptions={completedOptions}
               errors={errors}
            />
         </div>
         <div className='form-action margin-t-s'>
            <FormInput
               label='Completion Year'
               name='yearOfCompletion'
               type='date'
               defaultValue={fetchedData?.yearOfCompletion}
               reference={register({
                  required: {
                     message: 'required Field',
                     value: true,
                  },
               })}
               error={errors}
            />
         </div>
         <div className='form-action margin-t-s'>
            <FormInput
               label='Aggregate Score'
               name='score'
               type='text'
               defaultValue={fetchedData?.score}
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
})
export default EducationVault
