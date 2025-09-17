import React, { useContext, useEffect, useState } from 'react'
import { CategoryContext } from '../CategoryContext'
import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'

const ShopPage = () => {
  const { allCategory, allProduct } = useContext(CategoryContext)
  const [productShowName, setProductShowName] = useState('All Product')
  const [productPrice, setProductPrice] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const { categoryName }  = useParams()

  const topCategories = allCategory?.slice(0, 4) || []

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  useEffect(() => {
    if (categoryName) {
      setProductShowName(categoryName);
    }
    document.title  = `${categoryName || 'Shop All Product'} - Fastcart`
  }, [categoryName]);

  const filterByPrice  = (priceRange, product)  =>{
    switch(priceRange){
      case 'under10k':
        return product.price < 10000
      case '11k-49k':
        return product.price >= 11000 && product.price <= 49000;
      case '50k-100k':
        return product.price >= 50000 && product.price <= 100000;
      case '101k-500k':
        return product.price >= 101000 && product.price <= 500000;
      case '501k-1m':
        return product.price >= 501000 && product.price <= 1000000;
      case '1m-10m':
        return product.price >= 1000000 && product.price <= 10000000;
      case 'over10m':
        return product.price > 10000000;
      default:
        return true;
    }
  }

  const filteredProducts = allProduct?.filter((product) => {
    const matchesCategory = productShowName === 'All Product' 
        || product.category?.some(cat => cat.name === productShowName) 
        || (categoryName && product.category?.some(cat => cat.name === categoryName));

    const matchesSearchQuery = product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) 
        || product.description?.toLowerCase().includes(debouncedQuery.toLowerCase());

    const matchesPrice  = filterByPrice(productPrice, product)
    return matchesCategory && matchesSearchQuery && matchesPrice;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value) 
  }

  return (
    <div className='w-full' style={{padding: '2% 6%'}}>
      {allProduct ? 
        <div className='w-full grid md:grid-cols-[20%_80%] grid-rows-auto'>
          {/* for filter section */}
          <div>
            {/* for category filter */}
            <div className='w-full flex flex-col gap-2 border-b border-[#E4E7E9]' style={{paddingBottom: '20px'}}>
              <h1>CATEGORY</h1>
              <div className='w-full flex gap-4 items-center'>
                <input type="radio" id={`category-all`} onChange={() => setProductShowName('All Product')} checked={productShowName === 'All Product'} name='category'/>
                <label htmlFor={`category-all`}>{productShowName}</label>
              </div>
              {allCategory && (
                allCategory.map((cat) =>(
                  <div className='w-full flex gap-2 items-center' key={cat.name}>
                    <input type="radio" id={`category-${cat.name}`} onChange={() => setProductShowName(cat.name)} checked={productShowName === cat.name} name='category'/>
                    <label htmlFor={`category-${cat.name}`}>{cat.name}</label>
                  </div>
                ))
              )}
            </div>
            {/* for price range filtering */}
            <div className='w-full flex flex-col gap-2 border-b border-[#E4E7E9]' style={{paddingTop: '20px'}}>
              <h1>PRICE RANGE</h1>
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id="price-all" onChange={() => setProductPrice('all')} checked={productPrice === 'all'} name='pricerange'/>
                <label htmlFor="price-all">All Price</label>
              </div>
              {/* for price under 10,000 naira */}
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='10000 naira' onChange={() => setProductPrice('under10k')} checked={productPrice === 'under10k'} name='pricerange'/>
                <label htmlFor='10000 naira'>Under ₦10,000</label>
              </div>
              {/* for price between 11,000 and 49,000 naira */}
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='11000 to 49,000 naira' onChange={() => setProductPrice('11k-49k')} checked={productPrice === '11k-49k'} name='pricerange'/>
                <label htmlFor='11000 to 49,000 naira'>₦11,000 - ₦49,000</label>
              </div>
              {/* for price between 50,000 and 100,000 naira */}
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='50000 to 100,000 naira' onChange={() => setProductPrice('50k-100k')} checked={productPrice === '50k-100k'} name='pricerange'/>
                <label htmlFor='50000 to 100,000 naira'>₦50,000 - ₦100,000</label>
              </div>
              {/* for price between 101,000 and 500,000 naira */}
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='101,000 to 500,000 naira' onChange={() => setProductPrice('101k-500k')} checked={productPrice === '101k-500k'}  name='pricerange'/>
                <label htmlFor='101,000 to 500,000 naira'>₦101,000 - ₦500,000</label>
              </div>
              {/* for price between ₦501,000 - ₦1,000,000 naira */}
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='500,000 to 1,000,000 naira' onChange={() => setProductPrice('501k-1m')} checked={productPrice === '501k-1m'} name='pricerange'/>
                <label htmlFor='500,000 to 1,000,000 naira'>₦501,000 - ₦1,000,000</label>
              </div>
              {/* for price between ₦1,000,000 - ₦10,000,000 naira */}
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='1,000,000 to 10,000,000 naira' onChange={() => setProductPrice('1m-10m')} checked={productPrice === '1m-10m'} name='pricerange'/>
                <label htmlFor='1,000,000 to 10,000,000 naira'>₦1,000,000 - ₦10,000,000</label>
              </div>
              {/* for price over ₦10,000,000 naira */}
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='10,000,000 naira' onChange={() => setProductPrice('over10m')} checked={productPrice === 'over10m'} name='pricerange'/>
                <label htmlFor='10,000,000 naira'>Over ₦10,000,000</label>
              </div>
            </div>
          </div>

          {/* for product section */}
          <div className='w-full flex flex-col gap-4'>
            {/* for search bar */}
            <div className='md:w-2/4 border border-[#E4E7E9] rounded-[2px] flex items-center justify-between' style={{padding: '10px'}}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearchChange}
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

              {/* for result found number */}
              <p className='text-[#5F6C72]'><strong className='text-[#191C1F] text-[16px]'>{filteredProducts?.length.toLocaleString()}</strong> Results found.</p>
            </div>

            {/* for all product */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {filteredProducts?.map((product) => (
                <ProductCard key={product._id} product={product}/>
              ))}
            </div>
          </div>
        </div>
      :
      <Loader />
      }
    </div>
  )
}

export default ShopPage
