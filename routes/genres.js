const express = require("express");
const mongoose = require("mongoose");
const { Genre, validateGenre } = require("../models/genre");
const router = express.Router();

// Adding persistance
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB for Genres..."))
  .catch((err) => console.log("Could not connect to mongodb...", err));

// End of Persistance code
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = Genre({
    name: req.body.name,
  });
  await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");
  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");
  const genre = await Genre.findByID(req.params.id);
  if (!genre);
  return res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

module.exports = router;
