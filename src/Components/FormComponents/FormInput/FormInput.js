import React, { memo } from 'react'
import './FormInput.css'
const FormInput = ({ reference, error, changeHandler, defaultValue, optionalStyles, ...props }) => {
   return (
      <section className={`form-control flex-y-center ${optionalStyles}`}>
         <div className='form-input'>
            <label className='label margin-b-ex-small' htmlFor={props.name}>
               {props.label}
            </label>
            <input
               {...props}
               id={props.name}
               placeholder={props.placeholder || props.label}
               defaultValue={defaultValue}
               ref={reference}
               onChange={changeHandler}
               style={error && { border: error[props.name] && '.1rem solid var(--color-cancel)' }}
            />
         </div>
         {error
            ? error[props.name] && <p className='formError'>{error[props.name].message}</p>
            : null}
      </section>
   )
}
export default memo(FormInput)
