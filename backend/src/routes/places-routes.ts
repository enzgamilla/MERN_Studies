import express from "express";
import {
  getPlaceById,
  getPlaceByUserId,
} from "../controllers/place-controllers";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlaceByUserId);

export default router;
