import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import passport from "passport";
import 'dotenv/config';

//new code
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({
  origin: process.env.CLIENT_BASE_URL,
  credentials: true
}));


// Defining the public directory
// app.use(express.static(__dirname + "/public"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/user", routes.userRoutes);
app.use("/posts", routes.postRoutes);
app.use("/comments", routes.commentRoutes);
app.use("/quiz", routes.quizRoutes);
app.use("/company", routes.companyRoutes);

// Home Route
app.get("/", cors(), async (req, res) => {
  res.status(200).json({ name: "Interview Experience API" });
});

// Not found route
app.get("*", cors(), (req, res) => {
  return res.status(404).json({ message: "API URL is not valid" });
});

export default app;
