import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NursePage from './pages/NursePage/NursePage';
import './App.css'
import PatientDashboard from './pages/NursePage/PatientDashboard';


function App() {

  return (
    <Routes>
      <Route path="/" element={<NursePage />} />
      <Route path="/patient/:pid" element={<PatientDashboard />} />
    </Routes>
  )
}

export default App
