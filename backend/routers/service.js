const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  createService,
  getAllServices,
  getServiceByName,
  getPendingService
} = require("../controllers/service");

const serviceRouter = express.Router();

serviceRouter.post("/", authentication, createService);

serviceRouter.get("/", getAllServices);

serviceRouter.get("/byName", getServiceByName);
serviceRouter.get("/byStatus", getPendingService);
module.exports = serviceRouter;
