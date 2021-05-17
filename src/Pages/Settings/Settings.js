/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import './Settings.css'
import { useForm, Controller } from 'react-hook-form'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import {
  SpinButton,
  StreamFlowLoading,
} from '../../Components/UIComponents/Loader/Loaders'
import GenderList from '../../Components/FormComponents/ControlledInput/ControlledInput'
import { genderOptions } from '../../Utils/selectsOptions'
import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import SocialMediaField from '../../Components/FormComponents/SocialMediaInput/SocialMediaInput'
import ToolTip from '../../Components/UIComponents/Tooltip/Tooltip'
import Avatar from '../../Components/UIComponents/Avatar/Avatar'
import { useHistory } from 'react-router'
import { useModal } from '../../Contexts/ModalContext'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'

const Settings = () => {
  const history = useHistory()
  const { handleSubmit, errors, register, control } = useForm({
    mode: 'onBlur',
  })
  const {
    user,
    pageLoading,
    isBtnLoading,
    updateData: changeSettings,
  } = useGeneralContext()
  const { setShowModal } = useModal()
  const [age, setAge] = useState(0)

  useEffect(() => {
    document.title = 'StreamFlow | Settings'
  }, [])

  const getAgeHandler = useCallback((e) => {
    const birthday = new Date(Date.parse(e.target.value))
    const now = new Date()
    setAge(now.getFullYear() - birthday.getFullYear())
  }, [])

  const onSubmit = useCallback(async (data) => {
    const url = 'profile/user/me'
    const Data = {
      ...data,
      age: +data.age,
      gender: data.gender?.value,
      socialMedia: data.socialMedia ? data.socialMedia : [],
    }
    const message = 'Profile Updated !'
    console.log(Data)

    const response = await changeSettings('Patch', Data, url, message)
    response && history.push(`/profile/${user.userName}`)
  }, [])

  const deleteAccountHandler = useCallback(async (e) => {
    e.preventDefault()
    const url = 'profile/user/me'
    let message = 'Your account has been deleted!'
    const response = await changeSettings('DELETE', null, url, message)
    response && localStorage.removeItem('user-data')
    response && history.push(`/signup`)
  }, [])

  const cancelHandler = () =>
    setShowModal({
      show: true,
      component: (
        <form className='vault-style' onSubmit={(e) => deleteAccountHandler(e)}>
          <h1> Are you sure you want to Delete your account?. </h1>
          <SaveAndCancel label={'Delete Account'} />
        </form>
      ),
    })
  if (pageLoading) return <StreamFlowLoading />
  return (
    <div className='page'>
      <main className='main flex-x-center'>
        <section
          className={`edit-section margin-b-s flex-column ${
            window.innerWidth >= 650 ? 'margin-t-l' : 'margin-t-m'
          }`}
        >
          <ToolTip />
          <div className='flex-y-center'>
            <Avatar
              avatarImageUrl={user.avatar?.image}
              iconClass={true}
              imageClass='avatar-large transition'
            />
            <p className='username'>{user.userName}</p>
          </div>
          <form
            className='flex-y-center margin-b-s'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='form-action'>
              <FormInput
                type='text'
                name='name'
                label='Name'
                defaultValue={user.name}
                error={errors}
                autoFocus={true}
                reference={register({
                  required: {
                    message: 'Name is required field',
                    value: true,
                  },
                  minLength: {
                    message: 'Too short!',
                    value: 3,
                  },
                })}
              />
            </div>
            <div className='form-action'>
              <FormInput
                type='text'
                name='userName'
                label='Username'
                defaultValue={user.userName}
                error={errors}
                readOnly
                reference={register({
                  required: {
                    message: 'Username is required field',
                    value: true,
                  },
                  minLength: {
                    message: 'Too short!',
                    value: 3,
                  },
                })}
              />
            </div>
            <div className='form-action'>
              <FormInput
                type='email'
                name='email'
                label='Email'
                defaultValue={user.email}
                error={errors}
                reference={register({
                  required: {
                    message: 'Email is required field',
                    value: true,
                  },
                })}
              />
            </div>

            <div className='form-action flex-x-between'>
              <FormInput
                type='date'
                name='birthday'
                label='Birthday'
                reference={register}
                defaultValue={user.birthday}
                changeHandler={(e) => getAgeHandler(e)}
              />
              <FormInput
                type='text'
                name='age'
                label='Age'
                reference={register}
                value={user.age || age}
                readOnly
              />
            </div>

            <div className='form-action flex-x-between'>
              <FormInput
                type='text'
                name='status'
                label='Status'
                defaultValue={user.status ? user.status : ''}
                reference={register({
                  maxLength: {
                    value: 50,
                    message: 'only 50 characters allowed!',
                  },
                })}
                error={errors}
              />
              <GenderList
                control={control}
                Controller={Controller}
                name='gender'
                label='Gender'
                defaultValue={{
                  label: user.gender ? user.gender : 'Male',
                  value: user.gender ? user.gender : 'male',
                }}
                defaultControl='male'
                isMulti={false}
                isSearchable={false}
                placeholder={user.gender ? user.gender : 'Gender'}
                selectOptions={genderOptions}
              />
            </div>

            <div className='form-action'>
              <FormInput
                type='text'
                name='quotes'
                defaultValue={user.quotes ? user.quotes : ''}
                label='Description'
                reference={register({
                  maxLength: {
                    value: 100,
                    message: 'only 200 characters allowed!',
                  },
                })}
                error={errors}
              />
            </div>

            <SocialMediaField
              control={control}
              register={register}
              socialMedia={user.socialMedia}
            />
            <div className='form-action flex-x-between margin-t-s'>
              {isBtnLoading ? (
                <SpinButton spinClass='btn-save' fullWidth />
              ) : (
                <button
                  className={`btn transition-slow btn-save`}
                  style={{ width: '100%' }}
                >
                  Save
                </button>
              )}
            </div>
          </form>
          <button
            className='btn btn-cancel transition-slow'
            style={{ width: '100%' }}
            onClick={cancelHandler}
          >
            Delete Account
          </button>
        </section>
      </main>
    </div>
  )
}

export default Settings
