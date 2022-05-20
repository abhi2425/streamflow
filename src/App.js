import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Signup from './Pages/Signup/Signup'
import Profile from './Pages/Profile/Profile'
import Settings from './Pages/Settings/Settings'
import EditPostPage from './Pages/EditPostPage/EditPostPage'
import Error from './Pages/Error/Error'
import Logout from './Pages/Logout/Logout'

import { useModal } from './Contexts/ModalContext'
import Modal from './Components/PopupComponents/Modal/Modal'
import Alert from './Components/PopupComponents/Alert/Alert'
import ScrollBtn from './Components/UIComponents/ScrollBtn/ScrollButton'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import { useUserContext } from './Contexts/UserContext'
import { useGeneralContext } from './Contexts/GeneralContext'
import Navbar from './Components/Navigation/Navbar/Navbar'
import { PostContextProvider } from './Contexts/PostContext'
import Post from './Pages/Post/Post'

const App = () => {
  const { showModal } = useModal()
  const {
    userData: { token },
  } = useUserContext()
  const { fetchAuthUser } = useGeneralContext()
  const [showNav, setShowNav] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchAuthUser(), [])

  return (
    <>
      <Modal>{showModal.component}</Modal>
      <Alert />
      <ScrollBtn />

      <Switch>
        <Route exact path='/'>
          {token ? (
            <PostContextProvider>
              <Navbar />
              <Home />
            </PostContextProvider>
          ) : (
            <Signup />
          )}
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <PrivateRoute path='/logout'>
          <Logout />
        </PrivateRoute>
        <PrivateRoute exact path='/profile/:username/settings'>
          <Navbar />
          <Settings setShowNav={setShowNav} showNav={showNav} />
        </PrivateRoute>
        <PrivateRoute path='/profile/:username'>
          <Navbar />
          <Profile />
        </PrivateRoute>
        <PrivateRoute path='/post/:title'>
          <Navbar />
          <EditPostPage />
        </PrivateRoute>
        <PrivateRoute path='/:owner/post/:title'>
          <Navbar />
          <Post />
        </PrivateRoute>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </>
  )
}

export default App
