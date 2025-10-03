import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State", // Refers to Country model
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country", // Refers to Country model
      required: true,
    },
  },
  { timestamps: true }
);

const District = mongoose.model("District", districtSchema);

export default District;
