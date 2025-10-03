import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country", // Refers to Country model
      required: true,
    },
  },
  { timestamps: true }
);

const State = mongoose.model("State", stateSchema);

export default State;
