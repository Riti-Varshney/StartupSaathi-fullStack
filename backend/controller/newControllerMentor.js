import uploadOnCloudinary from '../config/cloudinary.js';
import Guide from '../model/newModelMentor.js';
import path from 'path';
export const addMentor = async (req, res) => {
    try {
        let { name, 
            email, 
            expertise, 
            experience, 
            company, 
            designation,
            location, 
            linkedin, 
            description, 
            tags,
            industryExperience,
            stageExpertise,
            mentoringAvailability,
            mentoringStyle,
            successMetrics,
            startupsMentored,
            exits
        } = req.body;

        let profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);

        let mentorData = {
            name,
            email,
            expertise,
            experience,
            company,
            designation,
            location,
            linkedin,
            description,
            tags: tags ? JSON.parse(tags) : [],
            industryExperience: industryExperience ? JSON.parse(industryExperience) : [],
            stageExpertise: stageExpertise ? JSON.parse(stageExpertise) : [],
            mentoringAvailability,
            mentoringStyle,
            successMetrics,
            startupsMentored,
            exits,
            profileImage
        };

        const guide = await Guide.create(mentorData);
        return res.status(201).json(guide);

    } catch (error) {
        console.log("AddMentor Error");
        return res.status(500).json({ message: `Add Mentor Error ${error}` });
    }
};

export const listMentors = async (req, res) => {
    try {
        const mentors = await Guide.find({});
        return res.status(200).json(mentors);
    } catch (error) {
        console.log("Listing Mentor Error");
        return res.status(500).json({ message: `Listing Mentor Error ${error}` });
    }
};

export const removeMentor = async (req, res) => {
    try {
        let { id } = req.params;
        const mentor = await Guide.findByIdAndDelete(id);
        return res.status(200).json(mentor);
    } catch (error) {
        console.log("Remove Mentor Error");
        return res.status(500).json({ message: `Remove Mentor Error ${error}` });
    }
};

export const listMyMentors = async (req, res) => {
    try {
        let userEmail = req.query.email;
        // ?email=vsjd@gmail.com -> query part
        // email -> key // vsjd@gmail.com ->value
        const mentors = await Guide.find({ email: userEmail });
        return res.status(200).json(mentors);
    } catch (error) {
        console.log("Listing My Mentors Error");
        return res.status(500).json({ message: `Error ${error}` });
    }
};

export const updateMentor = async (req, res) => {
    try {
        const updateData = {};
        Object.keys(req.body).forEach((key) => {
            if (key === "tags" || key === "industryExperience" || key === "stageExpertise") {
                updateData[key] = JSON.parse(req.body[key]);
            } else {
                updateData[key] = req.body[key];
            }
        });

        if (req.files?.profileImage) {
            const localPath = path.resolve(req.files.profileImage[0].path);
            const uploadedUrl = await uploadOnCloudinary(localPath);
            updateData.profileImage = uploadedUrl;
        }

        const updated = await Guide.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
        // $set->set obly the updtd fields //new->returns data after updtion
        res.status(200).json(updated);
    } catch (err) {
        console.error("Update Mentor Error:", err);
        res.status(500).json({ message: "Mentor update failed" });
    }
};
