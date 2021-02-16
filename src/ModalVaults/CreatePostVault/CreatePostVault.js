import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import PostBody from '../../Components/PostsComponents/PostBody/PostBody'
import UploadPostImage from '../../Components/PostsComponents/UploadImage/UploadImage'
import { useSettingContext } from '../../Contexts/SettingContext'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'

const CreatePostVault = () => {
   const { createPost, isBtnLoading } = useSettingContext()

   const { register, errors, handleSubmit } = useForm({
      mode: 'onBlur',
   })
   console.log('CREATE POST VAULT+++++++')
   const onSubmit = useCallback(
      async (data) => {
         await createPost(data)
      },
      [createPost],
   )
   return (
      <form id='post' onSubmit={handleSubmit(onSubmit)} className='vault-style'>
         <div className='form-action'>
            <FormInput
               label='Title'
               name='title'
               type='text'
               reference={register({
                  required: {
                     message: 'Title is missing',
                     value: true,
                  },
                  minLength: {
                     message: 'Too Short title!',
                     value: 6,
                  },
               })}
               error={errors}
            />
         </div>
         <div className='form-action'>
            <PostBody register={register} errors={errors} />
         </div>
         <div className='form-action'>
            <UploadPostImage register={register} />
         </div>
         <SaveAndCancel isBtnLoading={isBtnLoading} />
      </form>
   )
}

export default CreatePostVault
