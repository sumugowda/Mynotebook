const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sumanth1sumu:MynotebookDatabase1@cluster0.hvfnkfx.mongodb.net/myNotebook?retryWrites=true&w=majority"



const connectMongo = ()=>{
    mongoose.connect(mongoURI)
    mongoose.connection.on('connected', function () {  
        console.log('Connected to Database Successfully...');
      });
}


module.exports = connectMongo;