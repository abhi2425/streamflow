import React, { memo, useEffect, useState } from 'react'
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
  const [commentUpVote, setCommentUpVote] = useState(comment?.upVote?.length)

  useEffect(
    () => setCommentUpVote(comment?.upVote?.length),
    [comment?.upVote?.length]
  )

  useEffect(() => {
    let cancel = false
    setLoading(true)
    axios
      .get(`user/${comment?.owner}/avatar`)
      .then((response) => {
        if (!cancel) {
          setOwnerAvatar(response.data[0].data?.image)
          setLoading(false)
        }
      })
      .catch(() => setLoading(false))
    localStorage.setItem(comment.owner, ownerAvatar)

    return () => (cancel = true)
  }, [comment?.owner, ownerAvatar])

  useEffect(() => {
    const alreadyLiked = comment.upVote?.findIndex((name) => name === username)
    if (alreadyLiked !== -1) setLikeTheComment(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment?.upVote])

  const likeHandler = async () => {
    const url = `/profile/post/${postOwner}/${title}/comment`
    const data = {
      ...comment,
      upVote: [username],
    }
    setLikeTheComment((prev) => !prev)
    !likeTheComment
      ? setCommentUpVote((commentUpVote) => commentUpVote + 1)
      : setCommentUpVote((commentUpVote) => commentUpVote - 1)
    await postComment('PATCH', data, url)
  }

  return (
    <li className='comment-details flex-row'>
      <div style={{ alignSelf: 'baseline' }}>
        {loading ? (
          <Loader styles='loader-small' />
        ) : (
          <Link to={`/profile/${comment.owner}`}>
            <Avatar
              avatarImageUrl={
                localStorage.getItem(comment.owner) === 'undefined'
                  ? undefined
                  : localStorage.getItem(comment.owner)
              }
              imageClass='avatar-small'
            />
          </Link>
        )}
      </div>

      <div style={{ width: '100%', marginLeft: '1rem' }}>
        <div className='flex-x-between'>
          <div className='flex-row'>
            <span style={{ alignSelf: 'baseline' }}>{comment.owner}</span>
            <p>{comment.description}</p>
          </div>

          {comment?.owner === username ? null : (
            <div className='flex-y-center' style={{ marginLeft: '1rem' }}>
              <i className='icon icon-small' onClick={likeHandler}>
                <BsFillHeartFill
                  fill={likeTheComment ? 'crimson' : 'var(--color-dark-grey)'}
                />
              </i>
            </div>
          )}
        </div>

        <div className='comment-time flex-row'>
          {Dates.format(new Date(Date.parse(comment.date)), pattern)}
          <p className='m-left-s'>
            {commentUpVote >= 1 &&
              `${commentUpVote} ${commentUpVote === 1 ? 'like' : 'likes'}`}
          </p>
        </div>
      </div>
    </li>
  )
}

export default memo(CommentTemplate)
