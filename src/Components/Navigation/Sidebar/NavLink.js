import React from 'react'
import { Link } from 'react-router-dom'
const NavLink = ({ url, icon, label, listClass, ...props }) => {
  return (
    <li className={`${listClass} `} {...props}>
      <Link to={url}>
        <div className='transition-slow flex-row'>
          <i className='icon' style={{ alignSelf: 'center' }}>
            {icon}
          </i>
          <p className='m-left-s'>{label}</p>
        </div>
      </Link>
    </li>
  )
}

export default NavLink
