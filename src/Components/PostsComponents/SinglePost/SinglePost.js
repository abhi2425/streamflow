import React, { memo, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { useUserContext } from '../../../Contexts/UserContext'
import Dates from 'date-and-time'
import { voteReducer } from '../../../Utils/voteHandler/voteReducer'
import { initialVoteState } from '../../../Utils/voteHandler/initialVoteState'
import PostBody from './PostBody/PostBody'
import PostHeader from './PostHeader/PostHeader'
import PostLikes from './PostLikes/PostLikes'
import PostComments from './PostComments/PostComments'
import { request } from '../../../Utils/url'

const SinglePost = ({ post, user }) => {
  const { title, body, postOwner, createdAt, upVote, downVote, comments } = post ? post : {}
  const {
    userData: { username },
  } = useUserContext()
  const [state, dispatch] = useReducer(voteReducer, initialVoteState({ upVote, downVote }))
  const [toggleUpVote, setToggleUpVote] = useState(true)
  const [toggleDownVote, setToggleDownVote] = useState(true)
  const [sendRequest, setSendRequest] = useState(false)
  const [isUpVote, setIsUpVote] = useState(true)
  const [showComments, setShowComments] = useState(false)

  useEffect(
    () =>
      void (async () => {
        const url = `profile/post/votes/${title}`
        const data = isUpVote ? { upVote: state?.upVote } : { downVote: state?.downVote }
        sendRequest && (await request(url, 'PATCH', data))
      })(),
    [isUpVote, sendRequest, state?.downVote, state?.upVote, title],
  )

  useEffect(() => {
    const hasUpVoted = upVote?.findIndex((name) => name === username)
    const hasDownVoted = downVote?.findIndex((name) => name === username)
    if (hasUpVoted >= 0) {
      dispatch({ type: 'UPVOTED_ALREADY' })
      setToggleUpVote(false)
    }
    if (hasDownVoted >= 0) {
      dispatch({ type: 'DOWNVOTED_ALREADY' })
      setToggleDownVote(false)
    }
    dispatch({ type: 'UPDATE_UP_VOTE', payload: upVote })
    dispatch({ type: 'UPDATE_DOWN_VOTE', payload: downVote })
  }, [upVote, downVote, username])

  const created_At = useMemo(() => {
    const pattern = Dates.compile('MMM D, YYYY')
    return Dates.format(new Date(Date.parse(createdAt)), pattern)
  }, [createdAt])

  const postImages = useMemo(
    () =>
      post?.blogImages?.map((item, imageIndex) => (
        <div key={`${imageIndex}-image`} style={{ maxWidth: '450px' }}>
          <a href={item.image} target='blank'>
            <img
              style={{ width: '100%' }}
              loading='lazy'
              src={item.image}
              alt={`postImage-${imageIndex}`}
              className='margin-t-s'
            />
          </a>
        </div>
      )),
    [post?.blogImages],
  )
  const voteHandler = useCallback(
    (flag) => {
      if (flag) {
        setToggleUpVote((prev) => !prev)
        setIsUpVote(true)
        toggleUpVote
          ? dispatch({ type: 'UP_VOTE_ADD', payload: username })
          : dispatch({ type: 'UP_VOTE_REMOVE', payload: username })
      } else {
        setToggleDownVote((prev) => !prev)
        setIsUpVote(false)
        toggleDownVote
          ? dispatch({ type: 'DOWN_VOTE_ADD', payload: username })
          : dispatch({ type: 'DOWN_VOTE_REMOVE', payload: username })
      }
      setSendRequest(true)
    },
    [toggleDownVote, toggleUpVote, username],
  )

  return (
    <article className='single-post margin-b-m'>
      <PostHeader postOwner={postOwner} user={user} title={title} username={username} />
      <PostBody body={body} title={title} created_At={created_At} postImages={postImages} />
      <PostLikes
        state={state}
        voteHandler={voteHandler}
        setShowComments={setShowComments}
        showComments={showComments}
      />
      {showComments && (
        <PostComments
          username={username}
          comments={comments}
          title={title}
          postOwner={postOwner}
          showComments={showComments}
        />
      )}
    </article>
  )
}
export default memo(SinglePost)
