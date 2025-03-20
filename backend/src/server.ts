import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import compression from "compression";

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

server.listen(5000, () => {
  console.log("Server is running on port 5000 🚀");
});
