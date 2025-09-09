import React from 'react'
import Adsbar from '../components/Adsbar'
import Tagnav from '../components/Tagnav'
import Navbar from '../components/Navbar'
import Bottomnav from '../components/Bottomnav'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'

const Home = () => {
  return (
    <div>
      <Adsbar />
      <Tagnav />
      <Navbar />
      <Bottomnav />
      <BreadCrumb />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home