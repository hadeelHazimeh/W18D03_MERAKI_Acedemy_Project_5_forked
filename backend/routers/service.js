const express = require("express");
const { createService,getServiceByName } = require("../controllers/service");
const authentication = require("../middlewares/authentication");
const serviceRouter = express.Router();

serviceRouter.post("/", authentication, createService);
serviceRouter.get("/byName",getServiceByName)
module.exports = serviceRouter;
