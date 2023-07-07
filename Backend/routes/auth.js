const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser.js");
const JWT_SECRET = 'Sagar noob'

//Route 1: Create a user using POST "/api/auth/createuser", doesn't require authentication
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),

    body('email', "Enter a valid Email").isEmail(),

    body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),

], async (req, res) => {

    // If there are error, return Bad request and then errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({success, error: "Sorry user with this email already exists" })
        }
        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        let success = true;
        res.json( {success, authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send(success, "Internal server error")
    }

});


//Route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password cannot be blanked').exists(),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let success = false;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        let success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }



})

// Route 3: Get logged in User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router;