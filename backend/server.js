const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
const userRouter = require("./routes/users");

app.use("/users",userRouter)



app.listen (PORT , ()=>{
    console.log(`server run on http://localhost:${PORT}`);
})