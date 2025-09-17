import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const AdminContext = createContext()
const AdminProvider = ({ children }) => {

  const [adminDetails, setAdminDetails] = useState(null)
  const [page, setPage] = useState(1)
  const [customers, setCustomers] = useState([])
  const [allCustomers, setAllCustomers] = useState([])
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  const [ordersMontly, setordersMontly] = useState([])
  const [customersMonthly, setcustomersMonthly] = useState([])
  const API_URL = import.meta.env.VITE_API_URL;
    let token = localStorage.adminToken
    useEffect(() => {
      let url = `${API_URL}/admin/dashboard`
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
        }else if(err.status===403){
          toast.error('Access Forbidden!')
        }
      })

    }, [])
    
    useEffect(() => {
      let userUrl = `${API_URL}/admin/allCustomers/?page=${page}&limit=10`
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

    useEffect(() => {
      let allUsersURL = `${API_URL}/admin/customer/all`
      axios.get(allUsersURL)
      .then((res) =>{
        if(res.data.status){
          setAllCustomers(res.data.data)
        }
      })
      .catch((err) =>{
        console.log(err);
      })
    }, [])
    useEffect(() => {
      let ordersMonthlyURL = `${API_URL}/admin/order/monthly`
      axios.get(ordersMonthlyURL)
      .then((res) =>{
        if(res.data.status){
          setordersMontly(res.data.data)
        }
      })
      .catch((err) =>{
        console.log(err);
      })
    }, [])
    useEffect(() => {
      let customersMonthlyURL = `${API_URL}/admin/customers/monthly`
      axios.get(customersMonthlyURL)
      .then((res) =>{
        if(res.data.status){
          setcustomersMonthly(res.data.data)
        }
      })
      .catch((err) =>{
        console.log(err);
      })
    }, [])
    

  return (
    <AdminContext.Provider value={{ adminDetails, setAdminDetails, setCustomers, customers, setPage, page, setPagination, pagination, setAllCustomers, allCustomers, setordersMontly, ordersMontly, setcustomersMonthly, customersMonthly }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider