const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  createService,
  getAllServices,
  getServiceByName,
  updateServiceById
} = require("../controllers/service");

const serviceRouter = express.Router();

serviceRouter.post("/", authentication, createService);

serviceRouter.get("/", getAllServices);

serviceRouter.get("/byName", getServiceByName);
serviceRouter.put("/:service_id", updateServiceById);



module.exports = serviceRouter;
