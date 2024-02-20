const { pool } = require("../models/db");

const createNewOrder = (req, res) => {
  const { order_price, eventDate, place, status } = req.body;
  const user_id = req.token.userId;

  const data = [order_price, user_id, eventDate, place, status];

  pool
    .query(
      `INSERT INTO orders (order_price, user_id, eventDate, place,status) VALUES ($1,$2,$3,$4,$5) 
    RETURNING * `,
      data
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "your plan is created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(200).json({
        success: false,
        err: err,
        message: "server error",
      });
    });
};

const createNewOrderServices = (req, res) => {
  const order_id = req.params.id;
  const { service_ids } = req.body; // array



  const data= service_ids.map((service_id) => `(${order_id}, ${service_id})`).join(', ');

  const query = `
    INSERT INTO orders_services (order_id, service_id) 
    VALUES ${data}
    RETURNING *`;

  pool.query(query)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `new order created with services are created`,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.error("Error creating order services:", err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};


const getAllOrders = (req, res) => {
  const query = `SELECT o.order_id, o.order_price, o.eventDate, o.place,
   os.service_id, s.service_name, s.details, s.price, s.image
  FROM orders o
  JOIN orders_services os ON o.order_id = os.order_id
  JOIN services s ON os.service_id = s.service_id
  WHERE o.is_deleted = 0
  AND os.is_deleted = 0;`;

  pool
    .query(query)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: "All the detailed order",
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting orders");
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
//this function get the order  by id with all details including the userName (client)
const getOrderById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT o.user_id,
  u.userName , 
  o.order_id, o.order_price, o.eventDate, o.place,
   os.service_id, s.service_name, s.details, s.price, s.image
  FROM orders o
  JOIN orders_services os ON o.order_id = os.order_id
  JOIN services s ON os.service_id = s.service_id
  JOIN users u ON o.user_id = u.user_id 
  WHERE
  o.order_id = $1
  AND o.is_deleted = 0
  AND os.is_deleted = 0;
  
  `;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The order with id: ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting the order");
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
  createNewOrder,
  createNewOrderServices,
  getAllOrders,
 getOrderById
};
