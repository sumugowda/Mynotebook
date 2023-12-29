const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'comelet$ENCRYPT&hide'
//ROUTE : 1 - create a user with POST:'/api/auth/createuser', NO login required
router.post('/createuser',[
    body('username','Invalid credentials').isEmail(),
    body('name','Enter the correct name').isLength({ min: 3 }),
    body('password','Invalid credentials').isLength({ min: 5 })
],async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    //If errors return bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //check if the user with same email already exists 
    try{
    let user = await User.findOne({username: req.body.username})
    if(user){
        return res.status(400).json({success,error:"Email already exists..."})
    }
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: secPass,
    })
    const data = {
        user:{
            id:user.id  
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success=true;
    res.json({ success, authToken})
    //   .then(user => res.json(user))
    //   .catch(err=>{res.json({error:"Email Reused",suggestion:"Please enter a email that has never been used..."})})
    // res.json("Successfully saved to database")
    } catch(error){
        console.error(error.message);
        res.status(500).send("Oops!! An Error Occured")
    }
})

//ROUTE : 2 - Authenticate a user with POST:'/api/auth/login', NO login required
router.post('/login',[
    body('username','Invalid credentials').isEmail(),
    body('password','Invalid credentials').exists(),
],async (req,res)=>{
    let success = false
    const errors = validationResult(req);
    //If errors return bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {username,password} = req.body;
    try {
        let user = await User.findOne({username})
        if(!user){
           return res.status(400).json({error:"Incorrect credentials.."})
        }

        const comparePass = await bcrypt.compare(password,user.password)
        if(!comparePass){
            success = false
           return res.status(400).json({success ,error:"Incorrect credentials.."})
        }
        const data = {
            user:{
                id:user.id  
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success,authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Oops!! An Error Occured");
    }



});

//ROUTE : 3 - Get logedin user details  with POST:'/api/auth/getuser', Login required
router.post('/getuser', fetchuser, async (req,res)=>{
    
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Oops!! An Error Occured");
    }
    
})

module.exports = router