import express, { Request, Response, NextFunction } from "express";
import PlaceRouter from "./routes/places-routes";

import CustomError from "./model/custom-error";

const app = express();

app.use(express.json());

app.use("/api/places", PlaceRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Unknown error occured!" });
    return;
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
