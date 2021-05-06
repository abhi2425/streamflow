import React from 'react'
import { VscCircleFilled } from 'react-icons/vsc'

const PostBody = ({
  title,
  body,
  created_At,
  readMore,
  setReadMore,
  postImages,
}) => (
  <>
    <div className='post-title flex-row'>
      <p>{title?.replace(/-/g, ' ')}</p>
      <div className='created-at flex-row'>
        <i>
          <VscCircleFilled />
        </i>
        <div>{created_At}</div>
      </div>
    </div>
    <div className='post-body m-left-s'>
      {body?.length < 200
        ? body
        : readMore
        ? body
        : body?.substring(0, 200) + ' . . .'}
      {body?.length > 200 && (
        <button
          className='btn read-more transition'
          onClick={() => setReadMore((prev) => !prev)}
        >
          {readMore ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
    <div className='post-images flex-column'>{postImages}</div>
  </>
)

export default PostBody
