// list of imports
const express = require('express')
const userRouter = require('./routes/user.route')
const adminRouter = require('./routes/admin.route')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const { adminRegister } = require('./controller/admin.controller')
const { adminCustomer, fetchPaginatedCustomers  } = require('./controller/admin.controller')

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/user", userRouter)
app.use("/admin", adminRouter)

// Variables
const PORT = process.env.PORT
const URI = process.env.URI

mongoose.connect(URI)
.then(async () =>{
  console.log("Database Connected");
  const { adminModel } = require('./model/admin.model');
  const existingAdmin = await adminModel.findOne({ username: process.env.admin_username });
  if(!existingAdmin){
    await adminRegister()
  }
  await fetchPaginatedCustomers()
})
.catch((err) =>{
  console.log("An Error encountered while connecting to the database", err);
}) 

app.listen(PORT, (err) => {
  if(err){
    console.log("There is an error", err);
  }
  console.log("Server is running on port ", PORT);
})