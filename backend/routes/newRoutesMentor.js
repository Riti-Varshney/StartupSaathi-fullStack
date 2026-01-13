import express from 'express';
import { 
    addMentor, 
    listMentors, 
    removeMentor, 
    listMyMentors,
    updateMentor
} from '../controller/newControllerMentor.js';

import upload from '../middleware/multer.js';
import isAuth from '../middleware/isAuth.js';
import Guide from '../model/newModelMentor.js';
let mentorRoutes = express.Router();

mentorRoutes.post(
  "/addmentor",
  isAuth,
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  addMentor
);
mentorRoutes.get("/list", listMentors);
mentorRoutes.get("/my-mentors", isAuth, listMyMentors);
mentorRoutes.post("/remove/:id", isAuth, removeMentor);
mentorRoutes.get("/single/:id", isAuth, async (req, res) => {
  const mentor = await Guide.findById(req.params.id);
  res.json(mentor);
});
//used patch for specific changes made in form
mentorRoutes.patch(
  "/update/:id",
  isAuth,
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  updateMentor
);

export default mentorRoutes;
