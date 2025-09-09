import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserAccountContext } from './UserContext'
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { CategoryContext } from '../../CategoryContext';
import { PiNotebookDuotone, PiPackage, PiTruckLight, PiHandshakeLight } from "react-icons/pi";
import { RxCheck } from "react-icons/rx";

const OrderDetails = () => {
  const { id } = useParams()
  const {userData } = useContext(UserAccountContext)
  const [order, setOrder] = useState(null)
  const { allProduct } = useContext(CategoryContext)

  useEffect(() => {
    if(userData && userData.productOrder) {
      const foundOrder = userData.productOrder.find(
        (order) => order.flutterwaveResponse.transaction_id.toString() === id
      )
      setOrder(foundOrder)
      console.log(order);
    }
  }, [userData, id])
  const expectedDate = order
  ? new Date(order.flutterwaveResponse.created_at)
  : null;
  if (expectedDate) expectedDate.setDate(expectedDate.getDate() + 5);
  
  return (
    <div className='w-full flex flex-col border border-[#E4E7E9] rounded-[4px]'>
      <div style={{padding:"15px 20px"}} className='w-full flex justify-between items-center border-b border-[#E4E7E9]'>
        <p onClick={() => window.history.back()} className='flex cursor-pointer gap-1 items-center text-[14px] text-[#191C1F]'><IoIosArrowRoundBack size={24}/><span>ORDER DETAILS</span></p>
        <p className='flex gap-1 items-center text-[14px] text-[#FA8232]'><span>Leave a Rating</span><LuPlus size={24}/></p>
      </div>
      {order ? (
        <div className='w-full flex flex-col gap-4'>
          <div style={{padding: '20px'}}>
            <div className='w-full flex items-center justify-between border border-[#F7E99E] bg-[#FDFAE7] rounded-[4px]' style={{padding: '20px'}}>
              <div className='flex flex-col gap-2'>
                <h1 className='text-[20px] text-[#191C1F] font-bold'>#{id}</h1>
                <p>
                  {order.products.length} Products • Order Placed in <span>
                  {new Date(order.flutterwaveResponse.created_at)
                    .toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(',', '')
                  }
                  </span>
                </p>
              </div>
              <p className='text-[#2DA5F3] text-[28px] font-bold'>₦{order.subtotal.toLocaleString()}</p>
            </div>
          </div>
          {/* for order tracker */}
          <div className='w-full flex flex-col gap-4 items-center justify-center' style={{padding: '0px 20px'}}>
            <p>Order expected arrival <strong>{expectedDate.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</strong></p>
            <div className='w-3/4 grid grid-cols-4'>
              {/* for order placed tracker */}
              <div className='flex flex-col gap-6'>
                <div className='w-full h-[8px] bg-[#FA8232] relative'>
                  <div className='absolute text-white top-[-100%] left-[-10px] w-[24px] h-[24px] bg-[#FA8232] rounded-full flex flex-col items-center justify-center'>
                    <RxCheck />
                  </div>
                </div>
                <div>
                  <PiNotebookDuotone size={32} className='text-[#2DB224]'/>
                  <p className='text-[14px] text-[#191C1F]'>Order Placed</p>
                </div>
              </div>
              {/* for packaging tracker */}
              <div className='flex flex-col gap-6'>
                <div className={`w-full h-[8px] relative ${order.orderStatus === 'packaging' || order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'bg-[#FA8232]' : 'bg-[#FFE7D6]'}`}>
                  <div className={`absolute text-white top-[-100%] left-[-10px] w-[24px] h-[24px] ${order.orderStatus === 'packaging' || order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'bg-[#FA8232]' : 'bg-[#FFE7D6] border border-[#FA8232]'} rounded-full flex flex-col items-center justify-center`}>
                    <RxCheck className={`${order.orderStatus === 'packaging' || order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'block' : 'hidden'}`} />
                  </div>
                </div>
                <div>
                  <PiPackage size={32} className={`${order.orderStatus === 'packaging' || order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'text-[#FA8232]' : 'text-[#FFE7D6]'}`} />
                  <p className={`text-[14px] ${order.orderStatus === 'packaging' || order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'text-[#191C1F]' : 'opacity-20'}`}>Packaging</p>
                </div>
              </div>
              {/* for on the road */}
              <div className='flex flex-col gap-6'>
                <div className={`w-full h-[8px] relative ${order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'bg-[#FA8232]' : 'bg-[#FFE7D6]'}`}>
                  <div className={`absolute text-white top-[-100%] left-[-10px] w-[24px] h-[24px] ${order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'bg-[#FA8232]' : 'bg-[#FFE7D6] border border-[#FA8232]'} rounded-full flex flex-col items-center justify-center`}>
                    <RxCheck className={`${order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'block' : 'hidden'}`} />
                  </div>
                </div>
                <div>
                  <PiTruckLight size={32} className={`${order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'text-[#FA8232]' : 'text-[#FFE7D6]'}`} />
                  <p className={`text-[14px] ${order.orderStatus === 'on_the_road' || order.orderStatus === 'delivered' ? 'text-[#191C1F]' : 'opacity-20'}`}>On The Road</p>
                </div>
              </div>
              {/* for handshake tracker */}
              <div className='flex flex-col gap-6'>
                <div className='h-[8px] relative'>
                  <div className={`absolute text-white top-[-100%] left-[-10px] w-[24px] h-[24px] ${order.orderStatus === 'delivered' ? 'bg-[#FA8232]' : 'bg-[#FFE7D6] border border-[#FA8232]'} rounded-full flex flex-col items-center justify-center`}>
                    <RxCheck className={`${order.orderStatus === 'delivered' ? 'block' : 'hidden'}`} />
                  </div>
                </div>
                <div>
                  <PiHandshakeLight size={32} className={`${order.orderStatus === 'delivered' ? 'text-[#FA8232]' : 'text-[#FFE7D6]'}`} />
                  <p className={`text-[14px] ${order.orderStatus === 'delivered' ? 'text-[#191C1F]' : 'opacity-20'}`}>Delivered</p>
                </div>
              </div>
            </div>
          </div>
          {/* order product */}
          <div className='w-full flex flex-col'>
            <h1 className='text-[18px] border-t border-[#E4E7E9] border-b font-bold' style={{padding: '20px'}}><span className='text-[#191C1F]'>Product</span><span className='text-[#5F6C72]'> ({order.products.length})</span></h1>
            <div style={{padding:"10px 20px"}} className='w-full grid grid-cols-[3fr_1fr_1fr_1fr] text-[12px] text-[#475156] bg-[#F2F4F5] border border-[#E4E7E9]'>
              <p>PRODUCTS</p>
              <p>PRICE</p>
              <p>QUANTITY</p>
              <p>SUB-TOTAL</p>
            </div>
            {order?.products?.map((product, index) => (
            <div key={index} style={{padding:"20px"}} className='w-full border-b border-[#E4E7E9] grid grid-cols-[3fr_1fr_1fr_1fr] text-[12px] text-[#475156]'>
                <div className='w-full flex items-center gap-2'>
                  <div className='w-[80px] h-[80px]'>
                    <img src={product.image} alt="" />
                  </div>
                  <div>
                    <p className='font-semibold text-[12px] text-[#2DA5F3]'>{allProduct.find(item => item._id === product.id)?.category?.map(cat => cat.name).join(', ').toUpperCase()}</p>
                    <p className='text-[14px] text-[#191C1F]'>{product.name}</p>

                  </div>
                </div>
                <p className='text-[#475156] text-[14px]'>{product.price.toLocaleString()}</p>
                <p className='text-[#475156] text-[14px]'>{product.quantity || 1}</p>
                <p className='text-[#191C1F] text-[14px]'>₦{(product.price * (product.quantity || 1)).toLocaleString()}</p>
            </div>
            ))}
            <div style={{padding:"20px"}} className='w-full grid md:grid-cols-[1fr_1fr_1fr] text-[12px] text-[#475156]'>
              <div className='w-full flex flex-col gap-4 border-r border-[#E4E7E9]'>
                <h1 className='text-[18px] font-bold text-[#191C1F]'>Billing Address</h1>
                <p className='text-[14px] font-medium text-[#191C1F]'>{order.billingDetails.firstname} {order.billingDetails.lastname}</p>
                <p className='text-[14px] text-[#5F6C72]'>{order.billingDetails.address}, {order.billingDetails.city}, {order.billingDetails.state}, {order.billingDetails.country}</p>
                <p className='text-[14px] text-[#5F6C72]'><span className='font-semibold'>Phone number:</span> {order.billingDetails.phone}</p>
                <p className='text-[14px] text-[#5F6C72]'><span className='font-semibold'>Email:</span> {order.billingDetails.email}</p>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div style={{padding: '20px'}}>Loading Order details...</div>
      )}
    </div>
  )
}

export default OrderDetails