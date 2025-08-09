import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const PublicRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken')
  const userToken = localStorage.getItem('userToken')

  const isValidToken = (token) => {
    try {
      const decoded = jwtDecode(token)
      return decoded.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }

  if (adminToken && isValidToken(adminToken)) {
    return <Navigate to='/admin/dashboard' />
  }

  if (userToken && isValidToken(userToken)) {
    return <Navigate to='/dashboard/account' />
  }

  return children
}

export default PublicRoute
