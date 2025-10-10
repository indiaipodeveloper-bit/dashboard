import express from "express";
import { EditFinancialDetails, getAllFinancialDetails } from "../controllers/FinancialController";


const router = express.Router()


router.get("/all-financials", checkAdmin, getAllFinancialDetails);
router.patch("/edit-financials", checkAdmin, EditFinancialDetails);


export {router as FinancialRouter}