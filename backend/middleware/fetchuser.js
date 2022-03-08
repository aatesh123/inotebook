//middleware user for authentication
const jwt = require('jsonwebtoken');
const JWT_SECRET='Aateshisagoodboy$';
const fetchuser =(req,res,next)=>{
    //we did manually on header in thunderclient
      const token=req.header('auth-token')
      if(!token){
          res.status(401).send({error: "please authenticate using a valid token"})
      }
      try{
       //way to get user credental form token    
      const data=jwt.verify(token,JWT_SECRET)
      req.user=data.user
      next();
      }
      catch(error){
        res.status(401).send({error: "please authenticate using a valid token"})
      }
}


module.exports=fetchuser