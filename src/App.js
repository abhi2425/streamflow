import React, { useState } from 'react'
import './css/app.css'
import { Route, Switch } from 'react-router-dom'

import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Signup from './Pages/Signup/Signup'
import Profile from './Pages/Profile/Profile'
import Settings from './Pages/Settings/Settings'
import SinglePost from './Pages/SinglePost/SinglePost'
import Error from './Pages/Error/Error'
import Logout from './Pages/Logout/Logout'

import { useModal } from './Contexts/ModalContext'
import Modal from './Components/PopupComponents/Modal/Modal'
import Alert from './Components/PopupComponents/Alert/Alert'
import Sidebar from './Components/Sidebar/Sidebar'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'

const App = () => {
   const { showModal } = useModal()
   const [showNav, setShowNav] = useState(false)

   return (
      <>
         <Modal>{showModal.component}</Modal>
         <Alert />
         <Switch>
            <Route exact path='/'>
               <Signup />
            </Route>
            <PrivateRoute path='/home'>
               <Sidebar showNav={showNav} />
               <Home setShowNav={setShowNav} showNav={showNav} />
            </PrivateRoute>
            <Route path='/about'>
               <About />
            </Route>
            <PrivateRoute path='/logout'>
               <Logout />
            </PrivateRoute>
            <PrivateRoute exact path='/profile'>
               <Profile />
            </PrivateRoute>
            <PrivateRoute exact path='/profile/settings'>
               <Sidebar showNav={showNav} />
               <Settings setShowNav={setShowNav} showNav={showNav} />
            </PrivateRoute>
            <PrivateRoute path='/post/title'>
               <SinglePost />
            </PrivateRoute>
            <Route path='*'>
               <Error />
            </Route>
         </Switch>
      </>
   )
}

export default App
