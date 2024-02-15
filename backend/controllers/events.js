// This function creates new event
const { pool } = require("../models/db");
const createNewEvent = (req, res) => {
  const { event, image } = req.body;
  const value = [event, image];
  const query = `INSERT INTO events (event,image) VALUES ($1,$2) RETURNING *;`;
  pool
    .query(query, value)
    .then((result) => {
      console.log(result.rows);
      res.status(200).json({
        success: true,
        message: "Event created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//======================================================================

//this function for getting all events
const getAllEvents = (req, res) => {
  const query = `SELECT 
  events.event_id, 
  events.event,
  services.service_id,
  services.service_name,
  services.details,
  services.price,
  services.image
FROM 
  events
INNER JOIN 
  service_event ON events.event_id = service_event.event_id
INNER JOIN 
  services ON service_event.service_id = services.service_id
WHERE 
  events.is_deleted = 0 AND 
  services.is_deleted = 0`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the Events",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
//======================================================================

//this function for getting all events
const createNewEventService = (req, res) => {
  const { service_id, event_id } = req.body;
  const value = [service_id, event_id ];
  const query = `INSERT INTO service_event (service_id, event_id) VALUES ($1,$2) RETURNING *;`;
  pool
    .query(query, value)
    .then((result) => {
      console.log(result.rows);
      res.status(200).json({
        success: true,
        message: "service_event created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};


module.exports = {
  createNewEvent,
  getAllEvents,
  createNewEventService,
 
};
