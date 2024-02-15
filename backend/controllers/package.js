const { pool } = require("../models/db");
// This function creates new package

const createNewPackage = (req, res) => {
  const { package_Name, price, Description, image, event } = req.body;
  const value = [package_Name, price, Description, image, event];
  const query = `INSERT INTO package (package_Name,price,Description,image,event) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  pool
    .query(query, value)
    .then((result) => {
      console.log(result.rows);
      res.status(200).json({
        success: true,
        message: "package created successfully",
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
//this function for get all package with service details
const createNewServicePackage = (req, res) => {
    const { service_id,package_id } = req.body;
    const value = [ service_id,package_id];
    const query = `INSERT INTO service_package ( service_id,package_id) VALUES ($1,$2) RETURNING *;`;
    pool
      .query(query, value)
      .then((result) => {
        console.log(result.rows);
        res.status(200).json({
          success: true,
          message: "service_package created successfully",
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
  createNewPackage,
  createNewServicePackage
};
