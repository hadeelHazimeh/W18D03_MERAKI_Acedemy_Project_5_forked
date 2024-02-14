const express = require("express");
const { createService, getAllServices } = require("../controllers/service");
const authentication = require("../middlewares/authentication");
const serviceRouter = express.Router();

serviceRouter.post("/", authentication, createService);
serviceRouter.get("/", getAllServices);
module.exports = serviceRouter;
