import React, { memo } from 'react'
import './Spinner.css'
const Loader = memo(({ styles }) => {
   return <div className={`loader ${styles}`}></div>
})
export default Loader
