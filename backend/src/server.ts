import express, { Application} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import compression from "compression";
import { config } from "dotenv";
import connectDB from "./db";
import authRoutes from "./routes/auth";

config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

connectDB();

app.use("/api/auth", authRoutes);

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} 🚀`);
});
