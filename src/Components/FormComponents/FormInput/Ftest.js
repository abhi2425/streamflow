import React, { memo } from 'react'
import './FormInput.css'
const FormInput = memo(
   ({
      name,
      label,
      placeholder,
      reference,
      type,
      error,
      autoFocus,
      multiple,
      accept,
      changeHandler,
      value,
      optionalStyles,
   }) => {
      return (
         <section className={`form-control flex-y-center ${optionalStyles}`}>
            <div className='form-input'>
               <label className='label' htmlFor={name}>
                  {label}
               </label>
               <input
                  id={name}
                  type={type}
                  name={name}
                  defaultValue={value}
                  ref={reference}
                  placeholder={placeholder || label}
                  autoFocus={autoFocus}
                  multiple={multiple}
                  accept={accept}
                  onChange={changeHandler}
                  style={error && { border: error[name] && '.1rem solid var(--color-cancel)' }}
               />
            </div>
            {error ? error[name] && <p className='formError'>{error[name].message}</p> : null}
         </section>
      )
   },
)
export default FormInput
