import React, { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '../../../CategoryContext';
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ProductPage = () => {
  const { allProduct, allCategory } = useContext(CategoryContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (allProduct) {
      console.log("All Products in ProductPage", allProduct);
    }
  }, [allProduct]);

  const addProduct = () => {
    navigate("/admin/product/add-product");
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    const categoryArray = Array.isArray(product.category) ? product.category : [product.category];
    setSelected(categoryArray.map(cat => cat._id));
    formik.setValues({
      name: product.name || '',
      description: product.description || '',
      image: product.image || '',
      inventory: product.inventory || '',
      price: product.price || '',
      discountprice: product.discountprice || '',
      category: categoryArray.map(cat => cat._id),
      weight: product.weight || '',
      country: product.country || '',
      size: product.size || ''
    });
    setIsOpen(true);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      inventory: '',
      price: '',
      discountprice: '',
      category: [],
      weight: '',
      country: '',
      size: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Product name is required'),
      description: yup.string().required('Product Description is required'),
      price: yup.number().required('Product price is required'),
      category: yup.array().min(1, 'Product category is required'),
      image: yup.array().min(1,)
    }),
    onSubmit: async (values) => {
      values.category = selected;
      try {
        const res = await axios.put(`http://localhost:5000/admin/editproduct/${selectedProduct._id}`, values);
        if (res.data.status) {
          toast.success('Product updated successfully');
          setIsOpen(false);
          window.location.reload()
        }
      } catch (err) {
        console.error(err);
        alert('Failed to update product');
      }
    }
  });
  const deleteProduct = (id) =>{
    if(window.confirm("Are you sure you want to delete this category?")){
      axios.delete(`http://localhost:5000/admin/deleteproduct/${id}`)
      .then((res) =>{
        console.log(res);
        if(res.data.status){
          toast.success("Product Deleted Successfully")
          window.location.reload()
        }
      })
      .catch((err) =>{
        console.log(err);
      })
    }
    
  }

  return (
    <div className='w-full h-full flex flex-col gap-[1em]'>
      <div className='w-full flex flex-col gap-0'>
        <div className='w-full flex items-center justify-between'>
          <div>
            <h1 className='text-black font-bold text-[24px]'>Products</h1>
          </div>
          <div className='flex gap-4'>
            <div style={{ padding: '10px 20px' }} className='cursor-pointer flex items-center rounded-[4px] text-[#1E5EFF] gap-2 bg-white'>
              <span>Export</span>
            </div>
            <div onClick={addProduct} style={{ padding: '10px 20px' }} className='cursor-pointer flex items-center rounded-[4px] bg-[#1E5EFF] gap-2 text-white'>
              <span>Add Product</span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col gap-4'>
        <div style={{ padding: '20px' }} className='w-full bg-white rounded-[6px] flex flex-col gap-4'>
          <div className='w-full grid grid-cols-[4fr_1.5fr] items-center'>
            <div className='w-full flex gap-4'>
              <div className='w-2/4 flex flex-col items-start justify-center border-1 border-[#D9E1EC] rounded-[4px]'>
                <select className='w-full' name="filter" id="filter">
                  <option value="">nothing yet</option>
                </select>
              </div>
              <div style={{ padding: '0 20px' }} className='flex w-full items-center gap-3 border-1 border-[#D9E1EC] rounded-[4px]'>
                <FiSearch className='text-[#979797]' size={24} />
                <input
                  style={{ padding: '10px 0' }}
                  type="text"
                  className='border-0 focus:outline-0'
                  placeholder='Search'
                />
              </div>
            </div>
            <div className='justify-self-end'>
              <div className='w-[40px] h-[40px] cursor-pointer hover:text-[#304169] flex flex-col justify-center items-center text-[#1E5EFF] rounded-[4px] shadow-sm'>
                <FaRegTrashCan size={24} />
              </div>
            </div>
          </div>

          <div className='w-[100%]'>
            <table className="w-full">
              <thead className='w-full'>
                <tr className='font-bold border-b-1 border-[#D7DBEC] w-full grid grid-cols-[0.4fr_3fr_1fr_1fr_1fr_1fr_1fr]'>
                  <td style={{ padding: '15px 0' }} className='text-left'>S/N</td>
                  <td>Product</td>
                  <td>Inventory</td>
                  <td>Color</td>
                  <td>Price</td>
                  <td>Rating</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className='productTbody w-full'>
                {allProduct ? (
                  allProduct.map((product, index) => (
                    <tr className='border-b-1 border-[#D7DBEC] w-full grid grid-cols-[0.4fr_3fr_1fr_1fr_1fr_1fr_1fr]' key={product._id}>
                      <td>{index + 1}</td>
                      <td className='flex items-center w-full gap-2'>
                        <div className='w-[48px] h-[48px] rounded-[4px] bg-[#979797]'><img src={product.image[0]} className='w-[100%] h-[100%] rounded-[4px] object-fit-cover' alt="" /></div>
                        <div>
                          <h1 className='text-[14px] font-bold text-[#131523]'>{product.name}</h1>
                          <p className='text-[#5A607F] text-[14px]'>{Array.isArray(product.category) ? product.category[0]?.name : product.category?.name}</p>
                        </div>
                      </td>
                      <td>{product.inventory} in stock</td>
                      <td>{product.color || '-'}</td>
                      <td>{product.price}</td>
                      <td>-</td>
                      <td className='dAndE text-[#1E5EFF] flex gap-2'>
                        <MdOpenInNew size={24} onClick={() => handleEdit(product)} className='cursor-pointer'/>
                        <FaRegTrashCan onClick={() => deleteProduct(product._id)} size={24} />
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
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="w-2/4 space-y-4 bg-white shadow-lg flex flex-col gap-[1em]" style={{ padding: '40px', borderRadius: '4px' }}>
            <DialogTitle className="font-bold text-[#131523] text-[16px]">Edit Product</DialogTitle>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
              <input
                name='name'
                type='text'
                placeholder='Product Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border rounded p-2'
              />
              {formik.touched.name && formik.errors.name && <small className="text-red-500">{formik.errors.name}</small>}
              <textarea
                name='description'
                placeholder='Description'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border rounded p-2'
              />
              {formik.touched.description && formik.errors.description && <small className="text-red-500">{formik.errors.description}</small>}
              <input
                name='price'
                type='number'
                placeholder='Price'
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border rounded p-2'
              />
              {formik.touched.price && formik.errors.price && <small className="text-red-500">{formik.errors.price}</small>}
              <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Categories</p>
                {allCategory.map((option) => (
                  <label key={option._id} className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      value={option._id}
                      onChange={handleCheckboxChange}
                      checked={selected.includes(option._id)}
                    />
                    {option.name}
                  </label>
                ))}
                {formik.touched.category && formik.errors.category && <small className="text-red-500">{formik.errors.category}</small>}
              </div>
              <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded mt-2'>Save</button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default ProductPage;
