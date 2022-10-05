import mongoose, { Schema } from "mongoose";
import CPPEvent from "../schema/CPPEvent";

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  room: { type: String, required: true },
  building: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<CPPEvent>("Event", EventSchema);
