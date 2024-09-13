const  express = require("express");
const {
  getAllManagers,
  getTurfByManagerId,
} = require("../../../controllers/admin/managerMangement.controller");

const managerManagementRouter = express.Router();

managerManagementRouter.get("/list", getAllManagers);
managerManagementRouter.get("/:id/turf", getTurfByManagerId);

module.exports = managerManagementRouter;
