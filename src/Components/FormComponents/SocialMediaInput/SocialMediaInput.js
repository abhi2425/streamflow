import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import FormInput from '../FormInput/FormInput'

const SocialMediaInput = ({ control, register, socialMedia }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialMedia',
  })

  const inputFields = fields.map((field, index) => (
    <div className='form-action flex-x-between' key={field.id}>
      <FormInput
        name={`socialMedia[${index}].url`}
        defaultValue={field.url}
        reference={register({
          required: true,
          minLength: { value: 4, message: 'Too Short!' },
        })}
      />
      <i className='icon icon-grey' onClick={() => remove(index)}>
        <FiMinusCircle />
      </i>
    </div>
  ))
  return (
    <div className='flex-y-center' style={{ width: '100%' }}>
      <div className='form-action flex-column'>
        {inputFields}

        <div className='flex-y-center'>
          <label style={{ fontSize: '1.6rem', fontWeight: '400' }}>
            SocialMedia Links
          </label>
          {fields.length < 3 && (
            <i
              className='icon icon-blue transition'
              style={{ fontSize: '4rem' }}
              onClick={() =>
                socialMedia.length > 0 ? append([...socialMedia]) : append({})
              }
            >
              <FiPlusCircle />
            </i>
          )}
        </div>
      </div>
    </div>
  )
}

export default SocialMediaInput
