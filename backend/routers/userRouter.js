const express = require("express");

const { register } = require("../controllers/usersController");

const usersRouter = express.Router();

usersRouter.post("/register", register);
// usersRouter.post("/login", login);

module.exports = usersRouter;