const express = require("express");
const { createNewOrder,createNewOrderServices,getAllOrders,getOrderById} = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");
// Create roles router
const orderRouter = express.Router();

orderRouter.post("/create",authentication,createNewOrder);//client 
orderRouter.post("/orderService",authentication,createNewOrderServices)//client 
orderRouter.get("/allOrders",getAllOrders)//admin 
orderRouter.get("/search_1/:id",getOrderById)//admin or client
module.exports = orderRouter;
