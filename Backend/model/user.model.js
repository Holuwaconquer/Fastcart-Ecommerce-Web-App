const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  secondemail: {type: String, unique: true},
  password: {type: String, required:true},
  phonenumber: {type: String},
  phonenumber2: {type: String},
  profilePic: {type:String},
  registrationDate: {type: Date, default: Date.now},
  country: {type:String},
  state: {type:String},
  address: {type:String},
  role: {type: String, enum: ['user', 'admin'], default: 'user'},
  billingfirstname: {type: String},
  billinglastname: {type: String},
  billingemail: {type: String},
  billingphonenumber: {type: String},
  billingcountry: {type: String},
  billingstate: {type: String},
  billingcity: {type: String},
  billingzipcode: {type: String},
  billingcompanyname: {type: String},
  billingaddress: {type: String},
  shippingfirstname: {type: String},
  shippinglastname: {type: String},
  shippingemail: {type: String},
  shippingphonenumber: {type: String},
  shippingcountry: {type: String},
  shippingstate: {type: String},
  shippingcity: {type: String},
  shippingzipcode: {type: String},
  shippingcompanyname: {type: String},
  shippingaddress: {type: String},
})
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