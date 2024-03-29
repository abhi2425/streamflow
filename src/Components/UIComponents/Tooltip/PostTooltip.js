import React, { useCallback, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useGeneralContext } from '../../../Contexts/GeneralContext'
import { useModal } from '../../../Contexts/ModalContext'
import { useProfileContext } from '../../../Contexts/ProfileContext'
import SaveAndCancel from '../SaveAndCancel/SaveAndCancel'

const PostTooltip = ({ title }) => {
  const { setShowModal } = useModal()
  const {
    updateData: deletePost,
    fetchData,
    user: { userName },
  } = useGeneralContext()
  const { getUserProfile } = useProfileContext()
  const [showTooltip, setShowTooltip] = useState(false)

  const deletePostHandler = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        const url = `profile/post/delete/${title}`
        await deletePost('DELETE', null, url, 'Post deleted !')
        await getUserProfile(userName)
      } catch (error) {
        console.log(error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, fetchData, userName]
  )
  const deleteButtonHandler = () =>
    setShowModal({
      show: true,
      component: (
        <form className='vault-style' onSubmit={(e) => deletePostHandler(e)}>
          <h1> Are you sure you want to delete this post. </h1>
          <SaveAndCancel label={'Delete Post'} />
        </form>
      ),
    })
  return (
    <article
      style={{ position: 'relative' }}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <i className='icon icon-grey ' onMouseOver={() => setShowTooltip(true)}>
        <BsThreeDotsVertical />
      </i>
      <div
        className={`tooltip-content ${showTooltip && 'show-tooltip'}`}
        style={{ top: '2rem' }}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button className='btn'>
          <Link to={`/post/${title}`}>Edit Post</Link>
        </button>
        <button className='btn transition' onClick={deleteButtonHandler}>
          Delete Post
        </button>
      </div>
    </article>
  )
}

export default PostTooltip
