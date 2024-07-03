const express = require('express')
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE : 1 -- Get all notes using GET "/api/auth/fetchallnotes" , login is required for this 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE : 2 -- Add a new note using POST "/api/auth/addnote" , login is required for this 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must have atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    //If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }


    try {
        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
