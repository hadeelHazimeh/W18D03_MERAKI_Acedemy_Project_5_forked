const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  createService,
  getAllServices,
  getServiceByName,
  updateServiceById,
  getServiceByProviderId,
  deleteServiceById,
  getPendingService,
  getServiceByProvider,

} = require("../controllers/service");

const serviceRouter = express.Router();

serviceRouter.post("/", authentication, createService);


serviceRouter.get("/", getAllServices);

serviceRouter.get("/byName", getServiceByName);
serviceRouter.put("/:service_id", authentication,updateServiceById);

serviceRouter.get("/provider/:id", authentication,getServiceByProviderId)
serviceRouter.delete("/:id", authentication, deleteServiceById)

serviceRouter.get("/byStatus", getPendingService);
serviceRouter.get("/provider", authentication, getServiceByProvider)

module.exports = serviceRouter;
