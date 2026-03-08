const {Router}=require("express")
const userRouter=Router();
const bcrypt = require('bcrypt');
const {userModel}=require("../db")

const saltRounds=15;


userRouter.post("/signup",(req,res)=>{
    let { email,password,firstName,lastName }=req.body;

    bcrypt.hash(password, saltRounds)
    .then(function(hash) {
        password=hash;
        
        userModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
        })
        .then(()=>{
            console.log("user has been created")
            res.json({
                "msg":"user has been created"
                
            })
        })
        .catch((e)=>{
                console.log(e)
                res.json({
                    "msg":"some error has been occured"
                })
        })
    })
    .catch((e)=>{
        console.log(e);
        return res.json({
            "msg":"there has bene something error"
        })
    });
    
})

userRouter.post("/signin",(req,res)=>{
    res.json({
        "msg":"signin endpoint"
    })
})

userRouter.get("/purcahsed",(req,res)=>{
    res.json({
        "msg":"purchased endpoint"
    })
})

module.exports={
    userRouter:userRouter
}