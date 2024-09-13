const express = require("express");
const {
  getAllRequestedmanagers,
  approvemanagerRequest,
  deletemanagerRequest,
  reconsidermanagerRequest,
} = require("../../../controllers/admin/requestManagement.controller");

const managerRequestRouter = express.Router();

managerRequestRouter.get("/list", getAllRequestedmanagers);
managerRequestRouter.put("/:id/accept", approvemanagerRequest);
managerRequestRouter.delete("/:id", deletemanagerRequest);
managerRequestRouter.put("/reconsider/:id", reconsidermanagerRequest);

module.exports = managerRequestRouter;
