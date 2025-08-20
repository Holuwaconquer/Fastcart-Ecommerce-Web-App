import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxCrossCircled } from "react-icons/rx";
import { removeFromCart, updateQuantity } from '../redux/Cart';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CgArrowRight } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';


const ShoppingCart = () => {
  const cartItem = useSelector(state => state.cart.cartItem)
  const dispatch = useDispatch()
  const subtotal = cartItem.reduce((acc, item) => {
    const price = typeof item.discountprice === 'number' ? item.discountprice : item.price;
    const qty = item.quantity || 1;
    return acc + (price * qty);
  }, 0);
  const eachSubtotal = cartItem.reduce((acc, item) => {
    const price = typeof item.discountprice === 'number' ? item.discountprice : item.price;
    const qty = item.quantity || 1;
    return acc + (price * qty);
  }, 0);
  const navigate = useNavigate()

  return (
    <div style={{ padding: "30px 8%" }} className='w-full flex flex-col'>
      <div className='w-full grid md:grid-cols-[2fr_1fr] gap-7 items-start'>
        <div className='w-full bg-white border border-[#E4E7E9] rounded-[4px] flex flex-col'>
          <div className='w-full border-b-1 border-[#E4E7E9]' style={{padding: '10px 20px'}}>
            <p className='text-[#191C1F] text-[16px] font-bold'>Shopping Cart ({cartItem.length>0 && cartItem.length})</p>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <div style={{padding: '10px 20px'}} className='w-full grid grid-cols-[4fr_1fr_2fr_1fr] border border-[#E4E7E9] bg-[#F2F4F5] text-[#475156] text-[12px]'>
              <p>PRODUCTS</p>
              <p>PRICE</p>
              <p>QUANTITY</p>
              <p>SUB-TOTAL</p>
            </div>
            <div style={{padding: '20px'}} className='w-full flex flex-col gap-4 border-b-1 border-[#E4E7E9]'>
              {cartItem.map((cartProduct) => (
                <div key={cartProduct._id} className='w-full grid grid-cols-[4fr_1fr_2fr_1fr] grid-rows-auto gap-4 items-center'>
                  {/* for products */}
                  <div className='w-full flex items-center gap-4'>
                    <RxCrossCircled onClick={() => dispatch(removeFromCart(cartProduct))} size={24} className='text-[#929FA5] cursor-pointer'/>
                    <div className='w-[72px] h-[72px]'>
                      <img className='w-full h-full object-contain' src={cartProduct?.image[0]} alt="" />
                    </div>
                    <p className='font-bold text-[#191C1F] text-[14px]'>{cartProduct?.name}</p>
                  </div>
                  {/* for price */}
                  <div>
                    <p className='text-[#475156] text-[14px] font-bold'>
                      ₦{(typeof cartProduct?.discountprice === 'number' ? cartProduct.discountprice : cartProduct?.price)?.toLocaleString()}
                    </p>
                  </div>
                  {/* for quantity */}
                  <div>
                    <div>
                      <div className='w-25 text-[#191C1F] flex items-center gap-4 justify-center border border-[#E4E7E9] rounded-[3px]' style={{padding: '10px 20px'}}>
                        <FaMinus className='cursor-pointer'
                          onClick={() => {
                            dispatch(updateQuantity({
                              productId: cartProduct._id,
                              quantity: Math.max(1, (cartProduct.quantity || 1) - 1)
                            }));
                          }} size={16}  
                        />
                        <input type="text" onChange={(e) => {
                          const value = parseInt(e.target.value);
                            dispatch(updateQuantity({
                              productId: cartProduct._id,
                              quantity: isNaN(value) || value < 1 ? 1 : value
                            }));
                          }} className='border-0 focus:outline-0 w-2' value={cartProduct.quantity || 1}
                        />
                        <FaPlus className='cursor-pointer'
                          onClick={() => {
                            dispatch(updateQuantity({
                              productId: cartProduct._id,
                              quantity: (cartProduct.quantity || 1) + 1
                            }));
                          }} 
                          size={16} 
                        />
                      </div>
                    </div>
                  </div>
                  {/* for sub total */}
                  <div>
                    <p className='text-[16px] text-[#191C1F] font-bold'>
                      ₦{
                        (
                          ((typeof cartProduct.discountprice === 'number' ? cartProduct.discountprice : cartProduct.price) * 
                          (cartProduct.quantity || 1))
                        ).toLocaleString()
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* for button */}
            <div style={{padding: '20px'}} className='w-full flex items-center justify-between gap-4'>
              <button style={{padding: '15px 0'}} className='rounded-[2px] border-2 border-[#2DA5F3] transition-all cursor-pointer font-bold hover:bg-[#2DA5F3] hover:text-white active:text-white active:bg-[#2DA5F3] text-[#2DA5F3] w-full w-full flex items-center justify-center gap-4'><IoIosArrowRoundBack size={24} /><span>RETURN TO SHOP</span></button>
              <button style={{padding: '15px 0'}} className='rounded-[2px] border-2 border-[#2DA5F3] transition-all cursor-pointer font-bold hover:bg-[#2DA5F3] hover:text-white active:text-white active:bg-[#2DA5F3] text-[#2DA5F3] w-full'>UPDATE CART</button>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4'>
          {/* for chekout */}
          <div style={{padding: '20px'}} className='w-full bg-white border border-[#E4E7E9] rounded-[4px] flex flex-col gap-4'>
            <p className='text-[#191C1F] text-[18px] font-bold'>Cart Totals</p>
            <div className='w-full flex flex-col gap-2 border-b border-[#E4E7E9]' style={{paddingBottom: '20px'}}>
              <p className='w-full flex items-center justify-between'><span className='text-[#5F6C72] text-[14px]'>Sub-total</span><span className='text-[#191C1F] text-[14px] font-bold'>₦{subtotal.toLocaleString()}</span></p>
              <p className='w-full flex items-center justify-between'><span className='text-[#5F6C72] text-[14px]'>Shipping</span><span className='text-[#191C1F] text-[14px] font-bold'>Free</span></p>
              <p className='w-full flex items-center justify-between'><span className='text-[#5F6C72] text-[14px]'>Discount</span><span className='text-[#191C1F] text-[14px] font-bold'>-</span></p>
            </div>
            <p className='w-full flex items-center justify-between'><span className='text-[#5F6C72] text-[16px]'>Sub-total</span><span className='text-[#191C1F] text-[16px] font-bold'>₦{subtotal.toLocaleString()}</span></p>
            <button onClick={() => navigate('/shopping-cart/checkout')} style={{padding: '15px 0'}} className='rounded-[2px] bg-[#FA8232] transition-all cursor-pointer font-bold hover:bg-[#f76f14] active:bg-[#fd9752] text-white w-full flex items-center justify-center gap-4'><span>CHECK OUT NOW</span><CgArrowRight className='text-white' size={24} /></button>
          </div>

          {/* for coupon */}
          <div className='w-full bg-white border border-[#E4E7E9] rounded-[4px] flex flex-col gap-4'>
            <p className='text-[#191C1F] text-[18px] font-bold border-b border-[#E4E7E9]' style={{padding: '10px 20px'}}>Coupon</p>
            <div style={{padding: '20px'}}>
              <div className='w-full flex flex-col gap-2' style={{paddingBottom: '20px'}}>
                <input type="text" placeholder='Enter a coupon if you have' className='border border-[#E4E7E9] focus:outline-0 rounded-[2px]' style={{padding: '10px'}}/>
              </div>
              <div>
                <button style={{padding: '15px 20px'}} className='rounded-[2px] bg-[#2DA5F3] transition-all cursor-pointer font-bold hover:bg-[#189cf5] active:bg-[#58b6f5] text-white'>CHECK OUT NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart