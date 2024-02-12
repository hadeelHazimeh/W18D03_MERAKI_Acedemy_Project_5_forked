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



module.exports = {
  createNewRole,
  
};