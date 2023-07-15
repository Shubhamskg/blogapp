//TODO
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const deleteUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const userId = userInfo.id;
      const q = "DELETE FROM user WHERE `id` = ?";
  
      db.query(q, [userId], (err, data) => {
        if (err) return res.status(403).json("You can delete only your account!");
  
        return res.json("Account has been deleted!");
      });
    });
  };
  
  export const updateUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const userId = userInfo.id;
      const q =
        "UPDATE user SET `username`=?,`email`=?,`password`=?,`img`=? WHERE `id` = ?";
  
      const values = [req.body.username, req.body.email, hash,req.body.img];
  
      db.query(q, [...values, userId], (err, data) => {
        if (err) return res.status(500).json(err);
      });
      const qu = "SELECT * FROM user WHERE id = ?";
        db.query(qu, [userId], (err, datas) => {
          if (err) return res.status(500).json(err);
          const { password, ...other } = datas[0];
          return res.status(200).json(other)
        });
    });
  };