import express from "express";
import { getAllMeetings } from "../controllers/AdminContoller";

const router = express.Router();

router.get("/all-meetings", checkAdmin, getAllMeetings);
router.post("/add-meetings", checkAdmin, getAllMeetings);

export { router as MeetingRotuer };
