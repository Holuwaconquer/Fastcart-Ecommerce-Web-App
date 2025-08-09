import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserAccountContext = createContext()
const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState(null)
    useEffect(() => {
    const url = 'http://localhost:5000/user/dashboard';
    const token = localStorage.userToken;

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then((res) => {
      if(res){
        setUserData(res.data.data)
      }
    })
    .catch((err) => {
      console.error("Dashboard access failed:", err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        window.location.href = '/account/login';
      }
    });
  }, []);

  return (
    <UserAccountContext.Provider value={{ userData, setUserData}}>
        {children}
    </UserAccountContext.Provider>
  )
}

export default UserProvider