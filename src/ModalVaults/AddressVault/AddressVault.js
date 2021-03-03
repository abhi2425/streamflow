import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'

import CountryList from '../../Components/FormComponents/ControlledInput/ControlledInput'
import countryListData from 'react-select-country-list'
import FormInput from '../../Components/FormComponents/FormInput/FormInput'

import { useGeneralContext } from '../../Contexts/GeneralContext'
import { LoadingVault } from '../../Components/UIComponents/Loader/Loaders'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'

const AddressVault = () => {
   const {
      isVaultLoading,
      isBtnLoading,
      fetchedData,
      fetchData: getAddressInfo,
      updateData: updateAddress,
   } = useGeneralContext()

   const { register, errors, handleSubmit, control } = useForm({
      mode: 'onBlur',
   })

   useEffect(() => getAddressInfo('address'), [getAddressInfo])

   const onSubmit = useCallback(
      async (data) => {
         const success = 'Address updated!'
         const addressData = {
            address: {
               ...data,
               country: data.country?.label,
            },
         }
         await updateAddress('PATCH', addressData, 'profile/user/me', success)
      },
      [updateAddress],
   )

   const countryOptions = useMemo(() => countryListData().getData(), [])

   if (isVaultLoading) return <LoadingVault />
   return (
      <form onSubmit={handleSubmit(onSubmit)} className='vault-style'>
         <div className='form-action'>
            <CountryList
               control={control}
               Controller={Controller}
               name='country'
               label='Country'
               placeholder={fetchedData?.country}
               isSearchable={true}
               isMulti={false}
               selectOptions={countryOptions}
            />
         </div>
         <div className='form-action margin-t-s'>
            <FormInput
               label='State'
               name='state'
               type='text'
               defaultValue={fetchedData?.state}
               reference={register({
                  required: {
                     message: 'required field',
                     value: true,
                  },
               })}
               error={errors}
            />
         </div>
         <div className='form-action'>
            <FormInput
               label='City'
               name='city'
               type='text'
               defaultValue={fetchedData?.city}
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
               label='Pincode'
               name='pinCode'
               type='text'
               defaultValue={fetchedData?.pinCode}
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

export default AddressVault
