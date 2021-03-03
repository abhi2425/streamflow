import React from 'react'
import { Link } from 'react-router-dom'
const NavLink = ({ url, icon, label, listClass }) => {
   return (
      <li className={`${listClass} transition-slow flex-row`}>
         <i className='icon'>{icon}</i>
         <Link to={url}>{label} </Link>
      </li>
   )
}

export default NavLink
