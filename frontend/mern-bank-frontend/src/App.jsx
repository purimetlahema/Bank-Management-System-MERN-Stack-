import React from 'react'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import "./styles/global.css"


const App = () => {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path='/' element = {<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App