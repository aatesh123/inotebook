const express= require('express');
const fetchuser = require('../middleware/fetchuser');
const router=express.Router();
const Note=require('../models/Notes')
const { body, validationResult } = require('express-validator');


//add notes 
router.post('/addnote',fetchuser,
[
    body('title','enter  a valid title').isLength({min: 3}),
    body('description','enter a valid description').isLength({min: 5})
]
,async (req,res)=>{

   try{
      const { title, description, tag }=req.body;
      // console.log("yes")
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
   
      const note=new Note({
          title, description , tag, user : req.user.id
      })
    
      const savedNote=await note.save()
      res.json(savedNote)
   }
   catch(error){
    console.error(error.message)
    res.status(500).send("some eroor occured");
 }

 })
 




router.get('/getnotes',fetchuser,async (req,res)=>{
   try{
   const notes=await Note.find({user : req.user.id});
   res.json(notes)
   }
   catch(error){
      console.error(error.message)
      res.status(500).send("some eroor occured");
   }
})




//router 3 update existing nodes


router.put('/updatenote/:id',fetchuser,async (req,res)=>{
 try{
   const { title, description, tag }=req.body;

   const newNote ={};
   if(title){newNote.title=title}
   if(description){newNote.description=description}
   if(tag){newNote.tag=tag}

   const note=await Note.findById(req.params.id)
   if(!note){return res.status(404).send("not found")}
   if(note.user.toString()!==req.user.id){
      return res.status(401).send("not allowed");
   }

   const notee =await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true})
   res.json({notee})
}
catch(error){
   console.error(error.message)
   res.status(500).send("some eroor occured");
}
})


//delete note 


router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

   // const { title, description, tag }=req.body;

   // const newNote ={};
   // if(title){newNote.title=title}
   // if(description){newNote.description=description}
   // if(tag){newNote.tag=tag}
  try{
   const note=await Note.findById(req.params.id)
   if(!note){return res.status(404).send("not found")}
   if(note.user.toString()!==req.user.id){
      return res.status(401).send("not allowed");
   }

   const notee =await Note.findByIdAndDelete(req.params.id)
   res.json({"Success" : "note has been deleted"})
}
catch(error){
   console.error(error.message)
   res.status(500).send("some eroor occured");
}
})
module.exports = router 