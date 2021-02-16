import React, { memo } from 'react'
import FormInput from '../FormComponents/FormInput/FormInput'
const SearchBar = memo(() => {
   return (
      <div>
         <FormInput type='text' name='search' placeholder='search' />
      </div>
   )
})

export default SearchBar
