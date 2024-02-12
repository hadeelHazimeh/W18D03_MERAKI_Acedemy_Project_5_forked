const express = require("express");
const {createNewRole, createNewPermission}=require("../controllers/roles")
// Create roles router
const roleRouter = express.Router();

roleRouter.post("/create",createNewRole)
roleRouter.post ("/permission",createNewPermission)

module.exports = roleRouter;