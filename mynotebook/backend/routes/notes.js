const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route 1 : Get all the notes of the user using : GET '/api/notes/fetchallnotes'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Oops!! An Error Occured")
    }
})
//Route 2 : Add notes by using : POST '/api/notes/addnote'
router.post('/addnote', fetchuser, [
    body('title', 'Title must of minimum 5 charecters').isLength({ min: 5 }),
    body('description', 'Too short for desciprtion').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        //If errors return bad request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Oops!! An Error Occured")
    }
})
//Route 3 : Update note by using : PUT '/api/notes/updatenote' , Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
    const {title, description, tag} = req.body;
    //Create a newNote object
    const newNote = {}; 
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find a note and upadate
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found..!")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json(note)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Oops!! An Error Occured")
}

})
//Route 4 : Delete note by using : delete '/api/notes/deletenote' , Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {    
    //Find a note and delete it 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found..!")}
    //Allow only if the notes belong to user
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "note is deleted successfully"})
} catch (error) {
    console.error(error.message);
    res.status(500).send("Oops!! An Error Occured")
}

})



module.exports = router