import React from 'react'
import Fastcart from '../assets/fastcartLogo.png'
import GetApple from '../assets/getAppStore.png'
import GetGoogle from '../assets/GetGoogle.png'

const Footer = () => {
  return (
    <div className='w-full bg-[#191C1F]'>
      <div style={{padding: '2% 8%'}} className='w-full grid grid-cols-[2fr_1fr_1fr_1fr_2fr]'>
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
            <li>Computer & Laptop</li>
            <li>SmartPhone</li>
            <li>HeadPhone</li>
            <li>Camera & Photo</li>
          </ul>
        </div>
        {/* end of top category */}
        {/* for download app */}
        <div className='flex flex-col gap-4'>
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
        <p>Fastcart - © 2025. Design by Okikiola</p>
      </div>
    </div>
  )
}

export default Footer