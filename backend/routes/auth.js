const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router();


//create a user using POST: "/api/auth/" -- it doesn't require user to be authorized
router.post('/',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password must have atleast 5 characters').isLength({min:5})
],(req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // handle validation errors
      return res.status(400).json({result : result.array()});
    }
    // const user = User(req.body);
    // user.save();
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    }).then(user=>res.json(user))
    .catch(err=> {console.log(err)
        res.json({error:err.message})})
    })
    

module.exports = router;
