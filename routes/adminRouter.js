const {Router}=require("express");
const adminRouter=Router()
const {adminModel}=require("../db")
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
const saltRounds=15;
const JWT_ADMIN_SECRET="wamiqagabbi"

adminRouter.post("/signup",(req,res)=>{
    let { email,password,firstName,lastName }=req.body;

    bcrypt.hash(password, saltRounds)
    .then(function(hash) {
        password=hash;
        
        adminModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
        })
        .then(()=>{
            console.log("admin has been created")
            res.json({
                "msg":"admin has been created"
                
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

adminRouter.post("/signin",(req,res)=>{
    let {email,password} = req.body;

   adminModel.findOne({ email })
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
                    JWT_ADMIN_SECRET
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

})

adminRouter.post("/course",(req,res)=>{
    res.json({
        "msg":"adminrouter courses"
    })

})

adminRouter.put("/courses",(req,res)=>{
    res.json({
        "msg":"adminrouter change courses"
    })

})

adminRouter.get("/courses",(req,res)=>{
    res.json({
        "msg":"endpoint iof the courses that are goven by the teacher"
    })
})

module.exports={
    adminRouter:adminRouter
}