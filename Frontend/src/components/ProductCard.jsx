import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { addToCart, removeFromCart } from '../redux/Cart';
import { FaMinus } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const [isHover, setIsHover] = useState(false)
  const cartItem = useSelector(state => state.cart.cartItem);
  const isAddedToCart = cartItem.some(item => item._id === product._id)

  const handleCartToggle = () =>{
    if(isAddedToCart){
      dispatch(removeFromCart(product))
    }else{
      dispatch(addToCart(product))
    }
  }

  return (
    <div onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)} className="w-full flex flex-col gap-2 border-1 border-[#E4E7E9]" style={{ padding: "10px" }} >
      <div className="relative h-[172px]">
        <img className='hover:rounded-[3px] h-full w-full object-contain' src={product?.image[0]} alt="product-image" />
        <span className="absolute top-0 left-0 rounded-[2px] bg-[#EFD33D] text-black" style={{ padding: "5px 10px" }}>
          {product?.discountPercentage}% OFF
        </span>
        {/* for cart action button */}
        <div style={{padding: '0 30px'}} className={`${isHover ? 'flex' : 'hidden'} cursor-pointer absolute w-full h-full bg-[#00000083] flex-col items-center justify-center top-0 left-0`}>
          <div className='w-full flex items-center justify-between gap-4'>
            <div className="rounded-[50%] bg-white cursor-pointer transition-all text-[#191C1F] hover:bg-[#FA8232] hover:text-white" style={{ padding: "12px" }}>
              <FaRegHeart size={24} />
            </div>
            <div onClick={handleCartToggle} className="rounded-[50%] bg-white cursor-pointer transition-all text-[#191C1F] hover:bg-[#FA8232] hover:text-white" style={{ padding: "12px" }}>
              {isAddedToCart ? <FaMinus size={24} /> : <FiShoppingCart size={24} />}
            </div>
            <div className="rounded-[50%] bg-white cursor-pointer transition-all text-[#191C1F] hover:bg-[#FA8232] hover:text-white" style={{ padding: "12px" }}>
              <MdOutlineRemoveRedEye size={24} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-[14px] text-[#191C1F]">
        {product?.description.split(' ').slice(0, 15).join(' ')}...
      </p>
      <p className="text-[#2DA5F3] text-[14px]">
        <span className="text-[18px] text-[#ADB7BC] line-through">₦{product?.price.toLocaleString()}</span>
        <span className="text-[#2DA5F3] text-[18px] font-bold">
          ₦{product?.discountprice.toLocaleString()}
        </span>
      </p>
    </div>
  )
}

export default ProductCard