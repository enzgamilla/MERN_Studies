import express, { Request, Response, NextFunction } from "express";
import { DUMMY_DATA } from "../shared/DummyData";

const router = express.Router();

router.get("/:pid", (req: Request, res: Response, next: NextFunction) => {
  try {
    const placeID = req.params.pid;
    const place = DUMMY_DATA.find((place) => placeID === place.id);
    if (!place) {
      res.status(404).json({ error: "Place not found!" });
      return;
    }
    res.json({ place });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
});

router.get("/user/:uid", (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.params.uid;
    const place = DUMMY_DATA.filter((place) => place.creatorID === userID);
    if (place.length === 0) {
      res.status(404).json({ error: "No places found for this user" });
      return;
    }
    res.json({ place });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
});

export default router;
