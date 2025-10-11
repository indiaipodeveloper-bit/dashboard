import { Business } from "../models/BusinessDetails.js";

// Business details for the ipo eligibility
export async function getAllBusinessDetails(req, res) {
  try {
    const allBlogs = await Business.find({}).populate("createdBy");
    return res.statu(200).json({ allBlogs });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

// edit the business details 
export async function EditBusinessDetails(req, res) {
  try {
    const { businessName, companyType, contactNo } = req.body;
    const updateFields = {};

    if (businessName) updateFields.name = businessName;
    if (companyType) updateFields.companyType = companyType;
    if (contactNo) updateFields.contactNo = contactNo;

    const editedBusinessDetails = await Business.findOneAndUpdate(
      { contactNo },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!editedBusinessDetails) {
      return res.status(404).send("Business not found");
    }
    return res.statu(200).json({ editedBusinessDetails });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}