/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline, IoSendSharp } from 'react-icons/io5'
import { useGeneralContext } from '../../../../Contexts/GeneralContext'
import Dates from 'date-and-time'
import CommentTemplate from '../../../CommentTemplate/CommentTemplate'

const PostComments = ({
  username,
  comments,
  title,
  postOwner,
  showComments,
}) => {
  const { register, handleSubmit, reset } = useForm()
  const { updateData: postComment } = useGeneralContext()
  const [commentsList, setCommentsList] = useState(comments)
  const [viewMore, setViewMore] = useState({ show: true, end: 4 })
  const [sendRequest, setSendRequest] = useState(false)

  const pattern = Dates.compile('DD-MMM-YYYY, hh:mm:ss A')

  useEffect(() => {
    if (sendRequest) {
      const url = `/profile/post/${postOwner}/${title}/comment`
      console.log(commentsList)

      const data = {
        _id: commentsList[0]._id,
        description: commentsList[0].description,
        date: Date.now(),
      }
      console.log(data)
      ;(async () => await postComment('PATCH', data, url))()
    }
  }, [sendRequest, commentsList, postOwner, title, postComment])

  const submitComments = useCallback(
    async ({ description }) => {
      if (description === '') return
      setCommentsList([
        {
          description,
          date: Dates.format(new Date(), pattern),
          owner: username,
          _id: Math.round(Math.random() * 10 ** 10),
        },
        ...commentsList,
      ])
      reset()
      setSendRequest(true)
    },
    [commentsList, postComment, postOwner]
  )

  const allComments = useMemo(() => {
    const copy = commentsList.slice(0, viewMore.end)

    return copy.map((comment, index) => (
      <CommentTemplate
        key={index}
        comment={comment}
        pattern={pattern}
        postOwner={postOwner}
        title={title}
        postComment={postComment}
      />
    ))
  }, [commentsList, viewMore])

  return (
    <form
      className={`post-comments ${showComments && 'display-comments'}`}
      onSubmit={handleSubmit(submitComments)}
    >
      {commentsList.length !== 0 && (
        <>
          <ul className='comments-container'>
            {allComments}
            {commentsList.length > 4 && viewMore.end < commentsList.length ? (
              <div>
                <i
                  className='icon icon-blue transition'
                  onClick={() =>
                    setViewMore({ show: true, end: viewMore.end + 3 })
                  }
                >
                  <IoAddCircleOutline />
                </i>
              </div>
            ) : null}
          </ul>
          <p>{`${commentsList.length} comments`}</p>
        </>
      )}
      <div className='flex-row'>
        <textarea
          name='description'
          aria-label='Add a comment'
          placeholder='Add a comment...'
          ref={register}
          className='comment-input transition margin-t-s'
        />
        <button
          className='icon icon-blue-small transition m-left-s'
          style={{ alignSelf: 'center' }}
        >
          <IoSendSharp />
        </button>
      </div>
    </form>
  )
}

export default memo(PostComments)
