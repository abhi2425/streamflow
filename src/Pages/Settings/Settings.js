import React, { useCallback, useEffect, useState } from 'react'
import './Settings.css'
import { RiMenuFoldLine } from 'react-icons/ri'
import { useForm, Controller } from 'react-hook-form'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import { StreamFlowLoading } from '../../Components/UIComponents/Loader/Loaders'
import GenderList from '../../Components/FormComponents/ControlledInput/ControlledInput'
import { genderOptions } from '../../Utils/selectsOptions'
import SearchBar from '../../Components/SearchBar/SearchBar'
import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import SocialMediaField from '../../Components/FormComponents/SocialMediaInput/SocialMediaInput'
import ToolTip from '../../Components/UIComponents/Tooltip/Tooltip'
import Avatar from '../../Components/UIComponents/Avatar/Avatar'

const Settings = ({ showNav, setShowNav }) => {
   const { handleSubmit, errors, register, control } = useForm({
      mode: 'onBlur',
   })
   const { user, pageLoading, setIsCancel, updateUserDataOnSubmit } = useGeneralContext()
   const [age, setAge] = useState(0)
   useEffect(() => {
      document.title = 'StreamFlow | Settings'
   }, [])
   const getAgeHandler = useCallback((e) => {
      const birthday = new Date(Date.parse(e.target.value))
      const now = new Date()
      setAge(now.getFullYear() - birthday.getFullYear())
   }, [])

   if (pageLoading) return <StreamFlowLoading />
   return (
      <div className='page'>
         <main className='main flex-y-center' onClick={() => showNav && setShowNav(false)}>
            <section className='search-head flex-x-between'>
               <i className='icon-blue menu-btn' onClick={() => setShowNav(true)}>
                  <RiMenuFoldLine id='nav-menu-btn' />
               </i>
               <SearchBar />
               <ToolTip />
            </section>

            <div className='flex-y-center'>
               <Avatar
                  avatarImageUrl={user.avatar?.image}
                  iconClass={true}
                  imageClass='avatar-large transition'
               />
               <p className='username'>{user?.userName}</p>
            </div>

            <section className='edit-section'>
               <form className='flex-y-center' onSubmit={handleSubmit(updateUserDataOnSubmit)}>
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
                        // min={}
                        name='birthday'
                        label='Birthday'
                        reference={register}
                        changeHandler={(e) => getAgeHandler(e)}
                     />
                     <FormInput
                        type='text'
                        name='age'
                        label='Age'
                        reference={register}
                        value={age}
                        readOnly
                     />
                  </div>

                  <div className='form-action flex-x-between'>
                     <FormInput type='text' name='status' label='Status' reference={register} />
                     <GenderList
                        control={control}
                        Controller={Controller}
                        name='gender'
                        label='Gender'
                        defaultValue={{ label: 'Male', value: 'male' }}
                        defaultControl='male'
                        isMulti={false}
                        isSearchable={false}
                        selectOptions={genderOptions}
                     />
                  </div>

                  <div className='form-action'>
                     <FormInput
                        type='text'
                        name='quotes'
                        label='Description'
                        reference={register}
                     />
                  </div>

                  <SocialMediaField control={control} register={register} />
                  <div className='form-action flex-x-between margin-t-s'>
                     <button
                        className='btn btn-cancel transition-slow'
                        onClick={() => setIsCancel(true)}>
                        Delete Account
                     </button>
                     <button className='btn btn-save transition-slow' type='submit'>
                        Save Changes
                     </button>
                  </div>
               </form>
            </section>
         </main>
      </div>
   )
}

export default Settings
