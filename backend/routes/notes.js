const express = require('express')
const Notes = require('../models/Notes');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

// ROUTE : 1 -- Get all notes using GET "/api/"
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
})

module.exports = router;
