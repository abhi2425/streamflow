import React, { memo } from 'react'
import './Loader.css'
const Loader = memo(({ styles }) => {
   return <div className={`loader ${styles}`}>Loading...</div>
})
export default Loader
