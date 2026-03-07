const {Router}=require("express")
const coursesRouter=Router();

coursesRouter.post("/purchase",(req,res)=>{
    res.json({
        "msg":"course-purchase endpoint"
    })
})


coursesRouter.get("/available",(req,res)=>{
    res.json({
        "msg":"available-course endpoint"
    })
})

module.exports={
    coursesRouter:coursesRouter
}
