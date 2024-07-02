const express = require('express')
const User = require('../models/User')

const router = express.Router();


//create a user using POST: "/api/auth/" -- it doesn't require user to be authorized
router.post('/',(req,res)=>{
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = router;
