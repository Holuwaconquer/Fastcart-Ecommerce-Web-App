import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { CategoryContext } from '../CategoryContext';

const Productdetails = () => {
  const id = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const { allProduct } = useContext(CategoryContext)
  const [product, setProduct] = useState({})
  
  useEffect(() => {
    const foundProduct = allProduct.find((product) => product._id === id.id)
    setProduct(foundProduct)
    console.log(foundProduct)
    
  }, [id, allProduct])
  
  return (
    <div className='w-full flex flex-col gap-4' style={{ padding: "10px 8%" }}>
      <div className='w-full grid md:grid-cols-2 gap-8'>
        {/* this is for product image */}
        <div className='w-full flex flex-col gap-4'>
          <div className='w-full h-[464px] rounded-[4px] border border-[#E4E7E9]' style={{padding: '5%'}}>
            <img src={product?.image?.[0]} className='w-full h-full object-contain' alt="" />
          </div>
          {/* all images */}
          
        </div>
        {/* this is for products name */}
        <div className='w-full flex flex-col gap-2'>
          <h1 className='text-[20px] text-[#191C1F] font-medium'>{product?.name}</h1>
          <div className='w-full flex items-center justify-between'>
          <p className='text-[14px]'>Category: <span className='text-[#191C1F] font-semibold'>{product?.category ? product.category.map((cat) =>cat.name) : '-'}</span></p>
          <p className='text-[14px]'>Availability: <span className='text-[#2DB224] font-semibold'>{product?.inventory > 0 ? `${product?.inventory} in stock` : 'out of stock'}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productdetails