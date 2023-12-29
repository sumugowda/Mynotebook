const mongoose = require('mongoose');
const {Schema} = mongoose;

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const a = today.toDateString(); // "Sun Jun 14 2020"

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
    },
    date:{
        type:String,
        default: a
    }
})

module.exports = mongoose.model('notes',NotesSchema);