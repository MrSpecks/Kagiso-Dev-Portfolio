// backend/server.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
import ragRouter from "./routes/ragRoutes.js";
app.use("/api", ragRouter);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend server is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});