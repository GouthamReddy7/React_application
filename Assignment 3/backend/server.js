const express = require('express');
const mongoose = require('./db');
const cors = require('cors'); 
const inventoryRouter = require('./InventoryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

// Routes
app.use('/inventory', inventoryRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
