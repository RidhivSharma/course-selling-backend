const express=require("express");
const { userRouter } = require("./routes/user");
const { coursesRouter } = require("./routes/courses");
const app=express();


app.use("/user",userRouter)
app.use("courses",coursesRouter)



app.listen(3000,()=>{
    console.log("app is running hot on the port 3000");
})