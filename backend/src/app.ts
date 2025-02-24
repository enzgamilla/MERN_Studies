import express, { Request, Response, NextFunction } from "express";
import PlaceRouter from "./routes/places-routes";
import UserRouter from "./routes/users-routes";

const app = express();

app.use(express.json());
app.use(PlaceRouter);
app.use(UserRouter);

// Basic Server setup
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    res.status(401).json({ error: "Something went wrong!" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
