const express = require('express');
const serverless = require('serverless-http');
const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route');
const orderRouter = require('./routes/trackOrder.route');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { adminRegister, fetchPaginatedCustomers } = require('./controller/admin.controller');
const PORT = process.env.PORT
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/orders", orderRouter);

// Connect DB once
mongoose.connect(process.env.URI)
  .then(async () => {
    console.log("Database Connected");
    const { adminModel } = require('./model/admin.model');
    const existingAdmin = await adminModel.findOne({ username: process.env.admin_username });
    if (!existingAdmin) {
      await adminRegister();
    }
    await fetchPaginatedCustomers();
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });

app.listen(PORT, ()=>{
  console.log('app running on Port', PORT);
})
// // 👉 Export handler for Vercel
// module.exports = app;
// module.exports.handler = serverless(app);


PORT = 5000
admin_username = admin
admin_password = admin
URI = mongodb+srv://holuwaconquer488:mongodb@cluster0.ikmidho.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET= secret