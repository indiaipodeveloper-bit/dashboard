import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/dbconnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AdminRouter } from "./routes/AdminRoutes.js";
import { BlogsRouter } from "./routes/BlogsRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));


app.use("/admin",AdminRouter,BlogsRouter)


connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log("App runnin on PORT", PORT);
    });
  })
  .catch((er) => {
    console.log(er);
  });
