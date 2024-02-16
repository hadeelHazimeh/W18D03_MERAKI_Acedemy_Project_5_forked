const express = require("express");
const {
  createNewOrder,
  createNewOrderServices,
  getAllOrders,
  getOrderById,
} = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");
// Create roles router
// end point / 
const orderRouter = express.Router();

//create new order end point /orders/create
orderRouter.post("/create", authentication, createNewOrder); //client

//==========================================
//adding an order with its services end point /orders/orderService
orderRouter.post("/orderService", authentication, createNewOrderServices); //client

//=============================================
// getting all orders end point /orders/allOrders
orderRouter.get("/allOrders", getAllOrders); //admin

//==============================================
//get the detailed order by its id (id=> orderid) end point /orders/search_1/:id
orderRouter.get("/search_1/:id", getOrderById); //admin or client

module.exports = orderRouter;
