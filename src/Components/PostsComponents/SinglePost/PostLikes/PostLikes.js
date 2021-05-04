import React from 'react'
import { FaRegComment, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

const PostLikes = ({ state, voteHandler, setShowComments, showComments }) => (
	<div className='reviews flex-x-between margin-t-s'>
		<div>
			<i
				className='icon m-right-s'
				id='upVote'
				onClick={() => voteHandler(true)}
			>
				<FaThumbsUp
					id='upVote'
					fill={
						state.upVote_active
							? 'var(--color-profile-1)'
							: 'var(--color-dark-grey)'
					}
				/>
			</i>
			<i
				id='downVote'
				className='icon m-right-s'
				onClick={() => voteHandler(false)}
			>
				<FaThumbsDown
					id='downVote'
					fill={
						state.downVote_active
							? 'var(--color-profile-1)'
							: 'var(--color-dark-grey)'
					}
				/>
			</i>
			<i
				className='icon icon-grey m-right-s'
				onClick={() => setShowComments((prev) => !prev)}
			>
				<FaRegComment
					fill={
						showComments ? 'var(--color-profile-1)' : 'var(--color-dark-grey)'
					}
				/>
			</i>
		</div>
		<p>
			{`${state.upVote_count || 0} Upvotes, 
               ${state.downVote_count || 0} Downvotes`}
		</p>
	</div>
)

export default PostLikes
