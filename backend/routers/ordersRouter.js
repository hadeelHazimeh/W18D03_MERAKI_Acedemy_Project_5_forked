const express = require("express");
const { createNewOrder } = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");
// Create roles router
const orderRouter = express.Router();

orderRouter.post("/create",authentication,createNewOrder);

module.exports = orderRouter;
