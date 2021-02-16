import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'

import Interests from '../../Components/FormComponents/ControlledInput/ControlledInput'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'

import { interestsOptions } from '../../Utils/selectsOptions'

const InterestsVault = ({ interests }) => {
   const { handleSubmit, control } = useForm({
      mode: 'onBlur',
   })
   const defaultInterests = useMemo(
      () => interests?.map((interest) => ({ value: interest, label: interest?.toUppercase() })),
      [interests],
   )
   return (
      <form
         onSubmit={handleSubmit((data) => console.log(data))}
         className='vault-style flex-y-between'
         style={{ height: '50rem' }}>
         <Interests
            Controller={Controller}
            control={control}
            name='interests'
            label='Interests'
            defaultControl={interests?.[0]}
            defaultValue={defaultInterests}
            isMulti={true}
            isSearchable={true}
            selectOptions={interestsOptions}
         />
         <SaveAndCancel />
      </form>
   )
}

export default InterestsVault
