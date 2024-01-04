const express = require("express");
const mongoose = require("mongoose");
const { Genre } = require("../models/genre");
const { Movies, validateMovie } = require("../models/movie");
const router = express.Router();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB for Movies..."))
  .catch((err) => console.log("Could not connect to mongodb...", err));

router.get("/", async (req, res) => {
  const movies = await Movies.find().sort("title");
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  let movie = Movies({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    {
      new: true,
    }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found");
  movie.name = req.body.name;
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movies.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found");
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.detlais[0].message);

  const movie = await Movies.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found");

  res.send(movie);
});

module.exports = router;
