const { pool } = require("../models/db");

//this function to create new service in the database
// End Point : POST /service

const createService = (req, res) => {
  const provider = req.token.userId;
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

module.exports = {
  createService,
};
