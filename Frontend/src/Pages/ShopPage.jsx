import React, { useContext, useEffect, useMemo, useState } from 'react'
import { CategoryContext } from '../CategoryContext'
import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { IoFilter } from "react-icons/io5";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const ShopPage = () => {
  const { allCategory, allProduct } = useContext(CategoryContext)
  const [productShowName, setProductShowName] = useState('All Product')
  const [productPrice, setProductPrice] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const { categoryName }  = useParams()
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 40;

  const topCategories = allCategory?.slice(0, 4) || []

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (categoryName) {
      setProductShowName(categoryName);
    }
    document.title  = `${categoryName || 'Shop All Product'} - Fastcart`
  }, [categoryName]);

  const filterByPrice  = (priceRange, product)  =>{
    const price = Number(product.price) || 0
    switch(priceRange){
      case 'under10k':
        return price < 10000
      case '11k-49k':
        return price >= 11000 && price <= 49000;
      case '50k-100k':
        return price >= 50000 && price <= 100000;
      case '101k-500k':
        return price >= 101000 && price <= 500000;
      case '501k-1m':
        return price >= 501000 && price <= 1000000;
      case '1m-10m':
        return price >= 1000000 && price <= 10000000;
      case 'over10m':
        return price > 10000000;
      default:
        return true;
    }
  }

  const filteredProducts = useMemo(() =>{
    return allProduct?.filter((product) => {
      const matchesCategory = productShowName === 'All Product' 
          || product.category?.some(cat => cat.name === productShowName) 
          || (categoryName && product.category?.some(cat => cat.name === categoryName));

      const matchesSearchQuery = product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) 
          || (product.description || '').toLowerCase().includes(debouncedQuery.toLowerCase());

      const matchesPrice  = filterByPrice(productPrice, product)
      return matchesCategory && matchesSearchQuery && matchesPrice;
    });
  }) 

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value) 
  }

  // Filter panel state
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  const openFilterPanel = () => setShowFilterMobile(true);
  const closeFilterPanel = () => setShowFilterMobile(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [productShowName, productPrice, debouncedQuery]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  return (
    <div className='w-full' style={{padding: '2% 6%'}}>
      {Array.isArray(allProduct) && allProduct.length !== 0 ? (
        <div className={`w-full grid ${showFilterMobile ? 'md:grid-cols-[20%_80%]' : 'md:grid-cols-[20%_80%]'} grid-rows-auto`}>
          {/* Filter Section Desktop */}
          <div className="hidden md:block bg-white p-5 h-full">
            {/* Category filter */}
            <div className="w-full flex flex-col gap-2 border-b border-[#E4E7E9] pb-5">
              <h1 className="font-semibold">CATEGORY</h1>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="category-all"
                  onChange={() => setProductShowName("All Product")}
                  checked={productShowName === "All Product"}
                  name="category"
                />
                <label htmlFor="category-all">All Product</label>
              </div>
              {allCategory?.map((cat) => (
                <div className="flex gap-2 items-center" key={cat.name}>
                  <input
                    type="radio"
                    id={`category-${cat.name}`}
                    onChange={() => setProductShowName(cat.name)}
                    checked={productShowName === cat.name}
                    name="category"
                  />
                  <label htmlFor={`category-${cat.name}`}>{cat.name}</label>
                </div>
              ))}
            </div>
            {/* Price filter */}
            <div className="w-full flex flex-col gap-2 border-b border-[#E4E7E9] pt-5">
              <h1 className="font-semibold">PRICE RANGE</h1>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="price-all"
                  onChange={() => setProductPrice("all")}
                  checked={productPrice === "all"}
                  name="pricerange"
                />
                <label htmlFor="price-all">All Price</label>
              </div>
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='10000 naira' onChange={() => setProductPrice('under10k')} checked={productPrice === 'under10k'} name='pricerange'/>
                <label htmlFor='10000 naira'>Under ₦10,000</label>
              </div>
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='11000 to 49,000 naira' onChange={() => setProductPrice('11k-49k')} checked={productPrice === '11k-49k'} name='pricerange'/>
                <label htmlFor='11000 to 49,000 naira'>₦11,000 - ₦49,000</label>
              </div>
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='50000 to 100,000 naira' onChange={() => setProductPrice('50k-100k')} checked={productPrice === '50k-100k'} name='pricerange'/>
                <label htmlFor='50000 to 100,000 naira'>₦50,000 - ₦100,000</label>
              </div>
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='101,000 to 500,000 naira' onChange={() => setProductPrice('101k-500k')} checked={productPrice === '101k-500k'}  name='pricerange'/>
                <label htmlFor='101,000 to 500,000 naira'>₦101,000 - ₦500,000</label>
              </div>
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='500,000 to 1,000,000 naira' onChange={() => setProductPrice('501k-1m')} checked={productPrice === '501k-1m'} name='pricerange'/>
                <label htmlFor='500,000 to 1,000,000 naira'>₦501,000 - ₦1,000,000</label>
              </div>
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='1,000,000 to 10,000,000 naira' onChange={() => setProductPrice('1m-10m')} checked={productPrice === '1m-10m'} name='pricerange'/>
                <label htmlFor='1,000,000 to 10,000,000 naira'>₦1,000,000 - ₦10,000,000</label>
              </div>
              <div className='w-full flex gap-2 items-center'>
                <input type="radio" id='10,000,000 naira' onChange={() => setProductPrice('over10m')} checked={productPrice === 'over10m'} name='pricerange'/>
                <label htmlFor='10,000,000 naira'>Over ₦10,000,000</label>
              </div>
            </div>
          </div>
          {/* Filter Section Mobile */}
          {showFilterMobile && (
            <div className="fixed inset-0 bg-[#0000003f] bg-opacity-40 z-40 md:hidden" onClick={closeFilterPanel}>
              <div 
                style={{padding: '20px'}}
                className="absolute top-0 left-0 w-3/4 sm:w-1/2 h-screen bg-white p-5 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Category filter */}
                <div className="w-full flex flex-col gap-2 border-b border-[#E4E7E9] pb-5">
                  <h1 className="font-semibold">CATEGORY</h1>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      id="category-all-mobile"
                      onChange={() => setProductShowName("All Product")}
                      checked={productShowName === "All Product"}
                      name="category"
                    />
                    <label htmlFor="category-all-mobile">All Product</label>
                  </div>
                  {allCategory?.map((cat) => (
                    <div className="flex gap-2 items-center" key={cat.name}>
                      <input
                        type="radio"
                        id={`category-mobile-${cat.name}`}
                        onChange={() => setProductShowName(cat.name)}
                        checked={productShowName === cat.name}
                        name="category"
                      />
                      <label htmlFor={`category-mobile-${cat.name}`}>{cat.name}</label>
                    </div>
                  ))}
                </div>
                {/* Price filter */}
                <div className="w-full flex flex-col gap-2 border-b border-[#E4E7E9] pt-5">
                  <h1 className="font-semibold">PRICE RANGE</h1>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      id="price-all-mobile"
                      onChange={() => setProductPrice("all")}
                      checked={productPrice === "all"}
                      name="pricerange"
                    />
                    <label htmlFor="price-all-mobile">All Price</label>
                  </div>
                  <div className='w-full flex gap-2 items-center'>
                    <input type="radio" id='10000 naira-mobile' onChange={() => setProductPrice('under10k')} checked={productPrice === 'under10k'} name='pricerange'/>
                    <label htmlFor='10000 naira-mobile'>Under ₦10,000</label>
                  </div>
                  <div className='w-full flex gap-2 items-center'>
                    <input type="radio" id='11000 to 49,000 naira-mobile' onChange={() => setProductPrice('11k-49k')} checked={productPrice === '11k-49k'} name='pricerange'/>
                    <label htmlFor='11000 to 49,000 naira-mobile'>₦11,000 - ₦49,000</label>
                  </div>
                  <div className='w-full flex gap-2 items-center'>
                    <input type="radio" id='50000 to 100,000 naira-mobile' onChange={() => setProductPrice('50k-100k')} checked={productPrice === '50k-100k'} name='pricerange'/>
                    <label htmlFor='50000 to 100,000 naira-mobile'>₦50,000 - ₦100,000</label>
                  </div>
                  <div className='w-full flex gap-2 items-center'>
                    <input type="radio" id='101,000 to 500,000 naira-mobile' onChange={() => setProductPrice('101k-500k')} checked={productPrice === '101k-500k'}  name='pricerange'/>
                    <label htmlFor='101,000 to 500,000 naira-mobile'>₦101,000 - ₦500,000</label>
                  </div>
                  <div className='w-full flex gap-2 items-center'>
                    <input type="radio" id='500,000 to 1,000,000 naira-mobile' onChange={() => setProductPrice('501k-1m')} checked={productPrice === '501k-1m'} name='pricerange'/>
                    <label htmlFor='500,000 to 1,000,000 naira-mobile'>₦501,000 - ₦1,000,000</label>
                  </div>
                  <div className='w-full flex gap-2 items-center'>
                    <input type="radio" id='1,000,000 to 10,000,000 naira-mobile' onChange={() => setProductPrice('1m-10m')} checked={productPrice === '1m-10m'} name='pricerange'/>
                    <label htmlFor='1,000,000 to 10,000,000 naira-mobile'>₦1,000,000 - ₦10,000,000</label>
                  </div>
                  <div className='w-full flex gap-2 items-center'>
                    <input type="radio" id='10,000,000 naira-mobile' onChange={() => setProductPrice('over10m')} checked={productPrice === 'over10m'} name='pricerange'/>
                    <label htmlFor='10,000,000 naira-mobile'>Over ₦10,000,000</label>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Product Section */}
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
              <div className='flex flex-col md:flex-row gap-2 items-center'>
                <p className='text-[14px] text-[#5F6C72]'>Active Filters:</p>
                <p className='text-[14px] text-[#191C1F] font-medium'>{productShowName}</p>
              </div>

              {/* for result found number */}
              <p className='text-[#5F6C72]'><strong className='text-[#191C1F] text-[16px]'>{filteredProducts?.length.toLocaleString()}</strong> Results found.</p>
            </div>

            {/* for all product */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {currentProducts?.map((product) => (
                <ProductCard key={product._id} product={product}/>
              ))}
            </div>

            {filteredProducts.length > productsPerPage && (
            <div className="flex justify-center items-center gap-2 pt-6">
              {/* Desktop pagination */}
              <div className="hidden md:flex items-center gap-2">
                {/* Prev button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="w-[40px] h-[40px] cursor-pointer border-2 border-[#FA8232] rounded-full disabled:opacity-50 flex items-center justify-center text-[#FA8232]"
                >
                  <IoIosArrowRoundBack size={24} />
                </button>

                {/* Page Numbers with Ellipsis */}
                {getPaginationNumbers().map((number, idx) =>
                  number === "..." ? (
                    <span
                      key={idx}
                      className="w-[40px] h-[40px] flex items-center justify-center"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`w-[40px] h-[40px] cursor-pointer rounded-full flex items-center justify-center text-[#FA8232] ${
                        currentPage === number
                          ? "bg-[#FA8232] text-white"
                          : "hover:bg-gray-100 border-2 border-[#E4E7E9]"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                {/* Next button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="w-[40px] h-[40px] border-2 cursor-pointer border-[#FA8232] rounded-full flex items-center justify-center text-[#FA8232] disabled:opacity-50"
                >
                  <IoIosArrowRoundForward size={24} />
                </button>
              </div>

              {/* Mobile pagination */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-3 py-1 border-2 border-[#FA8232] rounded-md disabled:opacity-50 text-[#FA8232]"
                >
                  Prev
                </button>

                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="border border-[#E4E7E9] rounded-md px-2 py-1 text-sm"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <option key={page} value={page}>
                      Page {page} of {totalPages}
                    </option>
                  ))}
                </select>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3 py-1 border-2 border-[#FA8232] rounded-md disabled:opacity-50 text-[#FA8232]"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          </div>

          {/* Filter button for mobile */}
          <div onClick={openFilterPanel} className='fixed cursor-pointer bottom-[10px] left-1/2 -translate-x-1/2 md:hidden bg-[#1d1d1d] rounded-[30px] text-white border border-[#E4E7E9]' style={{padding: '10px 20px'}}>
            <p className='flex items-center justify-center gap-4'><span>Filter</span><IoFilter size={18}/></p>
          </div>
        </div>
      )
      : (
        <Loader />
      )
      }
    </div>
  )
}

export default ShopPage