const express = require("express");

// Create package router
const packageRouter = express.Router();
const authentication = require("../middlewares/authentication");
const { createNewPackage,createNewServicePackage } = require("../controllers/package");

//this function for create a new package 
//endpoint=>/package/create
//body=>{ package_Name,price,Description,image,event }
packageRouter.post("/create", createNewPackage);//admin

//this function for create a new package 
//endpoint=>/package/create/servicePackage
//body=> { service_id,package_id }
packageRouter.post("/create/servicePackage", createNewServicePackage);//admin
module.exports = packageRouter;
