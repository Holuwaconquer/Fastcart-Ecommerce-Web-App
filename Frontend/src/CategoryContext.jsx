import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const CategoryContext = createContext()

const CategoryProvider = ({ children }) => {

  const [allCategory, setAllCategory] = useState([])
  const [allProduct, setallProduct] = useState([])
  const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
      let newURL = 'http://localhost:5000/admin/getCategoriesWithProducts'
      axios.get(newURL)
      .then((res) =>{
        if(res.data.status){
          setAllCategory(res.data.data)
        }
      })
      .catch((err) =>{
        console.log(err);
      })

      let allProductURL = "http://localhost:5000/admin/getAllProducts"
      axios.get(allProductURL)
      .then((res) =>{
        if(res.data.status){
          setallProduct(res.data.data)
        }
      })
      .catch((err) =>{
        console.log("Error Encountered while fetching all product", err);
      })

      let ordersURL = 'http://localhost:5000/admin/orders'
      axios.get(ordersURL)
      .then((res) =>{
        if(res.data.status){
          console.log("Fetched Orders:", res.data.data); // 👈 debug here
          setAllOrders(res.data.data);
        }
      })
      .catch((err) =>{
        console.log("There is an error fetching orders", err);
      })
    }, [])


   

  return (
    <CategoryContext.Provider value={{ setAllCategory, allCategory, setallProduct, allProduct, allOrders, setAllOrders }}>
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryProvider