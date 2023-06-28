const express = require('express');
const fetchuser = require('../middleware/fetchuser.js');
const router = express.Router();
const Notes = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1 : Get all the notes using /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
    

})

// ROUTE 2: Add a new Note using: /api/notes/fetchallnotes
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),

    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const notes = new Notes({
        title, description, tag, user: req.user.id
    })
    const savedNotes = await notes.save();

    res.json(savedNotes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

    

})


// ROUTE 3: Update an existing note using: /api/notes/updatenote login required
router.put('/updatenotes/:id',fetchuser,[
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Description must be at least 5 characters.').isLength({min:5})
] ,async (req,res)=>{
    const {title, description, tag} = req.body;
    // Create new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    try {
        // Find the note to be updates
    let note = await Notes.findById(req.params.id)
    
    if(!note){
        res.status(404).send("Not found");
    };

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote}, {new: true})
    res.json({note})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }


    

})

// ROUTE 4: DELETE an existing note using: /api/notes/deletenote login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{

    try {
        let note = await Notes.findById(req.params.id);
    
        if(!note){
            res.status(404).send("Not found");
        };
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }
    
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }


})







module.exports = router;