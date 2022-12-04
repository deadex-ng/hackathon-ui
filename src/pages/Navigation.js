import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Milestone from './Milestone'
import HomePage from './HomePage'
import Register from './Register'

function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/milestone" element={<Milestone />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>     
  )
}

export default Navigation