import 'dotenv/config';
import express from "express";
import frameRoutes from "./frames.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/frames", frameRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
