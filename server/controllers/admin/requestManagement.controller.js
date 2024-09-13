const ManagerRequest = require("../../models/managerRequest.model.js");
const  {generateEmail, generateHTMLContent }= require("../../utils/generateEmail.js");

// Get all requested managers
const getAllRequestedmanagers = async (req, res) => {
  const admin = req.admin.role;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const managerRequests = await ManagerRequest.find({ status: "pending" });
    const managerRejectedRequests = await ManagerRequest.find({
      status: "rejected",
    });
    res.status(200).json({
      success: true,
      message: "success",
      managerRequests,
      managerRejectedRequests,
    });
  } catch (err) {
    console.log("Error in getAllRequestedmanagers: ", err);
  }
};

// Approve the pending manager request by id
const approvemanagerRequest = async (req, res) => {
  const admin = req.admin.role;
  const { id } = req.params;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const managerRequest = await ManagerRequest.findById(id);
    if (!managerRequest) {
      return res
        .status(404)
        .json({ success: false, message: "manager request not found" });
    }
    managerRequest.status = "approved";
    await managerRequest.save();
    const to = managerRequest.email;
    const subject = "Your request has been approved";
    const html = ` 
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Your request to become an manager has been approved</h1>
        <p>Congratulations! You can now create your account by clicking the button below:</p>
        <button style="background-color: #4CAF50; border: none; padding: 10px 20px; text-align: center; display: inline-block; margin: 10px 0; cursor: pointer; border-radius: 5px;">
            <a href="${process.env.manager_URL}" style="color: white; text-decoration: none; font-size: 16px;">Create your account</a>
        </button>
    </div>
    `;
    await generateEmail(to, subject, html);
    return res
      .status(200)
      .json({ success: true, message: "manager request approved" });
  } catch (err) {
    console.log("Error in approvemanagerRequest: ", err);
    return res.status(500).json({ message: "error", data: err });
  }
};

// Reject the pending manager request
const deletemanagerRequest = async (req, res) => {
  const admin = req.admin.role;
  const { id } = req.params;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const managerRequest = await ManagerRequest.findById(id);
    if (!managerRequest) {
      return res
        .status(404)
        .json({ success: false, message: "manager request not found" });
    }
    managerRequest.status = "rejected";
    await managerRequest.save();
    const to = managerRequest.email;
    const subject = "Your request has been rejected";
    const html = ` 
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Your request to become an manager has been rejected</h1>
        <p>We apologize for the inconvenience. Please contact us if you have any further questions.</p>
        <p>Thank you for your understanding.</p>
    </div>
    `;
    await generateEmail(to, subject, html);
    return res
      .status(200)
      .json({ success: true, message: "manager request rejected" });
  } catch (err) {
    console.log("Error in deletemanagerRequest: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Reconsider the rejected manager request
const reconsidermanagerRequest = async (req, res) => {
  const admin = req.admin.role;
  const { id } = req.params;
  if (admin !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access denied" });
  }
  try {
    const managerRequest = await ManagerRequest.findById(id);
    if (!managerRequest) {
      return res
        .status(404)
        .json({ success: false, message: "manager request not found" });
    }
    managerRequest.status = "pending";
    await managerRequest.save();
    const to = managerRequest.email;
    const subject = "Your request has been reconsidered";
    const html = ` 
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Your request to become an manager has been reconsidered</h1>
        <p>We apologize for the inconvenience. Please contact us if you have any further questions.</p>
        <p>Thank you for your understanding.</p>
    </div>
    `;
    await generateEmail(to, subject, html);
    return res
      .status(200)
      .json({ success: true, message: "manager request reconsidered" });
  } catch (err) {
    console.log("Error in reconsidermanagerRequest: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Export the functions in CommonJS format
module.exports = {
  getAllRequestedmanagers,
  approvemanagerRequest,
  deletemanagerRequest,
  reconsidermanagerRequest,
};
