const express = require("express");
const {
    createNewEvent,
    getAllEvents,
    createNewEventService
} = require("../controllers/events");
// Create event router
const eventRouter = express.Router();
//this function for create a new event 
//endpoint=>/events/create
//body=>{ event, image }
eventRouter.post("/create", createNewEvent);//admin
//=============================================

//this function for getting all the events 
//endpoint=>/events on get
eventRouter.get("/", getAllEvents);//admin
//=============================================
//this function for create a New Event Service 
//endpoint=>/events/create/service_event
//body=>{ service_id, event_id  }
eventRouter.post("/service_event", createNewEventService);//admin


module.exports = eventRouter;
