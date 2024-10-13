const express = require('express');
const path = require("path");
const fs = require("fs");

const router = express.Router();
const dbFilePath = path.join(__dirname, "public", "individual-characters.json");

// Helper function to read the database file
const readDatabase = () => {
  const data = fs.readFileSync(dbFilePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write to the database file
const writeDatabase = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf8");
};

// Get all items
router.get("/individual-characters", (req, res) => {
  const data = readDatabase();
  res.json(data);
});

// Get a single item by ID
router.get("/individual-characters/:id", (req, res) => {
  const data = readDatabase();
  const item = data.find((item) => item.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Create a new item
router.post("/individual-characters", (req, res) => {
  const data = readDatabase();
  const newItem = req.body;
  if (!newItem.topic || !newItem.日文 || !newItem["平/片假名讀音"]) {
    return res.status(400).send("Missing required fields");
  }

  if (data.find((item) => item.topic === newItem.topic)) {
    return res.status(400).send("Item already exists");
  }

  newItem.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newItem);
  writeDatabase(data);
  res.status(201).json(newItem);
});

// Update an item by ID
router.put("/individual-characters/:id", (req, res) => {
  const data = readDatabase();
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeDatabase(data);
    res.json(data[index]);
  } else {
    res.status(404).send("Item not found");
  }
});

// Delete an item by ID
router.delete("/individual-characters/:id", (req, res) => {
  const data = readDatabase();
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedItem = data.splice(index, 1);
    writeDatabase(data);
    res.json(deletedItem);
  } else {
    res.status(404).send("Item not found");
  }
});

//重新定義ID
router.post("/individual-characters/reset", (req, res) => {
    const data = readDatabase();
    data.forEach((item, index) => {
        item.id = index + 1;
    });
    writeDatabase(data);
    res.json(data);
});


module.exports = router;