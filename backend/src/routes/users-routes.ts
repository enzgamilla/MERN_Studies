import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/users", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("This route works");
    res.json({ message: "This route works" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
});

export default router;
