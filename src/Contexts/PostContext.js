import React, { createContext, useContext } from 'react'

export const PostContext = createContext()

export const PostContextProvider = ({ children }) => {
   console.log('postContext')
   return <PostContext.Provider value={{}}>{children}</PostContext.Provider>
}

export const usePostContext = () => useContext(PostContext)
