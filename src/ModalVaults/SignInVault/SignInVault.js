import React, { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import { useUserContext } from '../../Contexts/UserContext'
import { SpinButton } from '../../Components/Loader/Loaders'

const SignInVault = memo(() => {
   const { isLoading, login, signIn_login_OnSubmit } = useUserContext()
   const { register, errors, handleSubmit } = useForm({
      mode: 'onBlur',
   })
   const onSubmit = useCallback(
      async (data) => {
         const url = login ? 'login' : 'signup'
         await signIn_login_OnSubmit(data, url)
      },
      [login, signIn_login_OnSubmit],
   )
   return (
      <form onSubmit={handleSubmit(onSubmit)} className='signup-form  flex-y-center'>
         <div className='signup-heading'>Join us for fun!</div>
         {!login && (
            <>
               <div className='form-action'>
                  <FormInput
                     label='Name'
                     name='name'
                     type='text'
                     reference={register({
                        required: {
                           message: 'Name is required!',
                           value: true,
                        },
                        minLength: {
                           value: 4,
                           message: 'Too short name!',
                        },
                     })}
                     error={errors}
                  />
               </div>
               <div className='form-action'>
                  <FormInput
                     label='Set Username'
                     name='userName'
                     type='text'
                     reference={register({
                        required: {
                           message: 'Username is required!',
                           value: true,
                        },
                        minLength: {
                           message: 'Too short userName',
                           value: 4,
                        },
                     })}
                     error={errors}
                  />
               </div>
            </>
         )}
         <div className='form-action'>
            <FormInput
               label='Email'
               name='email'
               type='email'
               reference={register({
                  required: {
                     message: 'Email is required!',
                     value: true,
                  },
               })}
               error={errors}
            />
         </div>
         <div className='form-action'>
            <FormInput
               label={login ? 'Password' : 'Create Password'}
               name='password'
               type='password'
               reference={register({
                  required: {
                     message: 'Password must be provided!',
                     value: true,
                  },
                  minLength: {
                     value: 9,
                     message: 'Weak password!',
                  },
               })}
               error={errors}
            />
         </div>
         <div className='form-action margin-t-s'>
            {isLoading ? (
               <SpinButton />
            ) : (
               <button className={`btn btn-save-modal transition-slow signup-btn`}>
                  {login ? 'Login' : 'Signup'}
               </button>
            )}
         </div>
      </form>
   )
})
export default SignInVault
