const express = require('express')
const router = express.Router()

// Get logged in user
// Private
// GET /api/auth

router.get('/', (req, res) => {
    res.json({ msg: "Get logged in user" })
})

// Auth user and get token
// Public
// POST /api/auth

router.post('/', (req, res) => {
    res.json({ msg: "Auth user and get token" })
})
module.exports = router
