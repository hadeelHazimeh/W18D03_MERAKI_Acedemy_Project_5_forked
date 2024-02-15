const express = require("express");

// Create package router
const packageRouter = express.Router();
const authentication = require("../middlewares/authentication");
const { createNewPackage } = require("../controllers/package");

//this function for create a new package 
//endpoint=>/package/create
//body=>{ package_Name,price,Description,image,event }
packageRouter.post("/create", createNewPackage);//admin


module.exports = packageRouter;
