const express = require("express");
const { createNewOrder } = require("../controllers/orderController");
// Create roles router
const orderRouter = express.Router();

orderRouter.post("/create", createNewOrder);

module.exports = orderRouter;
