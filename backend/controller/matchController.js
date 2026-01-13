import Product from "../model/newModelFounder.js";
import Guide from "../model/newModelMentor.js";
// import { HfInference } from "@huggingface/inference";

export const calculateMatch = async (req, res) => {
  try {
    const { startupId, mentorId } = req.body;

    const startup = await Product.findById(startupId);
    const mentor = await Guide.findById(mentorId);

    if (!startup || !mentor) {
      return res.status(404).json({ message: "Startup or Mentor not found" });
    }

    let score = 0;
    if (mentor.industryExperience.map(i => i.toLowerCase()).includes(startup.industry.toLowerCase())) {
      score += 30;
    }

    if (mentor.stageExpertise.includes(startup.startupStage)) {
      score += 20;
    }

    if (startup.preferredMentorStyle.toLowerCase() === mentor.mentoringStyle?.toLowerCase()) score += 20;
    if (startup.mentorAvailabilityExpectation.toLowerCase() === mentor.mentoringAvailability?.toLowerCase()) score += 10;

    if (parseInt(startup.founderExperience.years) <= parseInt(mentor.experience)) score += 20;

    if (score > 100) score = 100;

    res.json({ matchPercent: score, startup, mentor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const mentorStrengthController = async (req, res) => {
  try {
    const { startupId, mentorId } = req.body;

    const startup = await Product.findById(startupId);
    const mentor = await Guide.findById(mentorId);

    if (!startup || !mentor) {
      return res.status(404).json({ message: "Startup or Mentor not found" });
    }

    const insights = [];
    if (
      mentor.industryExperience?.some(
        (i) => i.toLowerCase() === startup.industry.toLowerCase()
      )
    ) {
      insights.push({
        type: "positive",
        text: `Strong industry alignment in ${startup.industry}`
      });
    } else {
      insights.push({
        type: "warning",
        text: "Limited direct industry exposure"
      });
    }
    if (mentor.stageExpertise?.includes(startup.startupStage)) {
      insights.push({
        type: "positive",
        text: `Expert in ${startup.startupStage} stage startups`
      });
    } else {
      insights.push({
        type: "warning",
        text: "Stage experience may be limited"
      });
    }

    if (
      mentor.mentoringStyle?.toLowerCase() ===
      startup.preferredMentorStyle?.toLowerCase()
    ) {
      insights.push({
        type: "positive",
        text: "Mentoring style matches founder expectations"
      });
    }

    if (
      mentor.mentoringAvailability?.toLowerCase() ===
      startup.mentorAvailabilityExpectation?.toLowerCase()
    ) {
      insights.push({
        type: "positive",
        text: "Availability aligns with startup needs"
      });
    } else {
      insights.push({
        type: "warning",
        text: "Availability mismatch — scheduling may be challenging"
      });
    }

    if (
      Number(mentor.experience) >=
      Number(startup.founderExperience?.years)
    ) {
      insights.push({
        type: "positive",
        text: "Mentor has significantly higher experience than founder"
      });
    }

    startup.mentorshipNeeds?.forEach((need) => {
      if (
        mentor.expertise?.toLowerCase().includes(need.toLowerCase())
      ) {
        insights.push({
          type: "positive",
          text: `Strong support for ${need}`
        });
      }
    });

    res.json({ insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};