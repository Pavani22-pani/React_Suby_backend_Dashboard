import { useState } from 'react'
import './App.css'
import LandingPage from './vendorDashboard/pages/LandingPage'
import {Routes,Route} from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      


    </div>
  )
}

export default App
