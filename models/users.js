const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    name: {
      type: String,
      required: 1,
    },
    email: {
      type: String,
      unique: 1,
      required: 1,
    },
    password: {
      type: String,
      min: 8,
      required: 1,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().unique().required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
