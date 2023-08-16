const express = require("express");

// import express from "express";
const UserModel = require("../models/User.js");
// import { UserModel } from "../models/User.js";
const bcrypt = require("bcrypt");
// import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user == null) {
      res.status(404).json(`No user has the name ${username}`);
    }

    const IsPasswordValid = await bcrypt.compare(password, user.password);
    if (IsPasswordValid) {
      const token = jwt.sign({ username, id: user._id }, "secret", {});

      res.send({ token, username, id: user._id });
    } else {
      res.status(401).json(` The password you provided is incorrect`);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
// export default router;
