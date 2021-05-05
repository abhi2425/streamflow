import React, { memo, useEffect, useState } from 'react'
import Dates from 'date-and-time'
import { BsFillHeartFill } from 'react-icons/bs'
import Avatar from '../UIComponents/Avatar/Avatar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../UIComponents/Loader/Spinner'

const CommentTemplate = ({ comment, pattern }) => {
  const [ownerAvatar, setOwnerAvatar] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`user/${comment.owner}/avatar`)
      .then((response) => {
        setOwnerAvatar(response.data[0].data?.image)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    localStorage.setItem(comment.owner, ownerAvatar)
  }, [comment.owner, ownerAvatar])

  return (
    <li className='comment-details flex-row'>
      <div>
        {loading ? (
          <Loader styles='loader-small' />
        ) : (
          <Link to={`/profile/${comment.owner}`}>
            <Avatar
              avatarImageUrl={localStorage.getItem(comment.owner)}
              imageClass='avatar-small'
            />
          </Link>
        )}
      </div>

      <div className='m-left-s' style={{ width: '100%' }}>
        <div className='flex-x-between'>
          <div className='flex-row'>
            <span>{comment.owner}</span>
            <p>{comment.description}</p>
          </div>

          <i className='icon icon-small icon-grey'>
            <BsFillHeartFill />
          </i>
        </div>
        <div className='comment-time'>
          {Dates.format(new Date(Date.parse(comment.date)), pattern)}
        </div>
      </div>
    </li>
  )
}

export default memo(CommentTemplate)
