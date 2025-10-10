import express from "express";
import { AddBlog, getAllBlogs } from "../controllers/BlogsController";

export const router = express.Router() 

router.get("/all-blogs", checkAdmin, getAllBlogs);
router.post("/add-blog", checkAdmin, AddBlog);



export {router as BlogsRouter}