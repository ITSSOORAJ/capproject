const express = require('express');
const turfRouter = express.Router();

// Define your routes here
turfRouter.get('/', (req, res) => {
    res.send('Turf route');
});

module.exports = { turfRouter }; // Ensure it's exported as an object
