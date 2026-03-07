const express=require("express")
const app=express();


app.post("/user/signup",(req,res)=>{
    res.json({
        "msg":"signup endpoint"    
    })
})

app.post("/user/signin",(req,res)=>{
    res.json({
        "msg":"signin endpoint"
    })
})

app.get("/user/purcahsed",(req,res)=>{
    res.json({
        "msg":"purchased endpoint"
    })
})

app.post("/purchase/course",(req,res)=>{
    res.json({
        "msg":"course-purchase endpoint"
    })
})

app.get("/course/available",(req,res)=>{
    res.json({
        "msg":"available-course endpoint"
    })
})



app.listen(3000,()=>{
    console.log("app is running hot on the port 3000");
})