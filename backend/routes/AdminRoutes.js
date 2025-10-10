import express, { Router } from "express";
import {
  AddNewAdmin,
  AdminLogin,
  GetAdminInfo,
  getAllAdmins,
  getAllBlogs,
  getAllBusinessDetails,
  getAllFinancialDetails,
  getAllMeetings,
  getAllNews,
  getAllUsers,
} from "../controllers/AdminContoller";
import { checkAdmin, checkSuperAdmin } from "../middleware/AdminMiddleware";

const router = express.Router();

router.get("/get-adminInfo", checkAdmin, GetAdminInfo);
router.post("/login", AdminLogin);


router.get("/all-admins", checkAdmin, getAllAdmins);
router.post("/add-admin", checkAdmin, checkSuperAdmin, AddNewAdmin);
// router.delete("/delete-admin")


router.get("/all-users", checkAdmin, getAllUsers);
router.post("/add-user", checkAdmin, getAllUsers);







export { router as AdminRouter };
