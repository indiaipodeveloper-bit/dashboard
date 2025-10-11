import { Meetings } from "../models/MeetingSchema.js";

export async function AddNewMeeting(req, res) {
  console.log("inside meeting controller");
  try {
    console.log(req.body);
    const { name, date, time, fees } = req.body;
    const existingMeeting = await Meetings.findOne({
      $and: [{ date }, { time }],
    });
    if (existingMeeting) {
      return res.statu(400).send("Meeting Already Exist");
    }
    console.log("creating meeting");
    const meeting = await Meetings.create({
      name,
      date,
      time,
      fees,
      createdBy:req.user.id
    });
    console.log(meeting);
    console.log("sending res after succ");
    return res.status(200).json({ meeting });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

// all the scheduled Meetings
export async function getAllMeetings(req, res) {
  try {
    const allMeetings = await Meetings.find({}).populate("createdBy");
    console.log(allMeetings);
    return res.status(200).json({ allMeetings });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
