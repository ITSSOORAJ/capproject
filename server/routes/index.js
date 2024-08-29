const express = require('express');
const v1Router = require('./v1/index.js');

const rootRouter = express.Router();

rootRouter.use("/v1", v1Router);

// Export rootRouter as default
module.exports = rootRouter;