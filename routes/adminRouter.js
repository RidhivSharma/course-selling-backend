require('dotenv').config()
const {Router}=require("express");
const adminRouter=Router()
const {adminModel, courseModel}=require("../db")
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");
const saltRounds=15;
const JWT_ADMIN_SECRET=process.env.JWT_ADMIN_SECRET;

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

adminRouter.post("/course",adminMiddleware,(req,res)=>{
    const adminId=req.userId;
    const {title,description,imageUrl,price}=req.body;

    courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
    })
    .then((course)=>{
        return res.json({
            msg:"course has been added",
            courseId:course._id
        })
    })
    .catch((e)=>{
        console.log(e)
        return res.json({
            msg:"something is worng int the course creattionthingy"
        })
    })


})

adminRouter.put("/course",adminMiddleware,(req,res)=>{
    const adminId=req.userId;

    const {title,description,imageUrl,price,courseId}=req.body;
    courseModel.updateOne({
      _id:courseId
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId

    })
    .then((course)=>{
        res.json({
            "msg":"course have been updated",
            "courseid":courseId
        })

    })
    .catch((e)=>{
        console.log(e);
        res.json({
            msg:"some fuck up have happend"
        })

    })

})

adminRouter.get("/courses",adminMiddleware,(req,res)=>{
    const adminId=req.userId;

    courseModel.find({creatorId:adminId})
    .then((courses)=>{
        if(courses.length>0){
            return res.json({
                courses:courses
            })

        }else{
            return res.json({
                msg:"no copurse has been created by you"
            })
        }

    })
    .catch((e)=>{
        console.log(e);
        res.json({
            msg:"some thing eror has happened while fectching the copurses"
        })
    })
    
})

module.exports={
    adminRouter:adminRouter
}