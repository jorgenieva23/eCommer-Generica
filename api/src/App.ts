import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import { auth } from "express-openid-connect";

const app = express();

app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(router);

export default app;
