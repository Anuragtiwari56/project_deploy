 
 import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  provider: { type: String, required: true },
});

export const Service = new mongoose.model("Service", serviceSchema);