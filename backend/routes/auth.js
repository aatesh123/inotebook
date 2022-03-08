// this is router for authentication 
var bcrypt = require('bcryptjs');
const express= require('express')
const User= require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const  fetchuser=require('../middleware/fetchuser')


const jwt = require('jsonwebtoken');
//generally in .env file for security purpose
const JWT_SECRET='Aateshisagoodboy$';

// this request is for creating user data in body we save using thunderclient endpoint for create user is ./routes/auth/createuser
router.post('/createuser',
// middleware
[
     body('email','enter  a valid email').isEmail(),
     body('name','enter a valid name').isLength({min: 3}),
     body('password','password must be atleast 5 characters').isLength({min: 5}),
],
//async await when there i s promise return
async (req,res)=>{
  const success=false;
  try{
    //predefined syntax if error in middleware then crash
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //mongoose query to check weather user is ther eor not if not then null
    let user=await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({success,error: "sorry a user with this email already exists"})
    }
    //bcrypt js
    const salt=await bcrypt.genSalt(10)
    const secPass= await bcrypt.hash(req.body.password,salt);


    //this syntax is available in expressjs.com
    user= await User.create({
     name: req.body.name,
     password: secPass,
     email: req.body.email,
   })

   const data ={
    user :{
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success=true;
  res.json({success,authtoken})
 

  }
  catch(error){
     console.error(error.message)
     res.status(500).send("some eroor occured");
  }
  //  .then(user => res.json(user)).catch
  //  (err=> {console.log(err)
  //   res.json({error: 'Please enter a unique value for mail'})})
  //  ;
})

// router for login
router.post('/login',
// middleware
[
     body('email','enter  a valid email').isEmail(),
     body('password','passport is empty').exists(),
],
async (req,res)=>{
  let success=false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} =req.body;
  try{
      let user=await User.findOne({email})
      if(!user){
        return res.status(400).json({error: "please try to login with correct credentials"})
      }
      const passportCompare=await bcrypt.compare(password,user.password)
      if(!passportCompare){
        // success=false
        return res.status(400).json({success,error: "please try to login with correct credentials"})
      }
      const data ={
        user :{
          id: user.id
        }
      }
      success=true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({success,authtoken})
      console.log(authtoken)
  }
  catch(error){
    console.error(error.message)
    res.status(500).send("some eroor occured");
 }

})


// router 3 : Get loggedin User detail using POST "/api/auth/getuser" login required
router.post('/getuser',
fetchuser,
async (req,res)=>{
  try{
    //now after middleware next function will run 
     userId=req.user.id;
     const user=await User.findById(userId).select("-password")
     res.send(user)
  }
  catch(error){
    console.error(error.message)
    res.status(500).send("some eroor occured");
 }
})
module.exports = router