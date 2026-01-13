import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  expertise: { type: String, required: true },   
  experience: { type: String, required: true }, 
  company: { type: String, required: true },
  designation: { type: String, required: true },
  location: { type: String, required: true },
  linkedin: { type: String, required: true },
  description: { type: String, required: true },
  tags: {
    type: [String],
    default: []
  },
  industryExperience: {
  type: [String], //(Fintech,SaaS)
  default: []
},

stageExpertise: {
  type: [String], //(Idea,MVP,Growth)
  default: []
},

mentoringAvailability: {
  type: String,
  enum: ["Low", "Medium", "High"],
  default: "Medium"
},

mentoringStyle: {
  type: String,  //(Hands-on,Strategic,Advisory)
},

successMetrics: {
  type: String,//(Funded startups, revenue growth)
},

startupsMentored: {
  type: Number,
  default: 0
},

exits: {
  type: Number,
  default: 0
},
  profileImage: { type: String, default: "" },
}, { timestamps: true });

const Guide = mongoose.model("Guide", mentorSchema);
export default Guide;
