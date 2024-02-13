const { pool } = require("../models/db");

const createNewOrder = (req, res) => {
const {order_price,eventDate, place,status}= req.body;
const user_id=req.token.userId;

  const data = [order_price, user_id, eventDate, place,status];

  pool.query(
    `INSERT INTO orders (order_price, user_id, eventDate, place,status) VALUES ($1,$2,$3,$4,$5) 
    RETURNING * `,
    data
  ).then((result)=>{
    res.status(201).json({
      success: true,
      message: "your plan is created successfully",
      result:result.rows
  })
}).catch((err)=>{
  res.status(200).json({
    success:false,
    err:err,
    message:"server error"
  })
})



};

module.exports = {
  createNewOrder,
};
