import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  startup: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  industry: { type: String, required: true },
  website: { type: String, required: true },
  location: { type: String, required: true },
  teamSize: { type: String, required: true },
  description: { type: String, required: true },
  tags: {
    type: [String],
    default: []
  },
  startupStage: {
    type: String,
    enum: ["Idea", "MVP", "Early Revenue", "Growth", "Scaling"],
    required: true
  },

  mentorshipNeeds: {
    type: [String], // (Fundraising,Product,Growth,etc)
    default: []
  },

  founderExperience: {
    type: {
      background: {
        type: String, 
        enum: ["Tech", "Non-Tech"],
        required: true
      },
      years: {
        type: Number,
        required: true
      }
    },
    required: true
  },

  preferredMentorStyle: {
    type: String,
    enum: ["Hands-on", "Strategic", "Friendly"],
    required: true
  },

  mentorAvailabilityExpectation: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true
  },
  profileImage: { type: String, default: "" },
}, { timestamps: true })
const Product = mongoose.model("Product", productSchema)
export default Product;