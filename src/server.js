import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.use("/api", apiRoutes);

const server = app.listen(3001, () => {
  console.log("Server running on port 3001");
});
