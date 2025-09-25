import React, { useContext } from 'react'
import Fastcart from '../assets/fastcartLogo.png'
import GetApple from '../assets/getAppStore.png'
import GetGoogle from '../assets/GetGoogle.png'
import { CategoryContext } from '../CategoryContext'
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const { allCategory } = useContext(CategoryContext)

  const navigate = useNavigate()
  return (
    <div className='w-full bg-[#191C1F]'>
      <div style={{padding: '4% 6%'}} className='w-full text-center md:text-left gap-8 md:gap-0 justify-center md:justify-start md:items-start grid md:grid-cols-[1fr_1fr_1fr_1fr]'>
        {/* for logo and contact details */}
        <div className='w-full flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <img src={Fastcart} alt='logo' />
            <h1 className='logoTxt text-white text-[25px]'>fastcart</h1>
          </div>
          <div className='flex flex-col gap-1'>
            <small className='text-[14px] text-[#77878F]'>Customer Supports</small>
            <p className='text-[18px] text-white'>(629) 555-0129</p>
            <p className='text-[14px] text-[#ADB7BC]'>4517 Washington Ave. <br /> Manchester, Kentucky 39495</p>
            <p className='text-[16px] text-white'>info@kinbo.com</p>
          </div>
          <div></div>
        </div>
        {/* end of logo and contact details */}
        {/* for top category */}
        <div className='flex flex-col gap-4'>
          <h1 className='text-[16px] text-white font-bold'>TOP CATEGORY</h1>
          <ul className='list text-white flex flex-col gap-2'>
            {allCategory && allCategory.slice(0,6).map((cat) => (
              <li key={cat._id}>{cat.name}</li>
            ))}
            <p onClick={() =>navigate('/shop')} className='font-semibold cursor-pointer text-[#EBC80C] text-[14px] flex gap-2 item-center justify-center md:justify-start'> <span>Browse All Product</span><IoIosArrowRoundForward size={20}/></p>
          </ul>
        </div>
        {/* for quick links */}
        <div className='flex flex-col gap-4'>
          <h1 className='text-[16px] text-white font-bold'>QUICK LINKS</h1>
          <ul className='list text-white flex flex-col gap-2'>
            <li className='cursor-pointer' onClick={() => navigate('/shop')}>Shop Product</li>
            <li className='cursor-pointer' onClick={() => navigate('/shopping-cart')}>Shopping Cart</li>
            <li className='cursor-pointer' onClick={() => navigate('/')}>Wishlist</li>
            <li className='cursor-pointer' onClick={() => navigate('/')}>Compare</li>
            <li className='cursor-pointer' onClick={() => navigate('/order-tracking')}>Track Order</li>
            <li className='cursor-pointer' onClick={() => navigate('/customer-support')}>Customer Help</li>
            <li className='cursor-pointer' onClick={() => navigate('/who-we-are')}>About Us</li>
          </ul>
        </div>
        {/* end of top category */}
        {/* for download app */}
        <div className='flex flex-col md:items-start items-center gap-4'>
          <h1 className='text-[16px] text-white font-bold'>DOWNLOAD APP</h1>
          <div>
            <img src={GetGoogle} alt="" />
          </div>
          <div>
            <img src={GetApple} alt="" />
          </div>
        </div>
        {/* end of download app */}
        {/* for popular tag */}
        <div>
        </div>
      </div>
      <div style={{padding: '2% 0'}} className='w-full border-t-1 border-t-[#ADB7BC] text-center text-[#ADB7BC]'>
        <p>Fastcart - © 2025. Design by TriCore Solutions</p>
      </div>
    </div>
  )
}

export default Footer