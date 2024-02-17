import express from "express";
import testRoute from "./routes/testRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";

//rest object
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080; // Use the specified port or default to 8080

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route test
app.use("/api/v1", testRoute);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error("Error starting server:", error.message);
  }
});
