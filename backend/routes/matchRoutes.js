import express from "express";
import { calculateMatch , mentorStrengthController} from "../controller/matchController.js";
const router = express.Router();

router.post("/startup-mentor", calculateMatch);
router.post(
  "/mentor-strengths",
  mentorStrengthController
);


export default router;
