import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Fastcart from '../assets/fastcartLogo.png'
import { FiShoppingCart, FiSearch  } from "react-icons/fi";
import { FaRegHeart, FaRegUser  } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const goHome = () =>{
    navigate('/')
  }
  return (
    <div className='w-full bg-[#1B6392] text-white' style={{padding: '10px 8%'}}>
      <div className='w-full flex items-center justify-between'>
        {/* for logo */}
        <div onClick={goHome} className='flex items-center gap-2 cursor-pointer'>
          <img src={Fastcart} alt='logo' />
          <h1 className='logoTxt text-white text-[25px]'>fastcart</h1>
        </div>
        {/* for discount */}
        <div className='w-2/4 text-black'>
          <div style={{padding: '14px 20px'}} className='flex items-center gap-2 rounded-[2px] bg-white w-full'>
            <input type="text" placeholder='Search for anything...' className='focus:outline-0 border-0 w-full' />
            <FiSearch  size={20}/>
          </div>
        </div>
        {/* for shop now */}
        <div className='flex items-center gap-4'>
          <FiShoppingCart size={25}/>
          <FaRegHeart size={25}/>
          <FaRegUser onClick={() => window.location='/dashboard/account'} className='cursor-pointer active:text-white hover:text-[#C9CFD2] transition-all'  size={25}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar