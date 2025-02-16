const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let items = [{ id: 1, name: "Item 1" }];

// Get all items
app.get("/items", (req, res) => {
  res.json(items);
});

// Get item by ID
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// Add a new item
app.post("/items", (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Delete an item
app.delete("/items/:id", (req, res) => {
  items = items.filter((i) => i.id !== parseInt(req.params.id));
  res.json({ message: "Item deleted" });
});

module.exports = app;