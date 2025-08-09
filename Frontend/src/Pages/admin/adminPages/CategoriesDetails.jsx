import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { CategoryContext } from '../../../CategoryContext'
import { MdKeyboardBackspace } from "react-icons/md";
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { FaRegTrashCan } from "react-icons/fa6"
import { MdOpenInNew } from "react-icons/md";

const CategoriesDetails = () => {
  const { name } = useParams();
  const { allCategory } = useContext(CategoryContext);
  const location = useLocation();
  const navigate = useNavigate();

  const stateCategory = location.state?.eachCategory;

  const singleCategory = stateCategory || allCategory?.find(cat =>
    decodeURIComponent(cat.name.toLowerCase()) === decodeURIComponent(name.toLowerCase())
  );
  const [singleCategoryProducts, setSingleCategoryProducts] = useState([])

  useEffect(() => {
    if(singleCategory){
      setSingleCategoryProducts(singleCategory.products)
      console.log(singleCategoryProducts);
    }
  }, [allCategory, singleCategory]);

  const goBack = () => {
    window.history.back();
  };

  if (!singleCategory) {
    return <p>Loading category details...</p>;
  }

  return (
    <div className='w-full h-full flex flex-col gap-[1em]'>
      <div className='w-full flex flex-col gap-0'>
        <div onClick={goBack} className='text-[#5A607F] cursor-pointer flex gap-2 items-center'>
          <MdKeyboardBackspace size={10} />
          <p>Back</p>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div>
            <h1 className='text-black font-bold text-[24px]'>{singleCategory.name}</h1>
          </div>
          <div className='flex gap-4'>
            <div style={{ padding: '10px 20px' }} className='cursor-pointer flex items-center rounded-[4px] text-[#1E5EFF] gap-2 bg-white'>
              <span>Export</span>
            </div>
            <div style={{ padding: '10px 20px' }} className='cursor-pointer flex items-center rounded-[4px] bg-[#1E5EFF] gap-2 text-white'>
              <span>Add Product</span>
            </div>
          </div>
        </div>
      </div>

      {/* for category product */}
      <div className='w-full flex flex-col gap-4'>
        <div style={{padding: '20px'}} className='w-full bg-white rounded-[6px] flex flex-col gap-4'>
          {/* for top action btn */}
          <div>
            {/* search, filter and action btn */}
            <div className='w-full grid grid-cols-[4fr_1.5fr] items-center'>
              {/* for filter and search bar */}
              <div className='w-full flex gap-4'>
                {/* for filter */}
                <div className='w-2/4 flex flex-col items-start justify-center border-1 border-[#D9E1EC] rounded-[4px]'>
                  <select className='w-full' name="filter" id="filter">
                    <option value="">nothing yet</option>
                  </select>
                </div>
                {/* for search bar */}
                <div style={{padding: '0 20px'}} className='flex w-full items-center gap-3 border-1 border-[#D9E1EC] rounded-[4px]'>
                  <FiSearch className='text-[#979797]' size={24} />
                  <input
                    style={{padding: '10px 0'}}
                    type="text"
                    className='border-0 focus:outline-0'
                    placeholder='Search'
                  />
                </div>
              </div>
              {/* for delete */}
              <div className='justify-self-end'>
                <div className='w-[40px] h-[40px] cursor-pointer hover:text-[#304169] flex flex-col justify-center items-center text-[#1E5EFF] rounded-[4px] shadow-sm'>
                  <FaRegTrashCan size={24}/>
                </div>
              </div>
            </div>
          </div>

          {/* for product details */}
          <div className='w-[100%]'>
            <table className="w-full">
              <thead className='w-full'>
                <tr className='font-bold border-b-1 border-[#D7DBEC]'>
                  <td style={{padding: '15px 0'}} className='text-left'>S/N</td>
                  <td>Product</td>
                  <td>Inventory</td>
                  <td>Color</td>
                  <td>Price</td>
                  <td>Rating</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className='productTbody w-full'>
                {singleCategoryProducts ? (
                  singleCategoryProducts
                    .map((eachProduct, index) => (
                      <tr className='border-b-1 border-[#D7DBEC]' key={eachProduct._id}>
                        <td>S/N</td>
                        <td>{`${eachProduct.name}`}</td>
                        <td></td>
                        <td></td>
                        <td>{eachProduct.price}</td>
                        <td>ello</td>
                        <td className='dAndE opacity-0 flex gap-2'>
                          <MdOpenInNew size={24} />
                          <FaRegTrashCan size={24} />
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {/* <div className='w-full flex gap-2 justify-end mt-6'>
              <button
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-[#1E5EFF] text-white' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => page < pagination.totalPages && setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div> */}

          </div>
        </div>
      </div>
            
    </div>
  );
};

export default CategoriesDetails;
