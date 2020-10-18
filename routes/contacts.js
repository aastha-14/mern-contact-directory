const express = require('express');
const Contact = require("../models/Contact");
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require("express-validator");
const { findByIdAndUpdate } = require("../models/Contact");

// Get all user contacts 
// GET /api/contacts
// Private  
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        if (!contacts) res.status(404).json({ msg: "No contacts saved yet" });
        res.json({ contacts });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.error(error.message);
    }
});

// Add contacts
// POST /api/contacts
// Private  
router.post('/',
    [
        auth,
        [
            check('name', 'Please enter the name').notEmpty(),
            check('email', 'Please enter a valid email').isEmail(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, phone, type } = req.body;
            const contact = new Contact({ name, email, phone, type, user: req.user.id });
            await contact.save();
            res.json({ contact });
        } catch (error) {
            res.status(500).json({ msg: "Server error" });
            console.error(error.message);
        }
    });

// Update a contact
// PUT /api/contacts/:id
// Private  
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // Contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) res.status(404).json({ msg: 'Contact not found' });
        // Check if User owns contact
        if (contact.user.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true });
        res.json({ contact });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.error(error.message);
    }
});

// Delete a contact
// DELETE /api/contacts/:id
// Private  
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Check if User owns contact
        if (contact.user.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact Deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.error(error.message);
    }
});


module.exports = router;
