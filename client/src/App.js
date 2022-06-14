
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import Sidebar from './components/Sidebar'
// import Feed from './components/Feed'
// import Rightbar from './components/Rightbar'
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material'
// import Navbar from './components/Navbar'
// import Add from './components/Add'


import Jobs from './components/Jobs/Jobs'
import PageNavbar from './components/Common/Navbar'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import UserProfile from './components/Profile/UserProfile'
import AddJobs from './components/Jobs/AddJob'
import SingleJob from './components/Jobs/SingleJob'
import EditJob from './components/Jobs/EditJob'
import EditProfile from './components/Profile/EditProfile'


const App = () => {
  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/' element={<UserProfile />} />
          <Route path='/profile/edit/' element={<EditProfile />} />
          <Route path='/post' element={< AddJobs />} />
          <Route path='/jobs/:id/' element={<SingleJob />} />
          <Route path='/jobs/:id/edit/' element={<EditJob /> } />
        </Routes>
      </BrowserRouter>
    </main>
  )
}


export default App
