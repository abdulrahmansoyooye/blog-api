const express = require("express");

const PostModel = require("../models/Posts.js");
// import { PostModel } from "../models/Posts.js";
const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken";
const multer = require("multer");
// import multer from "multer";
const router = express.Router();
const fs = require("fs");
// import fs from "fs";
// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  const token = await req.headers.authorization;
  const decodedToken = jwt.verify(token, "secret");
  const { title, summary, content } = req.body;

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const savedPost = await PostModel.create({
    title,
    summary,
    content,
    image: newPath,
    author: decodedToken.username,
  });

  res.send(savedPost);
});
router.get("/", async (req, res) => {
  const savedPost = await PostModel.find({}).limit(20);

  res.send(savedPost.reverse());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);

  res.send(post);
});
module.exports = router;
// export default router;
