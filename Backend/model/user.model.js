const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const orderProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  name: String,
  price: Number,
  quantity: Number,
  image: String,
});

const orderSchema = new mongoose.Schema({
  flutterwaveResponse: mongoose.Schema.Types.Mixed,
  products: [orderProductSchema],
  billingDetails: {
    firstname: String,
    lastname: String,
    address: String,
    country: String,
    state: String,
    city: String,
    zipcode: String,
    email: String,
    phone: String,
  },
  subtotal: Number,

  orderStatus: {
    type: String,
    enum: ["received", "processing", "shipped", "delivered", "cancelled"],
    default: "received"
  },
  
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  secondemail: { type: String, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: String },
  phonenumber2: { type: String },
  profilePic: { type: String },
  registrationDate: { type: Date, default: Date.now },
  country: { type: String },
  state: { type: String },
  address: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },

  billingfirstname: String,
  billinglastname: String,
  billingemail: String,
  billingphonenumber: String,
  billingcountry: String,
  billingstate: String,
  billingcity: String,
  billingzipcode: String,
  billingcompanyname: String,
  billingaddress: String,

  shippingfirstname: String,
  shippinglastname: String,
  shippingemail: String,
  shippingphonenumber: String,
  shippingcountry: String,
  shippingstate: String,
  shippingcity: String,
  shippingzipcode: String,
  shippingcompanyname: String,
  shippingaddress: String,

  productOrder: [orderSchema],
});


let saltRounds = 10
userSchema.pre('save', function(next){
  if (!this.isModified('password')) return next()
  bcrypt.hash(this.password, saltRounds, (err, hashedPassword)=>{
    if(err){
      console.log("password could not be hashed");
      return next(err)
    }else{
      console.log(hashedPassword);
      this.password = hashedPassword
      next();
    }
  })
})

userSchema.methods.validatePassword = function(password, callback) {
  console.log(password);
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      console.log("There is an error while validating the password", err);
      return callback(err);
    }
    if (isMatch) {
      console.log("Password matches");
      return callback(null, true);
    } else {
      console.log("Password does not match");
      return callback(null, false);
    }
  });
}


const userModel = mongoose.model("User_Registration", userSchema)

module.exports = userModel