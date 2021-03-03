import React, { memo } from 'react'
import Select from 'react-select'
const ControlledInput = ({
   Controller,
   control,
   selectOptions,
   name,
   label,
   isMulti,
   isSearchable,
   placeholder,
}) => {
   return (
      <div className='form-control'>
         <div className='form-input'>
            <label className='label'>{label}</label>

            <Controller
               control={control}
               name={name}
               defaultValue=''
               render={({ onChange }) => (
                  <Select
                     onChange={onChange}
                     isMulti={isMulti}
                     isSearchable={isSearchable}
                     placeholder={placeholder && placeholder}
                     options={selectOptions}
                     className='font-medium'
                  />
               )}
            />
         </div>
      </div>
   )
}

export default memo(ControlledInput)
