const {adminModel, categoryModel, productModel} = require("../model/admin.model");
const userModel = require("../model/user.model")
require('dotenv').config();
const jwt = require('jsonwebtoken');
const AdminOrder = require('../model/adminOrder.model')
const admin_username = process.env.admin_username;
const admin_password = process.env.admin_password;

const adminRegister = async (req, res) => {
  console.log('Welcome to admin sign in page');
  let admin = await adminModel.findOne({username: 'admin'});
  if(admin){
    console.log('Admin already exist');
  }else{
    const form = new adminModel();
    form.save()
    .then((response)=>{
      console.log('admin saved');
    }).catch((err) => {
        console.log('admin not saved', err);
    })
  }
}

const adminLogin = (req, res) => {
  console.log('welcome to admin login');
  adminModel.findOne({username: req.body.username})
  .then((admin) => {
    if(admin){
      admin.validatePassword(req.body.password, (err, isMatch) => {
        if(err){
          console.log("an error while validating the password", err);
          return res.status(500).json({error: "Error validating password"});
        }
        if(isMatch){
          console.log("Password matches");
          let token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
          console.log(token);
          res.status(200).json({
            status: true,
            message: 'Admin Login Successfully',
            data: { username: admin.username, role: admin.role },
            token
          });
        }else{
          console.log("Password does not match");
          res.status(401).json({error: "Invalid username or password"});
        }
      });
    }else{
      console.log("Admin does not exist");
      res.status(404).json({error: "Admin not found"});
    }
  })
}

const adminDashboard = (req, res) =>{
  const { username, role } = req.user;
  res.status(200).json({
    status: true,
    message: `Welcome to the admin dashboard`,
    data: { username, role }
  });

}

const fetchPaginatedCustomers = async (page = 1, limit = 10) => {
  const allCustomers = await userModel.find({}, '-password')
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await userModel.countDocuments()

  return {
    allCustomers,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit)
  }
}

// Express route handler
const adminCustomer = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  try {
    const result = await fetchPaginatedCustomers(page, limit)
    res.status(200).json({
      status: true,
      message: 'All users fetched',
      data: result.allCustomers,
      pagination: {
        totalPages: result.totalPages,
        currentPage: result.currentPage
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: false,
      message: 'Failed to fetch users',
      data: err
    })
  }
}

const deleteCustomer = (req, res) =>{
  const deletedUser = userModel.findByIdAndDelete(req.body._id)
  .then((response) =>{
    console.log('user information deleted', response);
    res.status(201).json({
      status: true,
      message: "User Information Deleted Successfully",
    })
  })
  .catch((err) =>{
    console.log('cannot delete user');
    res.status(500).json({
      status: false,
      message: 'User cannot be deleted'
    })
  })
}

const productCategory = (req, res) => {
  const { name, description, image } = req.body;
  const newCategory = new categoryModel({ name, description, image });
  
  newCategory.save()
    .then((category) => {
      res.status(201).json({
        status: true,
        message: 'Category created successfully',
        data: category
      });
      console.log('Category created:', category);
    })
    .catch((err) => {
      console.error('Error creating category:', err);
      res.status(500).json({
        status: false,
        message: 'Failed to create category',
        error: err.message
      });
    });
}

const getCategory = (req, res) =>{
  const fetchingCategory = categoryModel.find()
  .then((fetchedCategory) =>{
    console.log(fetchedCategory);
    res.status(200).json({
      status: true,
      message: 'These are all the categories',
      data: fetchedCategory
    })
  })
  .catch((err) =>{
    console.log(err);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch category',
      error: err
    });
  })
}

const createProduct = async (req, res) =>{
  try {
    const  { name, description, price, discountprice, image, inventory, size, weight, country, color, category, keyFeatures, productBox, discountPercentage } = req.body;

    const newProduct = new productModel({
      name,
      description,
      price,
      discountprice,
      image,
      inventory,
      color,
      size,
      weight,
      country,
      category,
      productBox,
      keyFeatures,
      discountPercentage
    });
    const savedProduct = await newProduct.save()
    console.log('product created successfully');
    
    res.status(201).json({
      status: true,
      message: 'Product Created Successfully',
      data: savedProduct
    })
  }
  catch(err){
    console.error("Product creation failed:", err);
    res.status(500).json({
      status: false,
      message: "Failed to create product",
      error: err.message
    });
  }
}

