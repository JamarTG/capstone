import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createServer } from "http";
import compression from "compression";
import { config } from "dotenv";
import connectDB from "./connectDB";
import authRoutes from "./routes/auth";
import settingsRoutes from "./routes/settings";
import quizRoutes from "./routes/quiz";
import cookieParser from "cookie-parser";

config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/quiz", quizRoutes);

const server = createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} 🚀`);
});