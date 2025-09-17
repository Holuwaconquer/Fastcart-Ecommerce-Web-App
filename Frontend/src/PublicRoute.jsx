import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

const PublicRoute = ({ children }) => {
  const location = useLocation();

  const isValidToken = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const adminToken = localStorage.getItem('adminToken');
  if (
    adminToken &&
    isValidToken(adminToken) &&
    PUBLIC_PATHS.includes(location.pathname)
  ) {
    return <Navigate to='/admin/dashboard' replace />;
  }

  const userToken = localStorage.getItem('userToken');
  if (
    userToken &&
    isValidToken(userToken) &&
    PUBLIC_PATHS.includes(location.pathname)
  ) {
    return <Navigate to='/dashboard/account' replace />;
  }

  return children;
};

export default PublicRoute;




// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

// const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

// const PublicRoute = ({ children }) => {
//   const location = useLocation();

//   const isValidToken = (token) => {
//     try {
//       const { exp } = jwt_decode(token);
//       return exp * 1000 > Date.now();
//     } catch {
//       return false;
//     }
//   };

//   const adminToken = localStorage.getItem('adminToken');
//   const userToken = localStorage.getItem('userToken');

//   if (adminToken && isValidToken(adminToken) && PUBLIC_PATHS.includes(location.pathname)) {
//     return <Navigate to='/admin/dashboard' replace />;
//   }

//   if (userToken && isValidToken(userToken) && PUBLIC_PATHS.includes(location.pathname)) {
//     return <Navigate to='/dashboard/account' replace />;
//   }

//   return children;
// };

// export default PublicRoute;
