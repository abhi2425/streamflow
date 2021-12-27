import React from 'react'

const PostBodyInput = ({ register, errors, defaultValue, rows }) => {
  return (
    <section className='form-control flex-y-center'>
      <div className='form-input'>
        <label htmlFor='body' className='label'>
          Content
        </label>
        <textarea
          className='textarea'
          form='post'
          id='body'
          name='body'
          rows={rows}
          cols='60'
          ref={register({
            required: {
              message: 'required Field',
              value: true,
            },
            minLength: {
              message: 'Too Short',
              value: 5,
            },
          })}
          placeholder='write something...'
          defaultValue={defaultValue}
          style={
            errors && {
              border: errors.body && '.1rem solid var(--color-cancel)',
            }
          }
        />
      </div>
      {errors
        ? errors.body && <p className='formError'>{errors.body.message}</p>
        : null}
    </section>
  )
}

export default PostBodyInput
