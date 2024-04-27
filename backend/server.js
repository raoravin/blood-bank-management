import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import session from "express-session";
import MongoStore from 'connect-mongo'
import usersRoutes from "./routes/authRoutes.js"
import inventoryRoutes from "./routes/inventoryRoute.js";
import bloodGroupRoute from "./routes/analyticRoute.js"
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import emailVerification from "./routes/emailVeifyRoute.js"



//rest object
const app = express();
app.use(cookieParser())
dotenv.config();
const PORT = process.env.PORT || 8080; // Use the specified port or default to 8080

app.use(session({
  name: 'blood_bank',
  secret: process.env.SESS_SECRET,
  httpOnly: true,
  // secure: true,                           
  maxAge: 1000 * 60 * 60 * 7,
  resave: false,//don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
  }),
  cookie : {
      maxAge: 1000* 60 * 60 *24 * 365,
  },
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');  // Replace with your frontend's origin
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", usersRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/analytics", bloodGroupRoute);
app.use("/api/v1/email", emailVerification);


// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});




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
