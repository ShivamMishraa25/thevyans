import React from 'react'
import Homepage from './pages/Homepage.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {
  const { login } = useAuth()
  return (
    <>
      <Homepage />
      {/* DEV ONLY: Temporary login button */}
      <button style={{position:'fixed',bottom:10,right:10,zIndex:9999}} onClick={() => login('devuser')}>
        Dev Login
      </button>
    </>
  )
}

export default App