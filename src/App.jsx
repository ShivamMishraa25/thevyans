import React from 'react';
import Homepage from './pages/Homepage.jsx';
import { useAuth } from './context/AuthContext.jsx';

function App() {
  const { user, logout } = useAuth();
  return (
    <>
      <Homepage />
      {/* Logout button, visible only if logged in */}
      {user && (
        <button style={{position:'fixed',bottom:10,right:10,zIndex:9999}} onClick={logout}>
          Logout
        </button>
      )}
    </>
  );
}

export default App;