const Joi = require("joi");
const mongoose = require("mongoose");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: false,
          min: 5,
          max: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
          required: true,
        },
        phone: {
          type: String,
          required: true,
          min: 9,
          max: 11,
        },
      }),
      required: true,
    },

    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      defualt: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validateRental = validateRental;
