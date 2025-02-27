import { Request, Response, NextFunction } from "express";
import { DUMMY_DATA } from "../shared/DummyData";
import CustomError from "../model/custom-error";

const getPlaceById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const placeID = req.params.pid;
    const place = DUMMY_DATA.find((place) => placeID === place.id);
    if (!place) {
      throw new CustomError("Place does not exist", 404);
    }
    res.json({ place });
  } catch (error) {
    next(error);
  }
};

const getPlaceByUserId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.params.uid;
    const place = DUMMY_DATA.filter((place) => place.creatorID === userID);
    if (place.length === 0) {
      throw new CustomError("No places found in this user!", 404);
    }
    res.json({ place });
  } catch (error) {
    next(error);
  }
};

export { getPlaceById, getPlaceByUserId };
