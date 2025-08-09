import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import DashboardSidenav from './UserComponents/DashboardSidenav';
import { UserAccountContext } from './UserContext';

const Dashboard = () => {

  const { userData } = useContext(UserAccountContext)

  return (
    <div style={{ padding: "40px 8%" }} className='w-full h-auto items-start flex gap-5 overflow-x-hidden'>
      <DashboardSidenav />
      <div className="flex-1 h-auto overflow-y-auto">
        <Outlet />
      </div>
    </div>
  ) 
};

export default Dashboard;
