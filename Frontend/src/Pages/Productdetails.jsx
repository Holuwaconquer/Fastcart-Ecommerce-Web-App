import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { CategoryContext } from '../CategoryContext';
import { FiShoppingCart } from "react-icons/fi";
import { FaStar, FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/Cart';
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Loader from '../components/Loader';

const Productdetails = () => {
  const id = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const { allProduct } = useContext(CategoryContext)
  const [product, setProduct] = useState({})
  const dispatch = useDispatch()
  const cartItem = useSelector(state => state.cart.cartItem)
  
  useEffect(() => {
    const foundProduct = allProduct.find((product) => product._id === id.id)
    setProduct(foundProduct)
    console.log(foundProduct)

    document.title = `${foundProduct?.name || 'Loading...'} | Fastcart Online Store`
    
  }, [id, allProduct])
  const isAddedToCart = product && cartItem.some(item => item._id === product._id);

  const handleCartToggle = () =>{
    if(isAddedToCart){
      dispatch(removeFromCart(product))
    }else{
      dispatch(addToCart(product))
    }
  }
  
  return (
    <div className='w-full flex flex-col gap-4' style={{ padding: "3% 6%" }}>
      {product ? 
        <div className='w-full grid md:grid-cols-2 gap-8'>
          {/* this is for product image */}
          <div className='w-full flex flex-col gap-4'>
            <div className='w-full h-[300px] md:h-[400px] rounded-[4px] border border-[#E4E7E9]' style={{padding: '5%'}}>
              <img src={product?.image?.[0]} className='w-full h-full object-contain' alt="" />
            </div>
            {/* all images */}
            
          </div>
          {/* this is for products name */}
          <div className='w-full flex flex-col gap-2'>
            <h1 className='text-[24px] text-[#191C1F] font-bold'>{product?.name}</h1>
            <div className='w-full flex items-center gap-4'>
              <p className='text-[14px]'>Category: <span className='text-[#191C1F] font-semibold'>{product?.category ? product.category.map((cat) =>cat.name) : '-'}</span></p>
              <p className='text-[14px]'>Availability: <span className='text-[#2DB224] font-semibold'>{product?.inventory > 0 ? `${product?.inventory} in stock` : 'out of stock'}</span></p>
            </div>
            {/* for price and percentage */}
            <div className='w-full flex flex-row gap-4 items-center md:items-center border-b border-[#E4E7E9]' style={{padding: '20px 0'}}>
              <p className="text-[#2DA5F3] text-[14px] flex flex-col md:flex-row md:items-center md:gap-2">
                {product?.discountprice && (
                  <span className="text-[#2DA5F3] text-[18px] md:text-[34px] font-bold">
                    ₦{product?.discountprice?.toLocaleString()}
                  </span>
                )}
                <span className={`md:text-[20px] ${product?.discountprice ? 'line-through text-[#77878F]' : 'text-[#2DA5F3] md:text-[34px] font-bold'}`}>₦{product?.price?.toLocaleString()}</span>
              </p>
              {product?.discountPercentage &&
                <span className="rounded-[2px] bg-[#EFD33D] text-black text-[12px]" style={{ padding: "3px 5px" }}>
                  {product?.discountPercentage}% OFF
                </span>
              }
            </div>
            {/* action button */}
            <div className='w-full grid md:grid-cols-[1fr_3fr_1fr] gap-4' style={{padding: '20px 0'}}>
              <button className="rounded-[3px] border-2 border-[#FA8232] text-[#FA8232] flex items-center justify-center gap-[8px] cursor-pointer transition-all hover:bg-[#f3dccd] active:bg-[#f1c8ae]" style={{ padding: "12px" }}>
                <FaRegHeart size={24} />
              </button>
              <button onClick={handleCartToggle} className="rounded-[3px] bg-[#FA8232] text-white flex items-center justify-center gap-[8px] cursor-pointer transition-all hover:bg-[#f7751f] active:bg-[#f89e62]" style={{ padding: "15px" }}>
                {isAddedToCart ? <FaMinus  size={20} /> : <FiShoppingCart size={20} />} 
                <span className="font-bold text-[14px]">{isAddedToCart ? 'REMOVE FROM CART' : 'ADD TO CART'}</span>
              </button>

              <button className="rounded-[3px] border-2 border-[#FA8232] text-[#FA8232] justify-center flex items-center gap-[8px] cursor-pointer transition-all hover:bg-[#f3dccd] active:bg-[#f1c8ae]" style={{ padding: "12px" }}>
                <MdOutlineRemoveRedEye size={24} />
              </button>
            </div>
          </div>
        </div>
      :
      <Loader />
      }
    </div>
  )
}

export default Productdetails