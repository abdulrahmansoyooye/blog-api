const express = require("express");

// import express from "express";
const cookieParser = require("cookie-parser");
// import cookieParser from "cookie-parser";
const router = express.Router();
const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken";
router.get("/", verifyToken);
async function verifyToken(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, "secret");
    res.json(decodedToken);
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}
module.exports = router;
// export default router;
