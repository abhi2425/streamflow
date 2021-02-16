import React from 'react'
import { Link } from 'react-router-dom'
const NavLink = ({ url, active, icon, label }) => {
   return (
      <li className={`${active && 'active'} transition-slow links flex-row`}>
         <i className='icon'>{icon}</i>
         <Link to={url}>{label} </Link>
      </li>
   )
}

export default NavLink
