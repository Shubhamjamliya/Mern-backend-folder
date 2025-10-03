import mongoose from "mongoose";
import Student from "../models/Student.js";

export const searchStudents = async (req, res) => {
  try {
    const { name, email, mobile, countryId, stateId, districtId, gender } = req.query;

    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (mobile) filter.mobile = { $regex: mobile, $options: "i" };

    if (countryId && mongoose.Types.ObjectId.isValid(countryId)) {
      filter.country = new mongoose.Types.ObjectId(countryId);
    }
    if (stateId && mongoose.Types.ObjectId.isValid(stateId)) {
      filter.state = new mongoose.Types.ObjectId(stateId);
    }
    if (districtId && mongoose.Types.ObjectId.isValid(districtId)) {
      filter.district = new mongoose.Types.ObjectId(districtId);
    }

    if (gender) filter.gender = gender;

    const students = await Student.find(filter)
      .populate("country", "name")
      .populate("state", "name")
      .populate("district", "name");

    res.status(200).json(students);
  } catch (error) {
    console.error("SearchStudents Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
