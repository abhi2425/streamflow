/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { useUserContext } from '../../../Contexts/UserContext'

import Dates from 'date-and-time'
import { voteReducer } from '../../../Utils/voteHandler/voteReducer'
import { initialVoteState } from '../../../Utils/voteHandler/initialVoteState'
import axios from 'axios'
import { useModal } from '../../../Contexts/ModalContext'
import PostBody from './PostBody/PostBody'
import PostHeader from './PostHeader/PostHeader'
import PostLikes from './PostLikes/PostLikes'
import PostComments from './PostComments/PostComments'

const SinglePost = ({ post, user }) => {
  const { title, body, postOwner, createdAt, upVote, downVote, comments } = post
  const { popAlert } = useModal()
  const {
    userData: { username, token },
  } = useUserContext()
  const [state, dispatch] = useReducer(
    voteReducer,
    initialVoteState({ upVote, downVote })
  )

  const [readMore, setReadMore] = useState(false)
  const [toggleUp, setToggleUp] = useState(true)
  const [toggleDown, setToggleDown] = useState(true)
  const [sendRequest, setSendRequest] = useState(false)
  const [isUpVote, setIsUpVote] = useState(true)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    const hasUpVoted = upVote?.findIndex((name) => name === username)
    const hasDownVoted = downVote?.findIndex((name) => name === username)
    if (hasUpVoted >= 0) {
      dispatch({ type: 'UPVOTED_ALREADY' })
      setToggleUp(false)
    }
    if (hasDownVoted >= 0) {
      dispatch({ type: 'DOWNVOTED_ALREADY' })
      setToggleDown(false)
    }
  }, [])

  useEffect(() => {
    try {
      const url = `profile/post/votes/${title}`
      const data = isUpVote
        ? { upVote: state.upVote }
        : { downVote: state.downVote }
      sendRequest &&
        (async () =>
          await axios({
            url,
            method: 'PATCH',
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${token}`,
            },
            data,
          }))()
    } catch (error) {
      console.log(error)
      popAlert('Something went wrong!', 'danger')
    }
  }, [isUpVote, sendRequest, state.downVote, state.upVote])

  const created_At = useMemo(() => {
    const pattern = Dates.compile('MMM D, YYYY')
    return Dates.format(new Date(Date.parse(createdAt)), pattern)
  }, [createdAt])

  const postImages = useMemo(
    () =>
      post.blogImages?.map((item, imageIndex) => (
        <a href={item.image} target='blank' key={`${imageIndex}-image`}>
          <img
            loading='lazy'
            src={item.image}
            alt={`postImage-${imageIndex}`}
            className='margin-s'
          />
        </a>
      )),
    [post.blogImages]
  )
  const voteHandler = useCallback(
    (flag) => {
      if (flag) {
        setToggleUp((prev) => !prev)
        setIsUpVote(true)
        toggleUp
          ? dispatch({ type: 'UP_VOTE_ADD', payload: username })
          : dispatch({ type: 'UP_VOTE_REMOVE', payload: username })
      } else {
        setToggleDown((prev) => !prev)
        setIsUpVote(false)
        toggleDown
          ? dispatch({ type: 'DOWN_VOTE_ADD', payload: username })
          : dispatch({ type: 'DOWN_VOTE_REMOVE', payload: username })
      }
      setSendRequest(true)
    },
    [toggleDown, toggleUp, username]
  )

  return (
    <article className='single-post margin-b-m'>
      <PostHeader
        postOwner={postOwner}
        user={user}
        title={title}
        username={username}
      />
      <PostBody
        body={body}
        title={title}
        readMore={readMore}
        setReadMore={setReadMore}
        created_At={created_At}
        postImages={postImages}
      />
      <PostLikes
        state={state}
        voteHandler={voteHandler}
        setShowComments={setShowComments}
        showComments={showComments}
      />
      <PostComments
        username={username}
        comments={comments}
        title={title}
        postOwner={postOwner}
        showComments={showComments}
      />
    </article>
  )
}
export default memo(SinglePost)
