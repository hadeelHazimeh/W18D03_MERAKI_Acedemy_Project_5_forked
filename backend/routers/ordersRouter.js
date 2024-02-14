const express = require("express");
const { createNewOrder,createNewOrderServices,getAllOrders} = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");
// Create roles router
const orderRouter = express.Router();

orderRouter.post("/create",authentication,createNewOrder);//client 
orderRouter.post("/orderService",authentication,createNewOrderServices)//client 
orderRouter.get("/allOrders",getAllOrders)//admin 
module.exports = orderRouter;
