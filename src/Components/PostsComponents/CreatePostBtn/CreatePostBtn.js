import React, { memo } from 'react'
import { useModal } from '../../../Contexts/ModalContext'
import CreatePostVault from '../../../ModalVaults/CreatePostVault/CreatePostVault'
import btnImage from '../../../Assets/Group 4.svg'
const CreatePostBtn = ({ logoSize }) => {
   const { setShowModal } = useModal()
   return (
      <button
         className='create-post'
         onClick={() =>
            setShowModal({
               show: true,
               component: <CreatePostVault />,
            })
         }>
         {<img src={btnImage} alt='Create Post' className={logoSize} />}
      </button>
   )
}

export default memo(CreatePostBtn)
