import React, { useContext, useState, useEffect } from "react";
import uploadImage from '../../assets/uploadImage.png';
import { authDataContext } from "../../context/authContext";
import { userDataContext } from "../../context/userContext";
import axios from "axios";
import { ImCross } from "react-icons/im";
const MentorApplicationForm = ({ isOpen, onClose }) => {
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [industryExperience, setIndustryExperience] = useState([]);
  const [stageExpertise, setStageExpertise] = useState([]);
  const [mentoringAvailability, setMentoringAvailability] = useState("Medium");
  const [mentoringStyle, setMentoringStyle] = useState("");
  const [successMetrics, setSuccessMetrics] = useState("");
  const [startupsMentored, setStartupsMentored] = useState("");
  const [exits, setExits] = useState("");


  useEffect(() => {
    if (userData?.email) setEmail(userData.email);
  }, [userData]);

  const handleAddMentor = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      let formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("expertise", expertise);
      formData.append("experience", experience);
      formData.append("linkedin", linkedin);
      formData.append("company", company);
      formData.append("designation", designation);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("tags", JSON.stringify(tags.split(",").map(tag => tag.trim())));
      formData.append("industryExperience", JSON.stringify(industryExperience));
      formData.append("stageExpertise", JSON.stringify(stageExpertise));
      formData.append("mentoringAvailability", mentoringAvailability);
      formData.append("mentoringStyle", mentoringStyle);
      formData.append("successMetrics", successMetrics);
      formData.append("startupsMentored", startupsMentored);
      formData.append("exits", exits);

      formData.append("profileImage", profileImage);

      let result = await axios.post(
        `${serverUrl}/api/mentor/addmentor`,
        formData,
        { withCredentials: true }
      );

      if (result.data) {
        setName("");
        setExpertise("");
        setExperience("");
        setLinkedin("");
        setCompany("");
        setDesignation("");
        setLocation("");
        setTags("");
        setDescription("");
        setIndustryExperience([]);
        setStageExpertise([]);
        setMentoringAvailability("Medium");
        setMentoringStyle("");
        setSuccessMetrics("");
        setStartupsMentored("");
        setExits("");

        setProfileImage(false);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#121829] p-6 rounded-2xl w-[100%] sm:w-[700px] max-h-[90vh] overflow-y-auto text-white relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white"
        >
          <ImCross size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add Mentor Profile
        </h2>

        <form onSubmit={handleAddMentor} className="space-y-4">

          {/* Profile Image */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold text-lg">Upload Profile Image</p>
            <label
              htmlFor="profileImage"
              className="w-[100px] h-[100px] cursor-pointer"
            >
              <img
                src={!profileImage ? uploadImage : URL.createObjectURL(profileImage)}
                className="w-full h-full rounded-full border-2 shadow-lg"
                alt=""
              />
              <input
                type="file"
                id="profileImage"
                hidden
                onChange={(e) => setProfileImage(e.target.files[0])}
                required
              />
            </label>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Full Name</p>
              <input
                type="text"
                placeholder="Eg. Rohan Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Email</p>
              <input
                type="text"
                value={email}
                readOnly
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-gray-400"
              />
            </div>

            {/* Expertise */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Expertise</p>
              <input
                type="text"
                placeholder="Eg. AI, Product, Tech"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Experience (Years)</p>
              <input
                type="text"
                placeholder="Eg. 5"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Company</p>
              <input
                type="text"
                placeholder="Eg. Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* Designation */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Designation</p>
              <input
                type="text"
                placeholder="Eg. Senior Engineer"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Location</p>
              <input
                type="text"
                placeholder="Eg. Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">LinkedIn</p>
              <input
                type="text"
                placeholder="Eg. https://linkedin.com/in/xyz"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Tags</p>
              <input
                type="text"
                placeholder="AI, SaaS, Backend"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>
            {/* industry exp */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Industry Experience</p>
              <input
                type="text"
                placeholder="Fintech, SaaS, HealthTech"
                onChange={(e) =>
                  setIndustryExperience(
                    e.target.value.split(",").map(i => i.trim())
                  )
                }
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>
            {/* stage expertise */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Stage Expertise</p>
              <input
                type="text"
                placeholder="Idea, MVP, Growth"
                onChange={(e) =>
                  setStageExpertise(
                    e.target.value.split(",").map(s => s.trim())
                  )
                }
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* mentoring availabilty */}
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-300">Mentoring Availability</p>

              <select
                value={mentoringAvailability}
                onChange={(e) => setMentoringAvailability(e.target.value)}
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-white"
              >
                <option value="">Select Availability</option>
                <option value="Low">Low (1–2 hrs/month)</option>
                <option value="Medium">Medium (3–6 hrs/month)</option>
                <option value="High">High (6+ hrs/month)</option>
              </select>
            </div>

            {/* mentoring style */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Mentoring Style</p>
              <input
                type="text"
                placeholder="Eg. Hands-on, Advisory"
                value={mentoringStyle}
                onChange={(e) => setMentoringStyle(e.target.value)}
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>
            {/* success matrix */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <p className="font-semibold">Success Metrics</p>
              <textarea
                placeholder="Eg. Number of startups scaled, raised funding, exits..."
                value={successMetrics}
                onChange={(e) => setSuccessMetrics(e.target.value)}
                className="p-2 h-[80px] bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>
            {/* startups mentored */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Startups Mentored</p>
              <input
                type="number"
                placeholder="Eg. 5"
                value={startupsMentored}
                onChange={(e) => setStartupsMentored(e.target.value)}
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* exits */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Exits (Optional)</p>
              <input
                type="number"
                placeholder="Eg. 2"
                value={exits}
                onChange={(e) => setExits(e.target.value)}
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <p className="font-semibold">Short Bio / Description</p>
              <textarea
                placeholder="Write a short bio..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="p-2 h-[100px] bg-[#1F2937] rounded-lg border border-gray-600"
              />
            </div>

          </div>

         <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-teal-500 to-blue-600"}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorApplicationForm;
