import React, { memo, useCallback, useMemo, useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import { ImCross } from 'react-icons/im'

import FormInput from '../../FormComponents/FormInput/FormInput'

const UploadImage = memo(({ register }) => {
   const [postImagePreview, setPostImagePreview] = useState([])
   const [captureEvent, setCaptureEvent] = useState({})

   const removeImagePreviewHandler = useCallback(
      (flag) => {
         setPostImagePreview([])
         if (flag) captureEvent.value = null
      },
      [setPostImagePreview, captureEvent],
   )

   const postPreviewHandler = useCallback(
      ({ target }) => {
         removeImagePreviewHandler(false)
         if (target) {
            setCaptureEvent(target)
            for (const file of target.files) {
               setPostImagePreview((prevFiles) => [...prevFiles, URL.createObjectURL(file)])
            }
         }
      },
      [setCaptureEvent, setPostImagePreview, removeImagePreviewHandler],
   )
   const images = useMemo(
      () =>
         postImagePreview.map((url, index) => (
            <img
               className='previewImage'
               src={url}
               key={index}
               alt='previewImage'
               onClick={() => console.log('image view')}
            />
         )),
      [postImagePreview],
   )
   return (
      <>
         <FormInput
            label={
               <i className='icon-blue flex-row transition'>
                  <p>Upload</p> <FiUploadCloud />
               </i>
            }
            name='postImages'
            type='file'
            multiple
            reference={register}
            accept='image/*'
            changeHandler={(e) => postPreviewHandler(e)}
         />
         <div className='flex-x-between'>
            <div>{images}</div>

            {postImagePreview.length > 0 && (
               <i className='icon icon-grey' onClick={() => removeImagePreviewHandler(true)}>
                  <ImCross />
               </i>
            )}
         </div>
      </>
   )
})

export default UploadImage
