import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male" },
  languages: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
