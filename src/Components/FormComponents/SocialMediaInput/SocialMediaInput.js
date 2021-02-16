import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import FormInput from '../FormInput/FormInput'

const SocialMediaInput = ({ control, register }) => {
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'socialMedia',
   })
   const inputFields = fields.map((item, index) => (
      <div className='form-action flex-x-between' key={index}>
         <FormInput
            name={`socialMedia[${index}].value`}
            reference={register()}
            // label={`Link-${index + 1}`}
         />
         <i className='icon icon-grey' onClick={() => remove(index)}>
            <FiMinusCircle />
         </i>
      </div>
   ))
   return (
      <div className='form-action flex-x-between' style={{ position: 'relative' }}>
         <div className='form-action flex-column'>
            <FormInput type='text' label='Social Media' name='social' reference={register} />
            {inputFields}
         </div>
         <i
            className='icon icon-grey'
            style={{
               position: 'absolute',
               right: '-2rem',
               top: '3rem',
            }}
            onClick={() => append({})}>
            <FiPlusCircle />
         </i>
      </div>
   )
}

export default SocialMediaInput
