const express = require("express");
const { Movies } = require("../models/movie");
const { Customers } = require("../models/customer");
const mongoose = require("mongoose");
const { Rental, validateRental } = require("../models/rental");
const router = express.Router();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB for Genres..."))
  .catch((err) => console.log("Could not connect to mongodb...", err));

router.get("/", async (req, res) => {
  const movies = await Rentals.find().sort("-dateOut");
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customers.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer Id");

  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie Id");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in Stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  rental = await rental.save();
  movie.numberInStock--;
  movie.save();

  res.send(rental);
});
