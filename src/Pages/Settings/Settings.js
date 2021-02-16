import React, { useEffect } from 'react'
import './Settings.css'
import { RiMenuFoldLine } from 'react-icons/ri'
import { useForm, Controller } from 'react-hook-form'
import { useSettingContext } from '../../Contexts/SettingContext'
import { StreamFlowLoading } from '../../Components/Loader/Loaders'
import GenderList from '../../Components/FormComponents/ControlledInput/ControlledInput'
import { genderOptions } from '../../Utils/selectsOptions'
import SearchBar from '../../Components/SearchBar/SearchBar'
import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import SocialMediaField from '../../Components/FormComponents/SocialMediaInput/SocialMediaInput'
import ToolTip from '../../Components/UIComponents/Tooltip/Tooltip'
import Avatar from '../../Components/PostsComponents/Avatar/Avatar'

const Settings = ({ showNav, setShowNav }) => {
   const { handleSubmit, errors, register, control } = useForm({
      mode: 'onBlur',
   })
   const {
      user,
      pageLoading,
      fetchAuthUser,
      setIsCancel,
      updateUserDataOnSubmit,
   } = useSettingContext()
   useEffect(() => fetchAuthUser(), [fetchAuthUser])

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
                  iconClass={['icon-box', 'icon-blue', 'icon-red']}
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
                        value={user.name}
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
                        value={user.userName}
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
                        value={user.email}
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
                     <FormInput type='date' name='birthday' label='Birthday' reference={register} />
                     <FormInput type='text' name='age' label='Age' reference={register} />
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
                  <div className='form-action flex-x-between btn-container'>
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
