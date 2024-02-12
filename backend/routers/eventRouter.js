const express = require("express");
const {
    createNewEvent,
    getAllEvents
} = require("../controllers/events");
// Create event router
const eventRouter = express.Router();
//this function for create a new event 
//endpoint=>/events/create
//body=>{ event, image }
eventRouter.post("/create", createNewEvent);
//=============================================

//this function for getting all the events 
//endpoint=>/events on get
eventRouter.get("/", getAllEvents);
module.exports = eventRouter;
