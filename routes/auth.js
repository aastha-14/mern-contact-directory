const express = require('express')
const router = express.Router()
const { check, validationResult } = require("express-validator");
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

// Get logged in user
// Private
// GET /api/auth

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) res.status(404).json({ msg: "User does not exists" })
        res.json({ user })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
        console.error(error.message);
    }


})

// Auth user and get token
// Public
// POST /api/auth

router.post('/',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', "Please enter a password.").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body
            let user = await User.findOne({ email })
            if (!user) res.status(400).json({ msg: "user is not resgistered" })

            const matchPassword = await bcrypt.compare(password, user.password)
            if (!matchPassword) res.status(400).json({ msg: "Invalid credentials" })

            jwt.sign({ user: { id: user.id } }, config.get('jwtSecret'), (err, token) => {
                if (err) throw err
                res.json({ token })
            })
        } catch (error) {
            res.status(500).json({ msg: "Server error" })
            console.error(error.message);
        }
    })
module.exports = router
