import React, { memo, useEffect, useMemo, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import linksGenerator from '../../../Utils/pageLinks'
import Avatar from '../../UIComponents/Avatar/Avatar'
import CreatePostBtn from '../../PostsComponents/CreatePostBtn/CreatePostBtn'
import SearchBar from '../../SearchBar/SearchBar'
import NavLink from '../Sidebar/NavLink'
import { useUserContext } from '../../../Contexts/UserContext'
import { useGeneralContext } from '../../../Contexts/GeneralContext'
import { FaSearch } from 'react-icons/fa'
import { useModal } from '../../../Contexts/ModalContext'

const Navbar = () => {
  const { setShowModal } = useModal()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const {
    userData: { username },
  } = useUserContext()
  const {
    user: { avatar },
  } = useGeneralContext()
  const [showToolTip, setShowToolTip] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth))
    return () => window.removeEventListener('resize', () => {})
  }, [])
  const searchHandler = () => {
    setShowModal((prev) => ({
      show: !prev.show,
      component: (
        <div className='vault-style'>
          <SearchBar />
        </div>
      ),
    }))
  }
  const link = useMemo(() => {
    const links = linksGenerator(username)
    return links.map(({ url, label, icon }, linkIndex) => (
      <NavLink
        key={linkIndex}
        url={url}
        icon={icon}
        label={label}
        listClass='links shift-color'
        onClick={() => setShowToolTip(false)}
      />
    ))
  }, [username])

  return (
    <nav
      className={`navbar ${
        screenWidth <= 650 ? 'flex-x-between' : 'flex-x-around'
      }`}
      style={{ zIndex: screenWidth <= 650 ? '50' : '10' }}
    >
      <h1 className='logo'>
        <Link to='/'>StreamFlow</Link>
      </h1>
      {screenWidth > 650 && (
        <div>
          <SearchBar />
        </div>
      )}

      <div className='flex-x-between'>
        {screenWidth <= 650 && (
          <span>
            <i
              className='icon m-right-s'
              style={{ display: 'block' }}
              onClick={searchHandler}
            >
              <FaSearch />
            </i>
          </span>
        )}
        <span style={{ marginRight: '2.5rem' }}>
          <CreatePostBtn logoSize='create-post-logo-small transition' />
        </span>
        <span>
          <Avatar
            avatarImageUrl={avatar?.image}
            imageClass='avatar-small'
            onClick={() => setShowToolTip((prev) => !prev)}
          />
        </span>
      </div>

      <aside className={`${showToolTip && 'show-tooltip'} nav-tooltip`}>
        {showToolTip && (
          <>
            <div
              role='none'
              onClick={() => setShowToolTip(false)}
              className='tooltip-backdrop'
            />
            <ul>{link}</ul>
          </>
        )}
      </aside>
    </nav>
  )
}

export default memo(Navbar)
