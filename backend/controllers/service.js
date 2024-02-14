const { pool } = require("../models/db");

//this function to create new service in the database
// End Point : POST /service

const createService = (req, res) => {
  const provider = req.token.userId;
  console.log("provider", req.token);
  const { service_name, details, price, image } = req.body;
  pool
    .query(
      "INSERT INTO services (service_name, details, price, image, provider) VALUES ($1,  $2, $3, $4, $5) RETURNING *",
      [service_name, details, price, image, provider]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Service created successfully!",
        service: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err.message,
      });
    });
};
const getServiceByName = (req, res) => {
  const serviceName = req.query.service_name;
  const query = `SELECT * FROM services WHERE service_name = $1 AND is_deleted=0;`;
  const data = [serviceName];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The name: ${serviceName} has no services`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All services for the user: ${serviceName}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//this function to get All service from the database
// End Point : GET /service
const getAllServices = (req, res) => {
  pool
    .query("SELECT * FROM services WHERE services.is_deleted=0")
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `No Services Found!`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the services`,
        services: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
module.exports = {
  createService,
  getAllServices,
  getServiceByName,
};
