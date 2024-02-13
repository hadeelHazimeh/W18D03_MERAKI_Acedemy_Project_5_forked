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
 //this function creates  a New Role Permission
const createNewRolePermission = (req, res) => {
  const { role_id, permissions_id } = req.body;
  const query = `INSERT INTO role_permissions (role_id,
    permissions_id) VALUES ($1,$2) RETURNING *`;
  const data = [role_id, permissions_id];

 
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: ` Role Permission created successfully`,
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
  createNewRolePermission,
};
