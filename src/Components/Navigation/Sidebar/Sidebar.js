import React, { memo, useMemo } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

import NavLink from './NavLink'
import linksGenerator from '../../../Utils/pageLinks'
import Avatar from '../../UIComponents/Avatar/Avatar'
import CreatePostBtn from '../../PostsComponents/CreatePostBtn/CreatePostBtn'
import { useUserContext } from '../../../Contexts/UserContext'
import { useGeneralContext } from '../../../Contexts/GeneralContext'

const Sidebar = ({ showNav }) => {
   const {
      userData: { username },
   } = useUserContext()
   const {
      user: { avatar },
   } = useGeneralContext()
   const link = useMemo(() => {
      const links = linksGenerator(username)
      return links.map(({ url, label, icon }, linkIndex) => (
         <NavLink key={linkIndex} url={url} icon={icon} label={label} listClass='links' />
      ))
   }, [username])
   return (
      <nav
         className={`${showNav ? '' : 'hide-left'} transition nav-height`}
         style={{ position: 'fixed', zIndex: 10 }}>
         <aside className='sidebar flex-y-around transition-slow'>
            <h1 className='stream-flow logo'>
               <Link to='/'>StreamFlow</Link>
            </h1>
            <div className='flex-y-between'>
               <Avatar avatarImageUrl={avatar?.image} imageClass='avatar-medium transition' />
               <nav className='nav-container flex-y-center'>{link}</nav>
            </div>
            <CreatePostBtn logoSize='create-post-logo-large' />
         </aside>
      </nav>
   )
}
export default memo(Sidebar)
