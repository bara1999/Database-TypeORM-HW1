import express from 'express';
import jwt from 'jsonwebtoken';
const authorize = (req: express.Request,
  res: express.Response,
  next: express.NextFunction
)=>{
    const token = req.headers['authorization']||'';
    console.log(process.env.SECRET_KEY);
    
    let tokenIsValid ;
    try{

        tokenIsValid =jwt.verify(token,process.env.SECRET_KEY||'')


    }catch(err){}
    console.log(tokenIsValid);

    if(tokenIsValid){
        const decode=jwt.decode(token);
        next();
    }
    else{
        res.status(401).send("you ate not auth");
    }
}

export{
    authorize
}