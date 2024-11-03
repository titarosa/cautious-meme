const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../client/dist'))); // Adjust path based on your directory structure

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use your HTML routes
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
