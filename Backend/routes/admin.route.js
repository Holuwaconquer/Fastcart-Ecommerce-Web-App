const express = require('express')
const { adminLogin, adminDashboard, adminCustomer, deleteCustomer, productCategory, getCategory, createProduct, getAllProducts, getCategoriesWithProducts, deleteCategory, editCategory, editProduct, deleteProduct } = require('../controller/admin.controller')
const { authenticate } = require('../auth')
const { authorizeRoles } = require('../authorizesRole')
const router = express.Router()

router.post("/login", adminLogin)
router.get("/dashboard", authenticate, authorizeRoles, adminDashboard)
router.get("/allCustomers", adminCustomer)
router.post("/deleteCustomers", deleteCustomer)
router.post("/addCategory", productCategory, authenticate, authorizeRoles,)
router.get("/fetched-category", getCategory)
router.post("/createProduct", createProduct)
router.get("/getAllProducts", getAllProducts)
router.get("/getCategoriesWithProducts", getCategoriesWithProducts)
router.delete("/category/:id", deleteCategory)
router.put("/editcategory/:id", editCategory)
router.put("/editproduct/:id", editProduct)
router.delete("/deleteproduct/:id", deleteProduct)


module.exports = router


