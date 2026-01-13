import React, { useContext, useState, useEffect } from "react";
import uploadImage from '../assets/uploadImage.png'
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import axios from "axios"
import { ImCross } from "react-icons/im";
const FoundersApplicationForm = ({ isOpen, onClose }) => {
  let { userData } = useContext(userDataContext);
  useEffect(() => {
    if (userData?.email) {
      setEmail(userData.email); // Autofill loggedin user's email
    }
  }, [userData]);
  let [profileImage, setProfileImage] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startup, setStartup] = useState("");
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [startupStage, setStartupStage] = useState("");
  const [mentorshipNeeds, setMentorshipNeeds] = useState([]);
  const [founderBackground, setFounderBackground] = useState("");
  const [founderExperienceYears, setFounderExperienceYears] = useState("");
  const [preferredMentorStyle, setPreferredMentorStyle] = useState("");
  const [mentorAvailabilityExpectation, setMentorAvailabilityExpectation] = useState("");

  let { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);


  const handleAddFounder = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("startup", startup)
      formData.append("role", role)
      formData.append("industry", industry)
      formData.append("website", website)
      formData.append("location", location)
      formData.append("teamSize", teamSize)
      // formData.append("tags", tags)
      // formData.append("tags", JSON.stringify(tags.split(",")))
      formData.append("tags", JSON.stringify(tags.split(",").map(tag => tag.trim())));
      formData.append("description", description)
      formData.append("startupStage", startupStage);
      formData.append("mentorshipNeeds", JSON.stringify(mentorshipNeeds));
      formData.append("founderBackground", founderBackground);
      formData.append("founderExperienceYears", founderExperienceYears);
      formData.append("preferredMentorStyle", preferredMentorStyle);
      formData.append("mentorAvailabilityExpectation", mentorAvailabilityExpectation);
      formData.append("profileImage", profileImage)
      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true })
      console.log(result.data)
      if (result.data) {
        setName("")
        // setEmail("")
        setStartup("")
        setRole("")
        setIndustry("")
        setWebsite("")
        setLocation("")
        setTeamSize("")
        setTags("")
        setDescription("")
        setStartupStage("");
        setMentorshipNeeds([]);
        setFounderBackground("");
        setFounderExperienceYears("");
        setPreferredMentorStyle("");
        setMentorAvailabilityExpectation("");
        setProfileImage(false)
      }

    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  }

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
          Join as a Founder
        </h2>
        <form action="" onSubmit={handleAddFounder} className="space-y-3">
          {/* profileImage */}
          <div className="w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]">
            <p className="text-[15px] md:text-[25px] font-semibold"> Upload Image</p>
            <div className="w-[100%] h-[100%] flex items-center justify-start">
              <label htmlFor="profileImage" className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]">
                <img src={!profileImage ? uploadImage : URL.createObjectURL(profileImage)} alt="" className="w-[80%] h-[80%] rounded-full shadow-2xl hover:border-[#1d1d1d] border-[2px]"></img>
                <input type="file" id='profileImage' hidden onChange={(e) => setProfileImage(e.target.files[0])} required />
              </label>
            </div>
          </div>

          {/* Inputs */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Founder's Name */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Founder's Name</p>
              <input
                type="text"
                placeholder="Eg. John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Email</p>
              <input
                type="text"
                placeholder="Eg. john@gmail.com"
                // onChange={(e) => setEmail(e.target.value)}
                readOnly
                value={email}
                // required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Startup */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Startup</p>
              <input
                type="text"
                placeholder="Eg. MyStartup"
                onChange={(e) => setStartup(e.target.value)}
                value={startup}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Role</p>
              <input
                type="text"
                placeholder="Eg. CEO / CTO"
                onChange={(e) => setRole(e.target.value)}
                value={role}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Industry */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Industry</p>
              <input
                type="text"
                placeholder="Eg. Fintech, AI"
                onChange={(e) => setIndustry(e.target.value)}
                value={industry}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Website */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Website</p>
              <input
                type="text"
                placeholder="Eg. https://startup.com"
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Location</p>
              <input
                type="text"
                placeholder="Eg. Delhi, India"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Team Size */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Team Size</p>
              <input
                type="text"
                placeholder="Eg. 5–10 People"
                onChange={(e) => setTeamSize(e.target.value)}
                value={teamSize}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Tags</p>
              <input
                type="text"
                placeholder="Eg. SaaS, AI, Web3"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none transition"
              />
            </div>
            {/* startupStage */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Startup Stage</p>

              <select
                value={startupStage}
                onChange={(e) => setStartupStage(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-white"
              >
                <option value="">Select Startup Stage</option>
                <option value="Idea">Idea</option>
                <option value="MVP">MVP</option>
                <option value="Early Revenue">Early Revenue</option>
                <option value="Growth">Growth</option>
                <option value="Scaling">Scaling</option>
              </select>
            </div>

            {/* mentorship needs */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Mentorship Needs</p>

              <input
                type="text"
                placeholder="Fundraising, Product, Growth"
                onChange={(e) =>
                  setMentorshipNeeds(
                    e.target.value.split(",").map(item => item.trim())
                  )
                }
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-white"
              />
            </div>

            {/* founder background */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Founder Background</p>

              <select
                value={founderBackground}
                onChange={(e) => setFounderBackground(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-white"
              >
                <option value="">Select Background</option>
                <option value="Tech">Tech</option>
                <option value="Non-Tech">Non-Tech</option>
              </select>
            </div>

            {/* founder experience */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Years of Experience</p>

              <input
                type="number"
                placeholder="Years of Experience"
                value={founderExperienceYears}
                onChange={(e) => setFounderExperienceYears(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-white"
              />
            </div>

            {/* preferred mentor style */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Preferred Mentor Style</p>

              <select
                value={preferredMentorStyle}
                onChange={(e) => setPreferredMentorStyle(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-white"
              >
                <option value="">Select Mentor Style</option>
                <option value="Hands-on">Hands-on</option>
                <option value="Strategic">Strategic</option>
                <option value="Friendly">Friendly</option>
              </select>
            </div>

            {/* mentor availability expectations */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Mentor Availability Expectation</p>

              <select
                value={mentorAvailabilityExpectation}
                onChange={(e) => setMentorAvailabilityExpectation(e.target.value)}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-white"
              >
                <option value="">Select Availability</option>
                <option value="Low">Low (1–2 hrs/month)</option>
                <option value="Medium">Medium (3–6 hrs/month)</option>
                <option value="High">High (6+ hrs/month)</option>
              </select>
            </div>



            {/* Description */}
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base font-semibold">Short Description / Pitch</p>
              <textarea
                placeholder="Tell us briefly about your startup..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                className="p-2 bg-[#1F2937] rounded-lg border border-gray-600 text-sm focus:border-teal-400 outline-none h-[100px] transition"
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
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoundersApplicationForm;
