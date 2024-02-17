const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

router.get("/me",auth, async (req,res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
})

router.post("/", async (req,res) => {
  const { error } = await validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email : req.body.email});
  if(user) return res.status(400).send("User already exists");

  user = new User(_.pick(req.body, ['name','email','password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);

  await user.save();
  const token = user.generateAuthToken();
  res.header('X-auth-token',token).send(_.pick(user, ['name','email']));
})





module.exports = router;
