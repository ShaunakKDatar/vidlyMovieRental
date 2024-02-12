const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    name: {
      type: String,
      min : 5,
      max: 255,
      required: 1,
    },
    email: {
      type: String,
      min: 5,
      max: 255,
      unique: 1,
      required: 1,
    },
    password: {
      type: String,
      min: 5,
      max: 1024,
      required: 1,
    }
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
