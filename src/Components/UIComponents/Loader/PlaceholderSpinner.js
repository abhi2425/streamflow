import React from 'react'
import './PlaceholderSpinner.css'
const PlaceholderSpinner = ({ styles }) => {
   return (
      <div className={`${styles} lds-spinner margin-t-m`}>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   )
}

export default PlaceholderSpinner
