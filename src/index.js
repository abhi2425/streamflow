import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.scss'
import './css/utilities.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './Contexts/UserContext'
import { PostContextProvider } from './Contexts/PostContext'
import { ModalContextProvider } from './Contexts/ModalContext'
import { SettingContextProvider } from './Contexts/SettingContext'

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <ModalContextProvider>
            <UserContextProvider>
               <PostContextProvider>
                  <SettingContextProvider>
                     <App />
                  </SettingContextProvider>
               </PostContextProvider>
            </UserContextProvider>
         </ModalContextProvider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root'),
)
