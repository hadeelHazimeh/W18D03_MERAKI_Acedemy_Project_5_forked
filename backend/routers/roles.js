const express = require("express");
const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
} = require("../controllers/roles");
// Create roles router
const roleRouter = express.Router();

roleRouter.post("/create", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/rolePermission", createNewRolePermission);
module.exports = roleRouter;
