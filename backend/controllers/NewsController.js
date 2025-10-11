import { News } from "../models/NewsSchema.js";

// list of all news
export async function getAllNews(req, res) {
  console.log("inside get all news")
  try {
    const allNews = await News.find({});
    console.log("sending res after success")
    return res.status(200).json({ allNews });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function AddNews(req, res) {
  console.log("req rec on add news")
  try {
    const { title, description, subdescription, categories } = req.body;
    const news = await News.create({
      title,
      description,
      subdescription,
      categories,
    });
    console.log(news);
    return res.status(200).json({news})
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
