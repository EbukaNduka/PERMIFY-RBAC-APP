// app.js

// Import required modules
const express = require('express');
const permify = require("@permify/permify-node");
const authMiddleware = require('./auth'); // Import the auth middleware

// Create Express app
const app = express();

// Define custom middleware to populate userInfo
app.use((req, res, next) => {
  // Simulate user authentication and populate userInfo
  req.userInfo = {
    id: req.params.id // Extract the id from request params
    // Add other user information if required
  };
  next();
});

// Define routes

// Route for '/users/:id' where you want to enforce permission check
app.get('/users/viewFiles/:id', authMiddleware('view_files'), (req, res) => {
  // If middleware allows the request to pass through, handle the route logic here
  if (req.authorized === 'authorized') {
    res.send('You have access to this user route');
  } else {
    res.status(403).send('You are not authorized to access this user resource');
  }
});

// Route for '/admin/:id' where you want to enforce permission check
app.get('/admin/:id', authMiddleware('delete_vendor_file'), (req, res) => {
  // If middleware allows the request to pass through, handle the route logic here
  if (req.authorized === 'authorized') {
    res.send('You have access to this admin route');
  } else {
    res.status(403).send('You are not authorized to access this admin resource');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});