// models/FormEntry.js
import mongoose from "mongoose";

const FormEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const FormEntry = mongoose.model("FormEntry", FormEntrySchema);
export default FormEntry;
