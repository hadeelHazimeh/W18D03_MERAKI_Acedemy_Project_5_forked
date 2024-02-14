const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Import Routers
const userRouter=require("./routers/userRouter")
const roleRouter = require("./routers/roles");
const orderRouter=require("./routers/ordersRouter")
const eventRouter = require("./routers/eventRouter");
const serviceRouter = require("./routers/service");
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/roles",roleRouter);
app.use("/users",userRouter)
app.use("/orders",orderRouter)
app.use("/service",serviceRouter)
app.use("/events",eventRouter)




// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
