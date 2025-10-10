import express from "express";
import { getAllNews } from "../controllers/AdminContoller";

export const router = express.Router()


router.get("/all-news", checkAdmin, getAllNews);
router.post("/add-news", checkAdmin,);


export {router as NewsRouter}