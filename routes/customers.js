const express = require("express");
const mongoose = require("mongoose");
const { Customers, validate } = require("../models/customer");
const router = express.Router();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB for Customers..."))
  .catch((err) => console.log("Could not connect to mongodb...", err));

router.get("/", async (req, res) => {
  const customers = await Customers.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let customer = Customers({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    {
      new: true,
    }
  );
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customers.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customers.findById(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");
  res.send(customer);
});

module.exports = router;
