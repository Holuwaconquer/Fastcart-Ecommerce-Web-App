import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";

const Dashboard = () => {
  return (
    <>
      <div className='w-full flex flex-col gap-4'>
        {/* for dashboard title */}
        <div className='w-full flex justify-between items-center'>
          <div>
            <h1 className='font-bold text-[#131523] text-[24px]'>Dashboard</h1>
          </div>
          {/* for manage button */}
          <div>
            <button className='rounded-[4px] border-1 border-[#D7DBEC] flex gap-2 items-center text-[#1E5EFf] curcosr-pointer hover:bg-[#D7DBEC] cursor-pointer' style={{padding: '10px'}}><span><IoSettingsOutline /></span><span>Manage Settings</span></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard