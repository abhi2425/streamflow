import React, { memo, useMemo } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

import NavLink from './Link'
import CreateButton from '../../Assets/Group 4.svg'
import Links from '../../Utils/pageLinks'
import Avatar from '../PostsComponents/Avatar/Avatar'
import CreatePostVault from '../../ModalVaults/CreatePostVault/CreatePostVault'
import { useModal } from '../../Contexts/ModalContext'

const Sidebar = memo(({ showNav }) => {
   const { setShowModal } = useModal()
   const link = useMemo(
      () =>
         Links.map(({ url, label, icon }, linkIndex) => (
            <NavLink key={linkIndex} url={url} icon={icon} label={label} />
         )),
      [],
   )
   console.log('SideBAR_____')
   return (
      <nav
         className={`${showNav ? '' : 'hide-left'} transition nav-height`}
         style={{ position: 'fixed', zIndex: 10 }}>
         <aside className='sidebar flex-y-around transition-slow'>
            <h1 className='stream-flow logo'>
               <Link to='/'>StreamFlow</Link>
            </h1>
            <div className='flex-y-between'>
               <Avatar imageClass='avatar-medium transition' />
               <nav className='nav-container flex-y-center'>{link}</nav>
            </div>

            <button
               className='create-post'
               onClick={() =>
                  setShowModal({
                     show: true,
                     component: <CreatePostVault />,
                  })
               }>
               {<img src={CreateButton} alt='Create' className='create-post-logo-large' />}
            </button>
         </aside>
      </nav>
   )
})
export default Sidebar
