const express = require("express");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { coursesRouter } = require("./routes/courses");
const {adminRouter} = require("./routes/adminRouter");
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/courses", coursesRouter);
app.use("/admin",adminRouter)



async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://ridhiv:Samridhi2048@test.d6wd339.mongodb.net/?appName=test/backend-course-selling",
    );
    console.log("DB connected");
    app.listen(3000, () => {
      console.log("app is running hot on the port 3000");
    });
  } catch (err) {
    console.log("DB error:", err);
  }
}
connectDB();
