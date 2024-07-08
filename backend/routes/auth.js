const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'godisgreat';





// ROUTE 1: Create a user using POST: "/api/auth/createuser" -- it doesn't require user to be authorized
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must have atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors, return bad request and the errors
    let signup_success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }
    // const user = User(req.body);
    // user.save();
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            signup_success=false;
            return res.status(400).json({ error: "Sorry! Email already exists."})
        }


        //using salt to hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        //create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        //using jwt to create a token corresponding to data
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        signup_success=true;
        res.json({ signup_success,authtoken });


        //res.json({ "done": "ok" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error!")
    }
})







//ROUTE 2: Authenticate a user using POST: "/api/auth/login" -- it doesn't require user to be authorized

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can`t be blank').exists()
], async (req, res) => {
    let login_success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({result: result.array() });
    }

    //extract email, password from req.body
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
           login_success= false;
            return res.status(400).json({ error: "Please try to login with correct credentials." })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            login_success= false;
            return res.status(400).json({ login_success,
                error: "Please try to login with correct credentials."
            })
        }

        //using jwt to create a token corresponding to data
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        login_success= true;
        res.json({ login_success,authtoken });


        //res.json({ "done": "ok" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error!")
    }
})




//ROUTE 3: Get logged in user details using POST: "/api/auth/getuser" -- it  requires user to be authorized

router.post('/getuser',fetchuser, async (req, res) => {
    
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error!")
    }
})



module.exports = router;
