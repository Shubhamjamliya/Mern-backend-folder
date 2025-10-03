import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District" },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
