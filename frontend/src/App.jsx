import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Landingpage from './components/Landingpage';
import './App.css'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
    </Routes>
  )
}

export default App
