
export async function AddNewMeeting(req,res) {
  try {
    const {name,date,time,fees} = req.body;
    const existingMeeting = await Meetings.findOne({$and:[{date},{time}]})
    if(existingMeeting){
      return res.statu(400).send("Meeting Already Exist")
    }
    const meeting = await Meetings.create({
      name,date,time,fees
    })

    return res.statu(200).json({meeting})

  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
  
}

// all the scheduled Meetings
export async function getAllMeetings(req, res) {
  try {
    const allBlogs = await Meetings.find({}).populate("createdBy");
    return res.statu(200).json({ allBlogs });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

// list of all news
export async function getAllNews(req, res) {
  try {
    const allNews = await News.find({});
    return res.statu(200).json({ allNews });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}