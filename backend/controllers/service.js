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
//this function to get service by Name from the database
// End Point : GET /service/byName
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


// this function to Get all service by provider id
// EndPoint : GET /service/provider/:id
const getServiceByProviderId = (req, res) => {
  const id = req.params.id;
  pool
    .query(`SELECT * FROM services WHERE provider =$1 AND is_deleted=0`, [id])

const getPendingService = (req, res) => {
  const pending = req.query.status;
  const query = `SELECT * FROM services WHERE status = $1 AND is_deleted=0;`;
  const data = [pending];

  pool
    .query(query, data)

    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,

          message: `No Services Found for this provider ${id}!`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the services for this provider ${id}`,
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

// this function to delete a service By id
// EndPoint : GET /service/:id
const deleteServiceById = (req, res) => {
  const id = req.params.id;
  const userId = req.token.userId;
  pool
    .query(
      "UPDATE services SET is_deleted=1 WHERE service_id=$1 AND status='pending' AND provider =$2 RETURNING * ",
      [id, userId]
    )
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Service with id: ${id} deleted successfully`,
        });
      } else {
        pool
          .query(
            "SELECT * FROM services WHERE service_id=$1 AND provider =$2",
            [id, userId]
          )
          .then((result) => {
            if (result.rows.length !== 0) {
              res.status(400).json({
                success: false,
                message: `Cannot delete service with id: ${id} because its status is not 'pending'`,
              });
            } else {
              res.status(404).json({
                success: false,
                message: `Service with id: ${id} not found`,
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
module.exports = {
  createService,
  getAllServices,
  getServiceByName,
  getServiceByProviderId,
  deleteServiceById,
  getPendingService,
};
