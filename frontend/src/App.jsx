import React, { useState } from 'react'
import Topbar from './components/Topbar'
import Home from './pages/Home';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
        <Topbar />
        <Home />
        <Navbar />
    </div>
  )
}
export default App
