const express = require('express')
const router = express.Router()
const { check, validationResult } = require("express-validator");
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

// Register a user
// Public
// POST /api/users

router.post('/', [
    check('name', 'Name should have atleast 5 and atmost 50 characters').notEmpty().isLength({ min: 3, max: 50 }),
    check('email', "Email must be in valid format").isEmail(),
    check('password', "Password should have atleast 5 and atmost 50 characters").notEmpty().isLength({ min: 5, max: 50 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (user) res.status(400).json({ msg: 'User already registered' })


            user = new User({ name, email, password })

            // Password hashing
            user.password = await bcrypt.hash(password, 10)

            user.save()
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                })
        } catch (error) {
            res.status(500).json({ msg: "Server error" })
            console.error(error.message);
        }

    })

module.exports = router

