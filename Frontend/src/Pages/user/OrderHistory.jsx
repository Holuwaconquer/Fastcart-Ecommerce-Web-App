import React, { useContext, useEffect, useState } from 'react'
import { UserAccountContext } from './UserContext'
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const {userData } = useContext(UserAccountContext)
  const [userOrder, setUserOrder] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if(userData){
      setUserOrder(userData.productOrder)
    }
    console.log(userOrder);
    
  }, [userData])
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  
  
  return (
    <div className='w-full flex flex-col border border-[#E4E7E9] rounded-[4px]'>
      <h1 style={{padding:"15px 20px"}} className='font-bold text-[#191C1F] text-[14px]'>ORDER HISTORY</h1>
      <div style={{padding:"10px 20px"}} className='w-full grid grid-cols-5 text-[12px] text-[#475156] bg-[#F2F4F5] border border-[#E4E7E9]'>
        <p>ORDER ID</p>
        <p>STATUS</p>
        <p>DATE</p>
        <p>TOTAL</p>
        <p>ACTION</p>
      </div>
        {userData && (
          userOrder.map((order, index) => (
            <div key={index} style={{padding:"10px 20px"}} className='w-full grid grid-cols-5 text-[14px] text-[#475156]'>
              <p className='text-[#191C1F]'>#{order.flutterwaveResponse.transaction_id}</p>
              <p className={`${order.flutterwaveResponse.status === "completed" ? "text-[#2DB224]" : "text-[#EE5858]"}`}>{order.flutterwaveResponse.status}</p>
              <p className='text-[#5F6C72]'>
                {new Date(order.flutterwaveResponse.created_at)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                  .replace(',', '')}
              </p>
              <p className='text-[#475156]'>₦{order.subtotal.toLocaleString()} ({order.products.length} Products)</p>
              <p onClick={() => navigate(`/dashboard/order-history/${order.flutterwaveResponse.transaction_id}`)} className='text-[#2DA5F3] flex items-center gap-2 cursor-pointer'><span>View Details</span><IoIosArrowRoundForward size={16}/></p>
            </div>
          ))
        )}
    </div>
  )
}

export default OrderHistory