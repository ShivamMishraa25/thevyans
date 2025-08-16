import React from 'react';
import Homepage from './pages/Homepage.jsx';
import { useAuth } from './context/AuthContext.jsx';

function App() {
  return (
    <>
      <Homepage />
    </>
  );
}

export default App;