const {Router}=require("express")
const userRouter=Router();
const userModel=require("../db")


userRouter.post("/signup",(req,res)=>{
    res.json({
        "msg":"signup endpoint"    
    })
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