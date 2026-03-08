require('dotenv').config()
const {Router}=require("express")
const userRouter=Router();
const bcrypt = require('bcrypt');
const {userModel}=require("../db")
const jwt=require("jsonwebtoken")
const JWT_USER_SECRET=process.env.JWT_USER_SECRET;
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
   let {email,password} = req.body;

   userModel.findOne({ email })
   .then((user)=>{

        if(!user){
            return res.json({
                msg:"user not found"
            });
        }

        bcrypt.compare(password, user.password)
        .then((result)=>{

            if(result){
                const token = jwt.sign(
                    { id: user._id },
                    JWT_USER_SECRET
                );

                return res.json({
                    token: token
                });

            }else{
                return res.json({
                    msg:"password is not matching try again"
                });
            }

        });

   })
   .catch((e)=>{
        console.log(e);
        res.json({
            msg:"some error occurred"
        });
   });
});

userRouter.get("/purcahsed",(req,res)=>{
    res.json({
        "msg":"purchased endpoint"
    })
})

module.exports={
    userRouter:userRouter
}