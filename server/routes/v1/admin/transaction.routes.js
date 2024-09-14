const express = require("express");
const { getAllTransaction } = require("../../../controllers/admin/transaction.controller");
const transactionRouter = express.Router();

transactionRouter.get("/", getAllTransaction);

module.exports = transactionRouter;
