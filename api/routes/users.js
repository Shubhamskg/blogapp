import express from "express";
import {
  deleteUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.delete("/", deleteUser);
router.put("/", updateUser);

export default router;
