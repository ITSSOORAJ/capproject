const express = require('express');
const verifyAdminToken = require('../../../middleware/jwt/admin.middleware')
const adminRouter = express.Router();
module.exports = adminRouter;