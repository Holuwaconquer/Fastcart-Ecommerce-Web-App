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

const ALLOWED_IPS = ['203.0.113.45', '198.51.100.7'];

const checkAdminIP = (req, res, next) => {
  const forwarded = req.headers['x-forwarded-for'];
  const userIP = forwarded ? forwarded.split(',')[0] : req.ip;
  console.log(`User IP: ${userIP}, Allowed IPs: ${ALLOWED_IPS}`);
  if (!ALLOWED_IPS.includes(userIP)) {
    return res.status(403).json({ message: 'Access Forbidden: Invalid IP Address' });
  }

  next();
};

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/admin/login", checkAdminIP);
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

// app.listen(PORT, ()=>{
//   console.log('app running on Port', PORT);
// })
// 👉 Export handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
