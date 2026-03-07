const {Router}=require("express");
const adminRouter=Router()


adminRouter.post("/signup",(req,res)=>{
    res.json({
        "msg":"adminrouter signup"
    })

})

adminRouter.post("/signin",(req,res)=>{
    res.json({
        "msg":"adminrouter signin"
    })

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