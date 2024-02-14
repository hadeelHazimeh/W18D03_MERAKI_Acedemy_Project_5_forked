const express = require("express");
const { createService } = require("../controllers/service");
const authentication = require("../middlewares/authentication");
const serviceRouter = express.Router();

serviceRouter.post("/", authentication, createService);

module.exports = serviceRouter;
