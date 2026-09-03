import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './components/context/authcontext.tsx'
import UserContextProvider from './components/context/userContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
