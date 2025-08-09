const userModel = require("../model/user.model");
const jwt = require('jsonwebtoken')

const greetingUser = (req, res) =>{
  const {confirmPassword, ...userData} = req.body
  const form = new userModel(userData)
  form.save()
  .then(() => {
    console.log('User Information saved in our database');
    res.status(201).json({
      status: true,
      message: 'User Register Successfully',
      data: userData
    })
  })
  .catch((err) =>{
    console.log('There is an error while saving to the database', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "Duplicate field: email already exists" });
    }
    res.status(500).json({ error: err.message });
  })
}

const userLogin = (req, res) => {
  console.log('Welcome to sign in page');
  const { password } = req.body;

  userModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log("User does not exist");
        return res.status(404).json({ error: "This email is not registered" });
      }

      user.validatePassword(password, (err, isMatch) => {
        if (err) {
          console.log("Error validating password:", err);
          return res.status(500).json({ error: "Error validating password" });
        }

        if (!isMatch) {
          console.log("Password does not match");
          return res.status(401).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        const { password, ...userWithoutPassword } = user._doc;

        res.status(200).json({
          status: true,
          message: 'User Login Successfully',
          data: userWithoutPassword,
          token
        });
      });
    })
    .catch((err) => {
      console.log("Error finding the user:", err);
      res.status(500).json({ error: "Server error" });
    });
};


const userDashboard = (req, res) =>{
  let token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, process.env.JWT_SECRET, (err, result) =>{
    if(err){
      res.send({
        status: false,
        message: 'token invalid',
        data: err
      })
    }else{
      userModel.findOne({email: result.email})
      .then((user) => {
        if(user){
          const { password, ...newUser } = user.toObject()
          console.log(newUser);
          res.send({
            status: true,
            message: 'token is valid',
            data: newUser
          })
        }
      })
      .catch((err) =>{
        console.log('error occured', err);
      })
    }
  })
}
const editUser = async (req, res) => {
  const { id } = req.params;
  const {firstname, lastname, email, phonenumber, phonenumber2, secondemail, country, state, zipcode } = req.body
  try{
    const updatedUser = await userModel.findByIdAndUpdate(id, 
      { firstname, lastname, email, phonenumber, phonenumber2, secondemail, country, state, zipcode },
      {new: true, runValidators: true}
    )
    if(!updatedUser){
       return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ 
      message: "User updated successfully", 
      user: updatedUser 
    });
  }
  catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
const billingDetails = async (req, res) =>{
  const { id } = req.params;
  const { billingfirstname, billinglastname, billingcompanyname, billingaddress, billingcountry, billingstate, billingcity, billingzipcode, billingemail, billingphonenumber } = req.body
  try{
    const billingData = await userModel.findByIdAndUpdate(id,
      {billingfirstname, billinglastname, billingcompanyname, billingaddress, billingcountry, billingstate, billingcity, billingzipcode, billingemail, billingphonenumber},
      {new: true, runValidators: true}
    )
    if(!billingData){
      return res.status(404).json({ error: 'User not found'})
      console.log(res);
      
    }
    console.log(billingData);
    
    res.status(200).json({
      message: "Billing Details added successfully",
      data: billingData
    });
  }
  catch(err){
    console.error("Error updating billing data:", err);
    res.status(500).json({ error: "Internal server error" });v
  }
}
const shippingDetails = async (req, res) =>{
  const { id } = req.params;
  const { shippingfirstname, shippinglastname, shippingcompanyname, shippingaddress, shippingcountry, shippingstate, shippingcity, shippingzipcode, shippingemail, shippingphonenumber } = req.body
  try{
    const shippingData = await userModel.findByIdAndUpdate(id,
      {shippingfirstname, shippinglastname, shippingcompanyname, shippingaddress, shippingcountry, shippingstate, shippingcity, shippingzipcode, shippingemail, shippingphonenumber},
      {new: true, runValidators: true}
    )
    if(!shippingData){
      return res.status(404).json({ error: 'User not found'})
      console.log(res);
      
    }
    console.log(shippingData);
    
    res.status(200).json({
      message: "shipping Details added successfully",
      data: shippingData
    });
  }
  catch(err){
    console.error("Error updating shipping data:", err);
    res.status(500).json({ error: "Internal server error" });v
  }
}
module.exports = {
  greetingUser,
  userLogin,
  userDashboard,
  editUser,
  billingDetails,
  shippingDetails
}