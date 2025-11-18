const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET

function auth(req,res,next){
  try{
      const header = req.headers.authorization;
      const token = header.split(" ")[1]
      if(!header) return res.status(401).json({message:"No token Found"})

      
        jwt.verify(token,SECRET,(err,decoded)=>{
          if(err) return res.status(403).json({message:"Invalid token"})
            req.user = decoded
          next()
        })

      
  }catch(err){
      res.status(500).json({message:"Auth error"})
  }
}

module.exports = auth