const deleteProduct = async (req, res) =>{
  const { id } = req.params;

  try{
    const deletedProduct = await productModel.findByIdAndDelete(id)

    if(!deletedProduct){
      return res.status(404).json({
        status: false,
        message: 'Product not found'
      })

    }
    res.status(201).json({
      status: true,
      message: "Product delete successfully",
      data: deletedProduct
    })
  }
  catch(err) {
    console.error('Error deleting product:', err);
    res.status(500).json({
      status: false,
      message: 'Failed to delete product',
      error: err.message
    });
  }
}
const deleteSelectedProduct = async (req, res) =>{
  const selectedProductId = req.body
  try{
    const result = await productModel.deleteMany({ _id: { $in: selectedProductId } });
    return res.status(200).json({
      status: true,
      message: 'Product Deleted Successfully',
      deletedCount: result.deletedCount
    });
  } 
  catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ status: false, message: "Failed to delete products" });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate('category');
    res.status(200).json({
      status: true,
      message: "All products fetched",
      data: products
    });
    // console.log(products);
    
  } catch (err) {
    console.error("Failed to fetch products:", err);
    res.status(500).json({
      status: false,
      message: "Could not fetch products",
      error: err.message
    });
  }
};

const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await categoryModel.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      }
    ]);

    res.status(200).json({
      status: true,
      message: 'Categories with their products',
      data: categories
    });

  } catch (err) {
    console.error("Error fetching categories with products:", err);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch categories with products',
      error: err.message
    });
  }
};

const deleteCategory = async (req, res) =>{
  const { id } = req.params;

  try{
    const deletedCategory = await categoryModel.findByIdAndDelete(id)

    if(!deleteCategory){
      return res.status(404).json({
        status: false,
        message: 'Category not found',
      });
    }

    await productModel.updateMany(
      { category: id},
      { $unset: {category: ''}}
    );

    res.status(201).json({
      status: true,
      message: "Category Deleted Successfully",
      data: deleteCategory
    })
  }
  catch(err) {
    console.error('Error deleting category:', err);
    res.status(500).json({
      status: false,
      message: 'Failed to delete category',
      error: err.message
    });
  }
}
const editCategory = async (req, res) =>{
  const { id } = req.params;
  const { name, description, image } = req.body;
  try{
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {name, description, image },
      {new: true, runValidators: true}
    )

    if(!updatedCategory){
      return res.status(404).json({
        status: false,
        message: "Category not found",
      })
    }

    res.status(200).json({
      status: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  }
  catch(err) {
    console.error("Error Updating Category:", err);
    res.status(500).json({
      status: false,
      message: "Failed to update category",
      data: err
    })
  }
}
const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    image,
    inventory,
    price,
    discountprice,
    weight,
    country,
    size,
    category,
  } = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        inventory,
        price,
        discountprice,
        weight,
        country,
        size,
        category,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      status: false,
      message: "Failed to update product",
      data: err,
    });
  }
};
const addSubcategory = async (req, res) => {
  console.log('Received body:', req.body);
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const duplicate = category.subcategories.some(
      (sub) => sub.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      return res.status(400).json({ message: 'Subcategory already exists' });
    }

    category.subcategories.push({ name });
    await category.save();

    return res.json(category);
  } catch (error) {
    console.error("Error in addSubcategory:", error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getAllOrdersForAdmin = async (req, res) =>{
  try{
    const orders = await AdminOrder.find()
    .sort({ createdAt: -1 })
    .populate('userId', 'firstname lastname email');

    res.status(200).json({
      message: "All orders fetched successfully",
      data: orders
    })
    console.log(orders)
  }catch (err) {
    console.error("Error fetching admin orders:", err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
}

module.exports = {
  adminRegister, 
  adminLogin, 
  adminDashboard, 
  adminCustomer, 
  deleteCustomer, 
  productCategory, 
  getCategory, 
  createProduct,
  getAllProducts,
  getCategoriesWithProducts,
  deleteCategory,
  editCategory,
  deleteProduct,
  editProduct,
  fetchPaginatedCustomers,
  addSubcategory,
  deleteSelectedProduct,
  getAllOrdersForAdmin
};