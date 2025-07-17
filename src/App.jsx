import React from 'react'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CertificateGenerator from './pages/Dashboard/CertificateGenerator'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path = "/dashboard">
          <Route index element = {<CertificateGenerator />} />
        </Route>
      </Routes>
    </>
  )
}

export default App