import { Financials } from "../models/FinancialDetails";



// Business details for the ipo eligibility
export async function getAllFinancialDetails(req, res) {
  try {
    const allBlogs = await Financials.find({}).populate("createdBy");
    return res.statu(200).json({ allBlogs });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}


export async function EditFinancialDetails(req, res) {
  try {
    const { gstNumber,turnOverYear,turnOver,patYear,PAT } = req.body;
    const updateFields = {};
    if (turnOverYear) updateFields.contactNo = turnOverYear;
    if (turnOver) updateFields.companyType = turnOver;
    if (patYear) updateFields.companyType = patYear;
    if (PAT) updateFields.companyType = PAT;

    const editedFinancialDetails = await Financials.findOneAndUpdate(
      { gstNumber },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!editedFinancialDetails) {
      return res.status(404).send("Financials not found");
    }
    return res.statu(200).json({ editedFinancialDetails });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}