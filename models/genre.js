const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 5,
    max: 50,
    required: 1,
  },
});
const Genre = mongoose.model("genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;
