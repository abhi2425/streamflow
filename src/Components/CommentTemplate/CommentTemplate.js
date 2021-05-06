import React, { memo, useCallback, useEffect, useState } from 'react'
import Dates from 'date-and-time'
import { BsFillHeartFill } from 'react-icons/bs'
import Avatar from '../UIComponents/Avatar/Avatar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../UIComponents/Loader/Spinner'
import { useUserContext } from '../../Contexts/UserContext'

const CommentTemplate = ({
  comment,
  pattern,
  postOwner,
  title,
  postComment,
}) => {
  const {
    userData: { username },
  } = useUserContext()
  const [ownerAvatar, setOwnerAvatar] = useState('')
  const [loading, setLoading] = useState(true)
  const [likeTheComment, setLikeTheComment] = useState(false)
  const [commentUpVote, setCommentUpVote] = useState(comment.upVote)
  const [sendRequest, setSendRequest] = useState(false)

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

  useEffect(() => {
    const alreadyLiked = comment.upVote?.findIndex((name) => name === username)
    console.log(alreadyLiked)
  }, [comment.upVote, username])

  useEffect(() => {
    if (sendRequest) {
      console.log(comment)

      const url = `/profile/post/${postOwner}/${title}/comment`
      const data = likeTheComment
        ? {
            ...comment,
            upVote: [username],
          }
        : {
            ...comment,
            upVote: commentUpVote?.filter((name) => name !== username) && [],
          }
      sendRequest && (async () => await postComment('PATCH', data, url))()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest, likeTheComment])

  const likeHandler = useCallback(() => {
    setLikeTheComment((prev) => !prev)
    setSendRequest(true)
  }, [])

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
          <div className='flex-y-center'>
            <i className='icon icon-small' onClick={likeHandler}>
              <BsFillHeartFill
                fill={likeTheComment ? 'crimson' : 'var(--color-dark-grey)'}
              />
            </i>
            <p>
              {commentUpVote?.length >= 2 && `${commentUpVote?.length} likes`}
            </p>
          </div>
        </div>
        <div className='comment-time'>
          {Dates.format(new Date(Date.parse(comment.date)), pattern)}
        </div>
      </div>
    </li>
  )
}

export default memo(CommentTemplate)
