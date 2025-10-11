import { News } from "../models/NewsSchema.js";

// list of all news
export async function getAllNews(req, res) {
  try {
    const allNews = await News.find({});
    return res.statu(200).json({ allNews });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}