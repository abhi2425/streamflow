import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext()
export const ModalContextProvider = ({ children }) => {
   const [showModal, setShowModal] = useState(() => ({
      show: false,
      component: <></>,
   }))
   console.log('modalContext')
   return (
      <ModalContext.Provider
         value={{
            showModal,
            setShowModal,
         }}>
         {children}
      </ModalContext.Provider>
   )
}
export const useModal = () => useContext(ModalContext)
