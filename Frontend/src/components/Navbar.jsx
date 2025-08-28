import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Fastcart from '../assets/fastcartLogo.png'
import { FiShoppingCart, FiSearch  } from "react-icons/fi";
import { FaRegHeart, FaRegUser  } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartCard from './CartCard';

const Navbar = () => {
  const navigate = useNavigate()
  const goHome = () =>{
    navigate('/')
  }
  const cartItem = useSelector((state) => state.cart.cartItem)
  const [cartShown, setCartShown] = useState(false)

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
          <div style={{padding: '14px 20px'}} className='hover:border-3 hover:border-[#FA8232] border-3 border-[#00000000] flex items-center gap-2 rounded-[2px] bg-white w-full'>
            <input type="text" placeholder='Search for anything...' className='focus:outline-0 border-0 w-full' />
            <FiSearch  size={20}/>
          </div>
        </div>
        {/* for shop now */}
        <div className='flex items-center gap-4'>
          <div onMouseLeave={() => setCartShown(false)} onMouseEnter={() => setCartShown(true)} className='relative cursor-pointer'>
            <FiShoppingCart className='active:text-white hover:text-[#C9CFD2] transition-all' size={25}/>
            {cartItem.length > 0 &&
            <div style={{padding: '10px'}} className='absolute top-[-12px] right-[-12px] border-4 w-[20px] h-[20px] bg-white border-[#1B6392] rounded-[50%] flex flex-col items-center justify-center text-[#1B6392]'><span>{cartItem.length}</span></div>
            }
            {cartShown && 
              <div className='z-10 absolute w-[376px] top-[120%] shadow-md right-0'>
                <CartCard />
              </div>
            }
          </div>
          <FaRegHeart size={25}/>
          <FaRegUser onClick={() => window.location='/dashboard/account'} className='cursor-pointer active:text-white hover:text-[#C9CFD2] transition-all'  size={25}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar