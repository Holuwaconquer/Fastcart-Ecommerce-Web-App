const express = require('express')
const { greetingUser, userLogin, userDashboard, editUser, billingDetails, shippingDetails } = require('../controller/user.controller')
const { authenticate } = require('../auth')
const router = express.Router()

router.post("/register", greetingUser)
router.post('/login', userLogin)
router.get('/dashboard', authenticate, userDashboard)
router.put('/update/:id', editUser)
router.put('/updateBilling/:id', billingDetails)
router.put('/updateShipping/:id', shippingDetails)

module.exports = router