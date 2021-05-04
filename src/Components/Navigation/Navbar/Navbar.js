import React, { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import linksGenerator from '../../../Utils/pageLinks'
import Avatar from '../../UIComponents/Avatar/Avatar'
import CreatePostBtn from '../../PostsComponents/CreatePostBtn/CreatePostBtn'
import SearchBar from '../../SearchBar/SearchBar'
import NavLink from '../Sidebar/NavLink'
import { useUserContext } from '../../../Contexts/UserContext'
import { useGeneralContext } from '../../../Contexts/GeneralContext'

const Navbar = () => {
	const {
		userData: { username },
	} = useUserContext()
	const {
		user: { avatar },
	} = useGeneralContext()
	const [showToolTip, setShowToolTip] = useState(false)

	const link = useMemo(() => {
		const links = linksGenerator(username)
		return links.map(({ url, label, icon }, linkIndex) => (
			<NavLink
				key={linkIndex}
				url={url}
				icon={icon}
				label={label}
				listClass='links shift-color'
			/>
		))
	}, [username])
	return (
		<header
			className='profile-header flex-x-between'
			onMouseLeave={() => setShowToolTip(false)}
		>
			<h1 className='logo'>
				<Link to='/'>StreamFlow</Link>
			</h1>
			<div style={{ marginLeft: '2rem' }}>
				<SearchBar />
			</div>
			<div className='flex-x-between toolbox'>
				<div style={{ marginRight: '2.5rem' }}>
					<CreatePostBtn logoSize='create-post-logo-small transition' />
				</div>
				<Avatar
					avatarImageUrl={avatar?.image}
					imageClass='avatar-small'
					onMouseOver={() => setShowToolTip(true)}
				/>
			</div>
			<nav
				className={`${
					showToolTip ? 'show-tooltip' : ''
				} nav-container nav-tooltip`}
				onClick={() => setShowToolTip((prev) => !prev)}
				onMouseLeave={() => setShowToolTip(false)}
			>
				{link}
			</nav>
		</header>
	)
}

export default memo(Navbar)
