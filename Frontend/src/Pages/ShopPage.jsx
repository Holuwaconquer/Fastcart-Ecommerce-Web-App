import React, { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../CategoryContext'
import ProductCard from '../components/ProductCard'

const ShopPage = () => {
  const { allCategory, allProduct } = useContext(CategoryContext)
  const [productShowName, setProductShowName] = useState('All Product')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    console.log(allProduct);
    console.log(allCategory);
  }, [allProduct, allCategory])

  const topCategories = allCategory?.slice(0, 4) || []

  const filteredProducts = allProduct?.filter((product) => {
    const matchesCategory = productShowName === 'All Product' || product.category?.some(cat => cat.name === productShowName)
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearchQuery
  })

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)  // Update state when input changes
  }

  return (
    <div className='w-full' style={{padding: '2% 6%'}}>
      <div className='w-full grid md:grid-cols-[20%_80%] grid-rows-auto'>
        {/* for filter section */}
        <div className='w-full flex flex-col gap-4 border-b border-[#E4E7E9]' style={{paddingBottom: '20px'}}>
          {/* for category filter */}
          <h1>CATEGORY</h1>
          <div className='w-full flex gap-4 items-center'>
            <input type="radio" onChange={() => setProductShowName('All Product')} checked={productShowName === 'All Product'} name='category'/>
            <label htmlFor="">{productShowName}</label>
          </div>
          {allCategory && (
            allCategory.map((cat) =>(
              <div className='w-full flex gap-4 items-center' key={cat.name}>
                <input type="radio" onChange={() => setProductShowName(cat.name)} checked={productShowName === cat.name} name='category'/>
                <label htmlFor={cat.name}>{cat.name}</label>
              </div>
            ))
          )}
        </div>

        {/* for product section */}
        <div className='w-full flex flex-col gap-4'>
          {/* for search bar */}
          <div className='md:w-2/4 border border-[#E4E7E9] rounded-[2px] flex items-center justify-between' style={{padding: '10px'}}>
            <input 
              type="text" 
              value={searchQuery}  // Bind input value to searchQuery state
              onChange={handleSearchChange}  // Handle the input change
              placeholder='Search for anything...' 
              className='w-full outline-0'
            />
          </div>
          
          {/* for active filter section and result */}
          <div className='w-full flex items-center justify-between rounded-[4px] bg-[#F2F4F5]' style={{padding: '12px 24px'}}>
            {/* for active filter only */}
            <div className='flex gap-2 items-center'>
              <p className='text-[14px] text-[#5F6C72]'>Active Filters:</p>
              <p className='text-[14px] text-[#191C1F] font-medium'>{productShowName}</p>
            </div>
          </div>

          {/* for all product */}
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {filteredProducts?.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
