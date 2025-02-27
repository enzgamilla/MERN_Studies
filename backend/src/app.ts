import express, { Request, Response, NextFunction } from "express";
import PlaceRouter from "./routes/places-routes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

import CustomError from "./model/custom-error";

dotenv.config();

const app = express();
app.use(express.json());

interface User {
  id: string;
  username: string;
  password: string; // Hashed password
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const initializeUsers = async (): Promise<User[]> => {
  const hashedPW = await bcrypt.hash("12345", 10);
  return [
    {
      id: "us1",
      username: "rorenz",
      password: hashedPW,
    },
  ];
};

initializeUsers().then((initializedUsers) => {
  users = initializedUsers;
});

let users: User[] = [];

const SECRET_KEY = process.env.SECRET_KEY as string;

app.use("/api/places", PlaceRouter);

app.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      token,
      expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
