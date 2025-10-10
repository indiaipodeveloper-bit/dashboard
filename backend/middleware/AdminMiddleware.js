import { getUser } from "../services/Auth";

export function checkSuperAdmin(req, res, next) {
  try {
    const token = req.cookies.admincookie;
    if (!token) {
      return res.status(400).send("You're not Logged In");
    }
    const user = getUser(token);
    if (!user) {
      return res.status(400).send("Not Authenticated");
    }

    if(user.adminRole == "SuperAdmin"){
        req.admin = user
       next();
    }
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
export function checkAdmin(req, res, next) {
  try {
    const token = req.cookies.admincookie;
    if (!token) {
      return res.status(400).send("You're not Logged In");
    }
    const user = getUser(token);
    if (!user) {
      return res.status(400).send("Not Authenticated");
    }

    if(user.adminRole == "Admin" || user.adminRole == "SuperAdmin"){
        req.admin = user
       next();
    }
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}


