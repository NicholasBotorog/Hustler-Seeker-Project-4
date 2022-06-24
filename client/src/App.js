
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './styles/main.scss'
import Jobs from './components/jobs/Jobs'
import PageNavbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import UserProfile from './components/profile/UserProfile'
import AddJobs from './components/jobs/AddJob'
import SingleJob from './components/jobs/SingleJob'
import EditJob from './components/jobs/EditJob'
import EditProfile from './components/profile/EditProfile'
import Footer from './components/common/Footer'
import Home from './components/common/Home'


const App = () => {
  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path ='/' element={<Home />} /> 
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/' element={<UserProfile />} />
          <Route path='/profile/edit/' element={<EditProfile />} />
          <Route path='/post' element={< AddJobs />} />
          <Route path='/jobs/:id/' element={<SingleJob />} />
          <Route path='/jobs/:id/edit/' element={<EditJob /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
}


export default App
