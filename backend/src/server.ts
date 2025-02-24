import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import https from "https";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

interface User {
  id: string;
  username: string;
  password: string; // Hashed password
}

const options = {
  key: fs.readFileSync("certs/localhost-key.pem"),
  cert: fs.readFileSync("certs/localhost.pem"),
};

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // If using cookies/auth headers
  })
);

// Define the User interface
const initializeUsers = async (): Promise<User[]> => {
  const hashedPW = await bcrypt.hash("12345", 10);
  return [
    {
      id: "us1",
      username: "rorenz",
      password: hashedPW, // ✅ Correctly hashed password
    },
  ];
};

// Variable to store users after initialization
let users: User[] = [];

const SECRET_KEY = process.env.SECRET_KEY as string;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is missing in .env file");
}

// Initialize users before starting the server
initializeUsers().then((initializedUsers) => {
  users = initializedUsers;
  console.log("Users initialized:", users);
});
// Login endpoint
app.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find((u) => u.username === username);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    console.log(user.password, password);
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      token,
      expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
https.createServer(options, app).listen(5001, () => {
  console.log("HTTPS server running on port 5001");
});
