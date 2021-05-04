import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../../UIComponents/Avatar/Avatar'
import PostTooltip from '../../../UIComponents/Tooltip/PostTooltip'

const PostHeader = ({ postOwner, user, username, title }) => (
	<div className='flex-x-between'>
		<div className='flex-row'>
			<Link to={`/profile/${postOwner}`}>
				<Avatar avatarImageUrl={user.image} imageClass='avatar-small' />
			</Link>
			<div className='post-owner'>
				<h3>
					<Link to={`/profile/${postOwner}`}>{user.name}</Link>
				</h3>
				<p> {postOwner}</p>
			</div>
		</div>
		{username === postOwner && <PostTooltip title={title} />}
	</div>
)

export default PostHeader
