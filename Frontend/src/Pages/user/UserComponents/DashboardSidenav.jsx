import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PiStorefrontLight, PiMapPinLineLight, PiShoppingCartSimple, PiArrowsCounterClockwise, PiNotebookLight, PiClockClockwise, PiSignOutLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { RiStackLine } from "react-icons/ri";
import { GoGear } from "react-icons/go";


const DashboardSidenav = () => {

  const logOut = () =>{
    if(window.confirm("are you sure you want to log out")){
      localStorage.removeItem("userToken")
      window.location.href = '/dashboard/account'
    }
  }
  return (
    <div style={{padding: '16px 0px'}} className='md:w-[264px] bg-white flex flex-col
     overflow-x-hidden shadow-md'>
      <div className='w-full text-white flex flex-col gap-[1.3em] h-full'>
        <div className='w-full flex flex-col'>
          {/* for dashboard */}
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/account' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }` }>
             <RiStackLine  size={24} />
             <span className='text-[14px]'>Dashboard</span>
            </NavLink>
          </div>
          {/* for orders */}
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/order-history' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }`}>
             <PiStorefrontLight  size={24} />
             <span className='text-[14px]'>Order History</span>
            </NavLink>
          </div>
          {/* for products */}
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/track-order' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }` }>
             <PiMapPinLineLight  size={24} />
             <span className='text-[14px]'>Track Order</span>
            </NavLink>
          </div>
          {/* for categories */}
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/shopping-cart' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }` }>
             <PiShoppingCartSimple   size={24} />
             <span className='text-[14px]'>Shopping Cart</span>
            </NavLink>
          </div>
          {/* for customers */}
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/wishlist' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }` }>
             <CiHeart size={24} />
             <span className='text-[14px]'>Wishlist</span>
            </NavLink>
          </div>
          {/* for reports */}
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/compare' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }` }>
             <PiArrowsCounterClockwise  size={24} />
             <span className='text-[14px]'>Compare</span>
            </NavLink>
          </div>
          {/* for coupons */}
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/card-and-address' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }`}>
             <PiNotebookLight  size={24} />
             <span className='text-[14px]'>Cards & Address</span>
            </NavLink>
          </div>
          {/* for inbox */}
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/browising-history' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }`}>
             <PiClockClockwise  size={24} />
             <span className='text-[14px]'>Browsing History</span>
            </NavLink>
          </div>
          <div className='w-full '>
            <NavLink style={{padding: '10px'}} to='/dashboard/setting' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }`}>
              <GoGear   size={24} />
              <span className='text-[14px]'>Settings</span>
            </NavLink>
          </div>
        {/* for knowledge base */}
          <div className='w-full ' onClick={logOut}>
           <NavLink style={{padding: '10px'}} to='/dashboard/logout' className={({ isActive }) => `w-full flex items-center gap-2 transition-all duration-300 ${ isActive ? 'bg-[#FA8232] text-[#white] shadow-md scale-[1.03]' : 'text-[#5F6C72] hover:bg-[#FFF3EB]' }`}>
           <PiSignOutLight  size={24} />
           <span className='text-[14px]'>Log Out</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidenav