import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { authDataContext } from "../../context/authContext"

const EditMentorForm = ({ isOpen, onClose, data }) => {
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [industryExperience, setIndustryExperience] = useState("");
  const [stageExpertise, setStageExpertise] = useState("");
  const [mentoringAvailability, setMentoringAvailability] = useState("Medium");
  const [mentoringStyle, setMentoringStyle] = useState("");
  const [successMetrics, setSuccessMetrics] = useState("");
  const [startupsMentored, setStartupsMentored] = useState(0);
  const [exits, setExits] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    if (data) {
      setOriginalData(data);
      setName(data.name || "");
      setEmail(data.email || "");
      setExpertise(data.expertise || "");
      setExperience(data.experience || "");
      setCompany(data.company || "");
      setDesignation(data.designation || "");
      setLocation(data.location || "");
      setLinkedin(data.linkedin || "");
      setDescription(data.description || "");
      setTags(data.tags?.join(", ") || "");
      setIndustryExperience(data.industryExperience?.join(", ") || "");
      setStageExpertise(data.stageExpertise?.join(", ") || "");
      setMentoringAvailability(data.mentoringAvailability || "Medium");
      setMentoringStyle(data.mentoringStyle || "");
      setSuccessMetrics(data.successMetrics || "");
      setStartupsMentored(data.startupsMentored || 0);
      setExits(data.exits || 0);
      setPreviewImage(data.profileImage || "");
    }
  }, [data]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // --- Build update payload ---
  const buildUpdatePayload = () => {
    const payload = {};
    if (name !== originalData.name) payload.name = name;
    if (email !== originalData.email) payload.email = email;
    if (expertise !== originalData.expertise) payload.expertise = expertise;
    if (experience !== originalData.experience) payload.experience = experience;
    if (company !== originalData.company) payload.company = company;
    if (designation !== originalData.designation) payload.designation = designation;
    if (location !== originalData.location) payload.location = location;
    if (linkedin !== originalData.linkedin) payload.linkedin = linkedin;
    if (description !== originalData.description) payload.description = description;
    if (mentoringAvailability !== originalData.mentoringAvailability) payload.mentoringAvailability = mentoringAvailability;
    if (mentoringStyle !== originalData.mentoringStyle) payload.mentoringStyle = mentoringStyle;
    if (successMetrics !== originalData.successMetrics) payload.successMetrics = successMetrics;
    if (startupsMentored !== originalData.startupsMentored) payload.startupsMentored = Number(startupsMentored);
    if (exits !== originalData.exits) payload.exits = Number(exits);

    const parsedTags = tags.split(",").map(t => t.trim()).filter(Boolean);
    if (JSON.stringify(parsedTags) !== JSON.stringify(originalData.tags)) payload.tags = parsedTags;

    const parsedIndustry = industryExperience.split(",").map(t => t.trim()).filter(Boolean);
    if (JSON.stringify(parsedIndustry) !== JSON.stringify(originalData.industryExperience)) payload.industryExperience = parsedIndustry;

    const parsedStages = stageExpertise.split(",").map(t => t.trim()).filter(Boolean);
    if (JSON.stringify(parsedStages) !== JSON.stringify(originalData.stageExpertise)) payload.stageExpertise = parsedStages;

    if (profileImage) payload.profileImage = profileImage;

    return payload;
  };

  // --- Handle update ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = buildUpdatePayload();
    if (Object.keys(payload).length === 0) {
      alert("No changes made!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.patch(`${serverUrl}/api/mentor/update/${data._id}`, formData, { withCredentials: true });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Update failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-[#121829] w-[95%] md:w-[700px] p-6 rounded-2xl text-white border border-gray-700 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition"
        >
          <ImCross size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Mentor Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Mentor Name" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
            <input value={expertise} onChange={e => setExpertise(e.target.value)} placeholder="Expertise" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
            <input value={experience} onChange={e => setExperience(e.target.value)} type="number" placeholder="Experience (Years)" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
            <input value={designation} onChange={e => setDesignation(e.target.value)} placeholder="Designation" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
            <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
          </div>

          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Skills / Tags (comma separated)" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" />
          <input value={industryExperience} onChange={e => setIndustryExperience(e.target.value)} placeholder="Industry Experience (comma separated)" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" />
          <input value={stageExpertise} onChange={e => setStageExpertise(e.target.value)} placeholder="Stage Expertise (comma separated)" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" />
          
          <select value={mentoringAvailability} onChange={e => setMentoringAvailability(e.target.value)} className="w-full p-2 bg-[#1F2937] rounded border border-gray-600">
            <option value="Low">Availability: Low</option>
            <option value="Medium">Availability: Medium</option>
            <option value="High">Availability: High</option>
          </select>

          <input value={mentoringStyle} onChange={e => setMentoringStyle(e.target.value)} placeholder="Mentoring Style" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" />
          <input value={successMetrics} onChange={e => setSuccessMetrics(e.target.value)} placeholder="Success Metrics" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" />
          <input value={startupsMentored} onChange={e => setStartupsMentored(e.target.value)} type="number" placeholder="Startups Mentored" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" />
          <input value={exits} onChange={e => setExits(e.target.value)} type="number" placeholder="Exits" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" />

          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" rows={4} />

          <div className="flex flex-col items-start">
            <label className="mb-2">Profile Image:</label>
            {previewImage && <img src={previewImage} alt="preview" className="w-32 h-32 object-cover rounded-lg mb-2 border border-gray-600" />}
            <input type="file" onChange={handleImageChange} className="text-sm" />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-teal-500 to-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Mentor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMentorForm;
