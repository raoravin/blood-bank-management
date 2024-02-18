import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import session from "express-session";
import MongoStore from 'connect-mongo'
import usersRoutes from "./routes/authRoutes.js"
import inventoryRoutes from "./routes/inventoryRoute.js";



//rest object
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080; // Use the specified port or default to 8080

app.use(session({
  name: 'todo',
  secret: process.env.SESS_SECRET,
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 7,
  resave: false,//don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
  }),
  cookie : {
      maxAge: 1000* 60 * 60 *24 * 365
  },
}));


app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", usersRoutes)
app.use("/api/v1/inventory", inventoryRoutes)


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
