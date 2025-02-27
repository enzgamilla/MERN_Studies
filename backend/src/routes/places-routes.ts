import express from "express";
import {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
} from "../controllers/place-controllers";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlaceByUserId);

router.post("/", createPlace);

export default router;
