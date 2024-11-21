require('dotenv').config();
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// GET: Retrieve all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET: Retrieve a single item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send('Item not found');
  }
  res.json(item);
});

// POST: Add a new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT: Update an item
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send('Item not found');
  }
  item.name = req.body.name;
  res.json(item);
});

// DELETE: Remove an item
app.delete('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }
  items.splice(itemIndex, 1);
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000; // ใช้พอร์ตจาก Environment Variable หรือ fallback เป็น 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});