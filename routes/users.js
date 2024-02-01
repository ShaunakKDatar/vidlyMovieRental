const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, validateUsers } = require("../models/users");
const { date } = require("joi");

router.get("/", async (req, res) => {
  const users = await Users.find().sort({ date: -1 });
  res.send(users);
});
