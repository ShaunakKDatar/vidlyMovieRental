const mongoose = require("mongoose");
const Joi = require("joi");

const Customers = mongoose.model(
  "customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
      required: true,
    },
    name: {
      type: String,
      required: false,
      min: 5,
      max: 50,
    },
    phone: {
      type: String,
      required: true,
      min: 9,
      max: 11,
    },
  })
);

function validateCustomer(Customers) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(9).max(11).required(),
  });

  return Joi.validate(Customers, schema);
}

exports.Customers = Customers;
exports.validate = validateCustomer;
