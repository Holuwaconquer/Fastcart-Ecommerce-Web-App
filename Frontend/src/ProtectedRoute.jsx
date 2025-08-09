import React from 'react'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem(role === 'admin' ? 'adminToken' : 'userToken')

  if (!token) {
    if(role==='admin'){
      return <Navigate to={`/admin/login`} />
    }else{
      return <Navigate to={`/account/login`} />
    }
  }

  try {
    const decoded = jwtDecode(token)
    const isExpired = decoded.exp * 1000 < Date.now()

    if (isExpired) {
      localStorage.removeItem(role === 'admin' ? 'adminToken' : 'userToken')
      if(role==='admin'){
        return <Navigate to={`/admin/login`} />
      }else{
        return <Navigate to={`/account/login`} />
      }
    }

    if (role === 'admin' && localStorage.getItem('userToken')) {
      return <Navigate to='/dashboard/account' />
    }

    if (role === 'user' && localStorage.getItem('adminToken')) {
      return <Navigate to='/admin/dashboard' />
    }

    return children
  } catch (error) {
    localStorage.removeItem(role === 'admin' ? 'adminToken' : 'userToken')
    if(role==='admin'){
      return <Navigate to={`/admin/login`} />
    }else{
      return <Navigate to={`/account/login`} />
    }
  }
}

export default ProtectedRoute
