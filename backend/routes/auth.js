const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'godisgreat';





//Create a user using POST: "/api/auth/createuser" -- it doesn't require user to be authorized
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must have atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }
    // const user = User(req.body);
    // user.save();
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry! Email already exists." })
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
        res.json({ authtoken });


        //res.json({ "done": "ok" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error!")
    }
})







//Authenticate a user using POST: "/api/auth/login" -- it doesn't require user to be authorized

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can`t be blank').exists()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    //extract email, password from req.body
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials." })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({
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
        res.json({ authtoken });


        //res.json({ "done": "ok" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error!")
    }
})








module.exports = router;
