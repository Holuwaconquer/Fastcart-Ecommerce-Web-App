import React, { useContext, useEffect, useState } from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useDispatch, useSelector } from 'react-redux'
import { CgArrowRight } from "react-icons/cg";
import { UserAccountContext } from '../Pages/user/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const cartItem = useSelector(state => state.cart.cartItem)
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch()
  const subtotal = cartItem.reduce((acc, item) => {
    const price = typeof item.discountprice === 'number' ? item.discountprice : item.price;
    const qty = item.quantity || 1;
    return acc + (price * qty);
  }, 0);
  const { userData } = useContext(UserAccountContext)

  useEffect(() => {
    console.log(userData);
    
  }, [userData])
  const navigate = useNavigate()
  const public_key = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY;
  const config = {
    public_key: public_key,
    tx_ref: Date.now(),
    amount: subtotal,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',

    customer: {
      email: 'holuwaconquer@gmail.com',
      phone_number: +2349025140981,
      name: "Fastcart",
    },

    customizations: {
      title: 'Fastcart',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div style={{ padding: "30px 6%" }} className='w-full flex flex-col'>
      <div className='w-full grid md:grid-cols-[2fr_1fr] gap-7 items-start'>
        {/* for billing information and and payment option */}
        <div className='w-full flex flex-col gap-4'>
          {/* for billing address */}
          <div className='flex flex-col gap-4'>
            <h1 style={{padding: '10px 15px 10px'}} className='w-full font-bold border-[#E4E7E9] text-[14px] text-[#191C1F]'>BILLING ADDRESS</h1>
            {userData ?
              <div className='w-full flex flex-col gap-5'>
                  <div className='w-full'>
                    {/* for personal information details */}
                    <div className='w-full flex flex-col gap-5'>
                      <div className='w-full grid md:grid-cols-1 grid-rows-auto gap-3'>
                        {/* for firstname and lastname in billing details */}
                        <div className='w-full grid md:grid-cols-2 gap-4'>
                          {/* for first name */}
                          <div className='w-full flex flex-col gap-1'>
                            <small className='text-[14px] text-[#191C1F] font-bold'>Firstname</small>
                            <input readOnly name='billingfirstname' value={userData?.billingfirstname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                          </div>
                          {/* for last name */}
                          <div className='w-full flex flex-col gap-1'>
                            <small className='text-[14px] text-[#191C1F] font-bold'>Lastname</small>
                            <input readOnly name='billinglastname' value={userData?.billinglastname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                          </div>
                        </div>
                        {/* for billingcompanyname */}
                        <div className='w-full flex flex-col gap-1'>
                          <small className='text-[14px] text-[#191C1F] font-bold'>Company Name</small>
                          <input readOnly name='billingcompanyname'  value={userData?.billingcompanyname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                        </div>
                        {/* for billingaddress */}
                        <div className='w-full flex flex-col gap-1'>
                          <small className='text-[14px] text-[#191C1F] font-bold'>Address</small>
                          <input readOnly name='billingaddress' value={userData?.billingaddress} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                        </div>
                        {/* for country */}
                        <div className='w-full flex flex-col gap-1'>
                          <small className='text-[14px] text-[#191C1F] font-bold'>Country</small>
                          <input readOnly type="text" value={userData?.billingcountry} className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                        </div>
                        {/* for state */}
                        <div className='w-full flex flex-col gap-1'>
                          <small className='text-[14px] text-[#191C1F] font-bold'>State</small>
                          <input readOnly type="text" value={userData?.billingstate} className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                        </div>
                        {/* for city and zipcode */}
                        <div className='w-full grid md:grid-cols-2 gap-4'>
                            {/* for billingcity */}
                            <div className='w-full flex flex-col gap-1'>    
                              <div className='w-full flex flex-col gap-1'>
                                <small className='text-[14px] text-[#191C1F] font-bold'>City</small>
                                <input readOnly name='billingcity' value={userData?.billingcity} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                              </div>
                            </div>
                            {/* for billingzipcode */}
                            <div className='w-full flex flex-col gap-1'>    
                              <div className='w-full flex flex-col gap-1'>
                                <small className='text-[14px] text-[#191C1F] font-bold'>Zip Code</small>
                                <input readOnly name='billingzipcode' value={userData?.billingzipcode} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                              </div>
                            </div>
                        </div>
                        {/* for email */}
                        <div className='w-full flex flex-col gap-1'>
                          <small className='text-[14px] text-[#191C1F] font-bold'>Email</small>
                          <input readOnly name='billingemail' value={userData?.billingemail} type="email" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                        </div>
                        {/* for phone number */}
                        <div className='w-full flex flex-col gap-1'>
                          <small className='text-[14px] text-[#191C1F] font-bold'>Phone number</small>
                          <input readOnly name='billingphonenumber' value={userData?.billingphonenumber} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
                        </div>
                      </div>
                      
                    </div>
                      {/* end of personal information details */}
                  </div>
              </div>
              : 
              <p>Loading</p>
            }
          </div>
          {/* for payment method*/}
          <div className='w-full border-1 border-[#E4E7E9] rounded-[4px]'>
            <h1 style={{padding: '10px 15px 10px'}} className='w-full font-bold border-[#E4E7E9] text-[14px] text-[#191C1F]'>PAYMENT METHOD</h1>
            <div></div>
          </div>
        </div>
        {/* for order summary */}
        <div className='w-full flex flex-col gap-4'>
          {/* for chekout */}
          <div style={{padding: '20px'}} className='w-full bg-white border border-[#E4E7E9] rounded-[4px] flex flex-col gap-4'>
            <p className='text-[#191C1F] text-[18px] font-bold'>Order Summary</p>
            {/* for cart product */}
            <div style={{padding: '20px'}} className='w-full flex flex-col gap-4'>
              {cartItem.map((cartProduct) => (
                <div key={cartProduct._id} className='w-full grid grid-cols-[1fr_3fr] grid-rows-auto gap-2 items-center'>
                  <div className='w-[64px] h-[64px] border border-[#E4E7E9]'>
                    <img className='w-full h-full object-contain' src={cartProduct?.image[0]} alt="" />
                  </div>
                  <div className='w-full'>
                    <p className='font-bold text-[#191C1F] text-[14px]'>{cartProduct?.name.split(' ').splice(0, 5).join(' ')}...</p>
                    <div className='w-full flex items-center gap-2 text-[#5F6C72]'>
                      <p>{cartProduct.quantity || 1}</p>
                      <p>x</p>
                      <p className='text-[#2DA5F3] text-[14px] font-bold'>
                        ₦{(typeof cartProduct?.discountprice === 'number' ? cartProduct.discountprice : cartProduct?.price)?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full flex flex-col gap-2 border-b border-[#E4E7E9]' style={{paddingBottom: '20px'}}>
              <p className='w-full flex items-center justify-between'><span className='text-[#5F6C72] text-[14px]'>Sub-total</span><span className='text-[#191C1F] text-[14px] font-bold'>₦{subtotal.toLocaleString()}</span></p>
              <p className='w-full flex items-center justify-between'><span className='text-[#5F6C72] text-[14px]'>Shipping</span><span className='text-[#191C1F] text-[14px] font-bold'>Free</span></p>
              <p className='w-full flex items-center justify-between'><span className='text-[#5F6C72] text-[14px]'>Discount</span><span className='text-[#191C1F] text-[14px] font-bold'>-</span></p>
            </div>
            <p className='w-full flex items-center justify-between'><span className='text-[#5F6C72] text-[16px]'>Total</span><span className='text-[#191C1F] text-[16px] font-bold'>₦{subtotal.toLocaleString()}</span></p>
            <button
              onClick={() => {
                handleFlutterPayment({
                  callback: (response) => {
                    if(response){
                      axios.post(`${API_URL}/user/orderDetails/${userData._id}`, {
                        flutterwaveResponse: response,
                        cartItems: cartItem,
                        billingDetails: {
                          firstname: userData?.billingfirstname,
                          lastname: userData?.billinglastname,
                          address: userData?.billingaddress,
                          country: userData?.billingcountry,
                          state: userData?.billingstate,
                          city: userData?.billingcity,
                          zipcode: userData?.billingzipcode,
                          email: userData?.billingemail,
                          phone: userData?.billingphonenumber,
                        },
                        subtotal
                      })
                      .then((res) =>{
                        console.log('order Completed', res);
                        if(res.status)
                        navigate(`/shopping-cart/checkout/payment-successful/${res.data.orderId}`)
                        
                      }).catch((err) =>{
                        console.log(err);
                      })
                    }
                      closePaymentModal()
                  },
                  onClose: () => {},
                });
              }}
             style={{padding: '15px 0'}} className='rounded-[2px] bg-[#FA8232] transition-all cursor-pointer font-bold hover:bg-[#f76f14] active:bg-[#fd9752] text-white w-full flex items-center justify-center gap-4'><span>PLACE ORDER</span><CgArrowRight className='text-white' size={24} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout