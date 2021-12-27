import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.scss'
import './css/utilities.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './Contexts/UserContext'
import { ModalContextProvider } from './Contexts/ModalContext'
import { GeneralContextProvider } from './Contexts/GeneralContext'
import { ProfileContextProvider } from './Contexts/ProfileContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalContextProvider>
        <UserContextProvider>
          <GeneralContextProvider>
            <ProfileContextProvider>
              <App />
            </ProfileContextProvider>
          </GeneralContextProvider>
        </UserContextProvider>
      </ModalContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
