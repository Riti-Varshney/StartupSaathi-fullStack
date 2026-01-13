import uploadOnCloudinary from '../config/cloudinary.js'
import Product from '../model/newModelFounder.js'
import path from 'path';
export const addProduct = async (req, res) => {
    try {
        let { name, email, startup, role, industry, website, location, teamSize, description, tags, startupStage,
            mentorshipNeeds,
            founderBackground,
            founderExperienceYears,
            preferredMentorStyle,
            mentorAvailabilityExpectation } = req.body
        let profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
        let productData = {
            // userId: req.user._id, 
            name,
            email,
            startup,
            role,
            industry,
            website,
            location,
            teamSize,
            description,
            tags: tags ? JSON.parse(tags) : [],
            startupStage,

            mentorshipNeeds: mentorshipNeeds
                ? JSON.parse(mentorshipNeeds)
                : [],

            founderExperience: {
                background: founderBackground,
                years: Number(founderExperienceYears)
            },

            preferredMentorStyle,
            mentorAvailabilityExpectation,

            profileImage
        }
        const product = await Product.create(productData)
        return res.status(201).json(product)

    }
    catch (error) {
        console.log("AddFounder Error");
        return res.status(500).json({ message: `Add Founder Error ${error}` })
    }
}
export const listProduct = async (req, res) => {
    try {
        const product = await Product.find({});
        return res.status(200).json(product)
    }
    catch (error) {
        console.log("Listing Founder Error");
        return res.status(500).json({ message: `Listing Founder Error ${error}` })
    }
}
export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        return res.status(200).json(product)
    }
    catch (error) {
        console.log("Remove Founder Error");
        return res.status(500).json({ message: `Remove Founder Error ${error}` })

    }

}
export const listMyProducts = async (req, res) => {
    // console.log(req.body)
    // console.log(req.user)
    console.log(req.query.email)
    try {
        let userEmail = req.query.email;
        //  console.log("USER FROM TOKEN = ", req.user);
        const products = await Product.find({ email: userEmail });
        return res.status(200).json(products);
    } catch (error) {
        console.log("Listing My Startup Error");
        return res.status(500).json({ message: `Error ${error}` })
    }
}

export const updateProduct = async (req, res) => {
  try {
    const updateData = {};
    Object.keys(req.body).forEach((key) => {
      if (key === "founderExperience") {
        updateData.founderExperience = JSON.parse(req.body[key]);
      } else if (key === "tags" || key === "mentorshipNeeds") {
        updateData[key] = JSON.parse(req.body[key]);
      } else {
        updateData[key] = req.body[key];
      }
    });

    if (req.files?.profileImage) {
  const localPath = path.resolve(req.files.profileImage[0].path);
  // console.log("absolute path", localPath);
  const uploadedUrl = await uploadOnCloudinary(localPath);
  // console.log("cloudinary url:", uploadedUrl);
  updateData.profileImage = uploadedUrl; 
}
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Founder Error:", err);
    res.status(500).json({ message: "Image update failed" });
  }
};