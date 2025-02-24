import express, { Request, Response, NextFunction } from "express";
import PlaceRouter from "./routes/places-routes";
import UserRouter from "./routes/users-routes";

const app = express();

app.use(express.json());

app.use("/api/places", PlaceRouter);
app.use(UserRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
