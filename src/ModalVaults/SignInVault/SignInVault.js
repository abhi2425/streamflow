import React, { memo, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import { useUserContext } from '../../Contexts/UserContext'
import { SpinButton } from '../../Components/UIComponents/Loader/Loaders'
import axios from 'axios'

const SignInVault = () => {
  const { isLoading, signIn_login_OnSubmit } = useUserContext()
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const [login, setLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userNameError, setUserNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  let usernameTimer = null
  const usernameChangeHandler = (e) => {
    clearTimeout(usernameTimer)
    const username = e.target.value?.toLowerCase()

    usernameTimer = setTimeout(async () => {
      try {
        const response = await axios.get(`user/${username}`)
        response && setUserNameError(true)
      } catch (error) {
        setUserNameError(false)
      }
    }, 2000)
  }

  let emailTimer = null
  const emailChangeHandler = (e) => {
    clearTimeout(emailTimer)
    const email = e.target.value?.toLowerCase()
    emailTimer = setTimeout(async () => {
      try {
        const response =
          (email.length === 0 || email.length > 9) &&
          (await axios.get(`email/${email}`))
        response && setEmailError(true)
      } catch (error) {
        setEmailError(false)
      }
    }, 2000)
  }
  const onSubmit = useCallback(
    async (data) => {
      const url = login ? 'login' : 'signup'
      await signIn_login_OnSubmit(data, url)
    },
    [login, signIn_login_OnSubmit]
  )
  return (
    <section className='signup-form  flex-y-center  margin-t-s'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%' }}
        className='flex-y-center'
      >
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
                changeHandler={(e) => usernameChangeHandler(e)}
                error={errors}
              />
              {userNameError && (
                <p className='formError'>
                  Username already taken! Plz choose different.
                </p>
              )}
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
            changeHandler={(e) => !login && emailChangeHandler(e)}
          />
          {emailError && (
            <p className='formError'>
              Email already taken! Plz choose different.
            </p>
          )}
        </div>
        <div className='form-action'>
          <FormInput
            label={login ? 'Password' : 'Create Password'}
            name='password'
            type={showPassword ? 'text' : 'password'}
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
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
        <div className='form-action margin-t-s'>
          {isLoading ? (
            <SpinButton spinClass='btn-save' />
          ) : (
            <button className={`btn btn-save transition-slow signup-btn`}>
              {login ? 'Login' : 'Signup'}
            </button>
          )}
        </div>
      </form>
      <button
        className='login-btn btn transition margin-t-s'
        onClick={() => setLogin((prev) => !prev)}
      >
        {!login ? (
          <p>
            Already a user ? <span className='transition'>Login</span>
          </p>
        ) : (
          <p>
            New User ? <span className='transition'>Signup</span>
          </p>
        )}
      </button>
    </section>
  )
}
export default memo(SignInVault)
