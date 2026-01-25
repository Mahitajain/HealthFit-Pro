import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import framesRouter from "./frames.js";

const app = express();

// Needed for JSON requests
app.use(express.json());

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// SERVE FRONTEND
// ===============================
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ===============================
// API ROUTES
// ===============================
app.use("/frames", framesRouter);

// ===============================
// HEALTH CHECK (OPTIONAL)
// ===============================
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    project: "HealthFit-Pro"
  });
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
