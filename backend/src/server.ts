import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import compression from "compression";
import { config } from "dotenv";

config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (_request: Request, response: Response) => {
  response.json({ message: "Hello World" });
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} 🚀`);
});
