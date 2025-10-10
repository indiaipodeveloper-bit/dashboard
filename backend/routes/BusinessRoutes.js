import express from "express";
import { EditBusinessDetails, getAllBusinessDetails } from "../controllers/BusinessController";

const router = express.Router()

router.get("/all-business-details", checkAdmin, getAllBusinessDetails);
router.patch("/edit-business-details", checkAdmin, EditBusinessDetails);


export {router as BusinessRotuer}