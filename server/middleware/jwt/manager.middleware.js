const jwt = require("jsonwebtoken");

const verifyManagerToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Invalid authorization" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Invalid token, authorization denied",
      });
    }
    req.manager = decoded;
    if (req.manager.role !== "manager") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = verifyManagerToken;
