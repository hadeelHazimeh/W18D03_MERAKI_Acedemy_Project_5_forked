const { pool } = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } =
    req.body;
    const result = await bcrypt.hash(password, 8);

  const data = [
    firstName,
    lastName,
    age,
    country,
    email,
    result,
    role_id,
  ];
  pool
    .query(
      `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING * `,
      data
    )
    .then((result) => {
      if (!email) {
        res.status(409).json({
          success: false,
          message: "The email already exists",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Account created successfully",
          result:result.rows
        });
      }
    }).catch((err)=>{
      console.log(err)
      res.status(200).json({
        success:false,
        err:err,
        message:"server error"
      })
    })
};

const login = (req, res) => {
const{email,password}=req.body;
// const data1=[email,password];
pool.query(`SELECT * FROM users WHERE email=$1`,email)
.then(async(result)=>{
  if(!email){
     res.status(403).json({
      success: false,
      message: `The email doesn't exist or The password you’ve entered is incorrect`,
    });
  }
  try {
    const valid = await bcrypt.compare(password, result.password);
    if (!valid) {
      return res.status(403).json({
        success: false,
        message: `The email doesn't exist or The password you’ve entered is incorrect`,
      });
    }
    const payload = {
      userId: result._id,
      role: result.role,
      country: result.country,
    };

    const options = {
      expiresIn: "60m",
    };
    const token = jwt.sign(payload, process.env.SECRET, options);
    res.status(200).json({
      success: true,
      message: `Valid login credentials`,
      token: token,
      userId: result._id
    });
  } catch (error) {
    throw new Error(error.message);
  }
}).catch((err)=>{
res.status(500).json({
  message:false,
  err:err
})
})

};

module.exports = {register,login};

