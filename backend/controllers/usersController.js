const {pool} = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { userName, email, password, role } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 7);
  const query = `INSERT INTO users (userName, email, password,role) VALUES ($1,$2,$3,$4)`;
  const data = [userName, email.toLowerCase(), encryptedPassword, role];

  pool
    .query(query, data)

    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};
module.exports = {
  register,
};
