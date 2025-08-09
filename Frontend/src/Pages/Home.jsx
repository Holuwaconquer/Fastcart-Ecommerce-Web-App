import React from 'react'
import Adsbar from '../components/Adsbar'
import Tagnav from '../components/Tagnav'
import Navbar from '../components/Navbar'
import Bottomnav from '../components/Bottomnav'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Adsbar />
      <Tagnav />
      <Navbar />
      <Bottomnav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home