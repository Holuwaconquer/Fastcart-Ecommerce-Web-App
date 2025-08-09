import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const AdminContext = createContext()
const AdminProvider = ({ children }) => {

  const [adminDetails, setAdminDetails] = useState(null)
  const [page, setPage] = useState(1)
  const [customers, setCustomers] = useState([])
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
    let token = localStorage.adminToken
    useEffect(() => {
      let url = 'http://localhost:5000/admin/dashboard'
      axios.get(url, {
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((res) =>{
        if(res.data.status){
          setAdminDetails(res.data.data)
        }
      })
      .catch((err) =>{
        console.log(err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          window.location.href = '/admin/login';
        }
      })

    }, [])
    
    useEffect(() => {
      let userUrl = `http://localhost:5000/admin/allCustomers/?page=${page}&limit=10`
      axios.get(userUrl)
      .then((res) =>{
        if(res.data.status){
          setCustomers(res.data.data)
          setPagination(res.data.pagination);
        }
      })
      .catch((err) =>{
        console.log(err);
      })
    }, [page])
    

  return (
    <AdminContext.Provider value={{ adminDetails, setAdminDetails, setCustomers, customers, setPage, page, setPagination, pagination }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider