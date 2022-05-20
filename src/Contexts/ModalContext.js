import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ModalContext = createContext()
export const ModalContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({})
  const [showModal, setShowModal] = useState(() => ({
    show: false,
    component: <></>,
  }))
  const popAlert = useCallback((message, type, btnLoading = null) => {
    btnLoading && btnLoading(false)
    setShowModal({ show: false })
    setAlert({
      show: true,
      message,
      type,
    })
    setTimeout(() => setAlert({ show: false }), 3500)
  }, [])
  const value = useMemo(
    () => ({
      showModal,
      setShowModal,
      alert,
      setAlert,
      popAlert,
    }),
    [alert, popAlert, showModal],
  )
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
export const useModal = () => useContext(ModalContext)
