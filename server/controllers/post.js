import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPost = (req, res) => {
  const q = `
    SELECT p.id, p.title, p.desc, p.img, p.cat, p.date, u.username, u.img AS userImg 
    FROM posts p 
    JOIN user u ON p.uid = u.id 
    WHERE p.id = ?
  `;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json(data[0]);
  });
};

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE id = ? AND uid = ?";
    const postId = req.params.id;
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      postId,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been updated.");
    });
  });
};
