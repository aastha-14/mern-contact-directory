const express = require('express')
const router = express.Router()

// Get all user contacts 
// GET /api/contacts
// Private  
router.get('/', (req, res) => {
    res.json({ msg: "Get all user contacts" })
})

// Add contacts
// POST /api/contacts
// Private  
router.post('/', (req, res) => {
    res.json({ msg: "Add contacts" })
})

// Update a contact
// PUT /api/contacts/:id
// Private  
router.put('/:id', (req, res) => {
    res.json({ msg: "Update a contact" })
})

// Delete a contact
// DELETE /api/contacts/:id
// Private  
router.delete('/:id', (req, res) => {
    res.json({ msg: "Delete a contact" })
})


module.exports = router
