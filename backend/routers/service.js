const express = require("express");

const {
  createService,
  getAllServices,
  getServiceByName,
  getServiceByProviderId,
  deleteServiceById,
} = require("../controllers/service");

const authentication = require("../middlewares/authentication");
const serviceRouter = express.Router();

serviceRouter.post("/", authentication, createService);

serviceRouter.get("/", getAllServices);

serviceRouter.get("/byName", getServiceByName);
serviceRouter.get("/provider/:id", authentication,getServiceByProviderId)
serviceRouter.delete("/:id", authentication, deleteServiceById)

module.exports = serviceRouter;
