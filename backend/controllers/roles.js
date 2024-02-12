// This function creates new role
const { pool } = require("../models/db");
const createNewRole = (req, res) => {
  const { role } = req.body;
  pool
    .query(`INSERT INTO  roles (role) VALUES ($1) RETURNING *`, [role])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        role: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
      });
    });
};
//this function creates new permission
const createNewPermission = (req, res) => {
  const { permission } = req.body;
  const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *;`;
  const data = [permission];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Permission created successfully`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};



module.exports = {
  createNewRole,
createNewPermission,
};

