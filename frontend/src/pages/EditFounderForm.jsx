import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { authDataContext } from "../context/authContext";

const EditFounderForm = ({ isOpen, onClose, data }) => {
    const { serverUrl } = useContext(authDataContext);
    const [loading, setLoading] = useState(false);
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
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        if (data) {
            setOriginalData(data);
            setName(data.name || "");
            setStartup(data.startup || "");
            setRole(data.role || "");
            setEmail(data.email || "");
            setIndustry(data.industry || "");
            setWebsite(data.website || "");
            setLocation(data.location || "");
            setTeamSize(data.teamSize || "");
            setDescription(data.description || "");
            setStartupStage(data.startupStage || "");
            setPreferredMentorStyle(data.preferredMentorStyle || "");
            setMentorAvailabilityExpectation(data.mentorAvailabilityExpectation || "");
            setFounderBackground(data.founderExperience?.background || "");
            setFounderExperienceYears(data.founderExperience?.years || "");
            setTags(data.tags?.join(", ") || "");
            setMentorshipNeeds(data.mentorshipNeeds || []);
            setPreviewImage(data.profileImage || "");
        }
    }, [data]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const buildUpdatePayload = () => {
        const payload = {};
        if (name !== originalData.name) payload.name = name;
        if (email !== originalData.email) payload.email = email;
        if (startup !== originalData.startup) payload.startup = startup;
        if (role !== originalData.role) payload.role = role;
        if (industry !== originalData.industry) payload.industry = industry;
        if (website !== originalData.website) payload.website = website;
        if (location !== originalData.location) payload.location = location;
        if (teamSize !== originalData.teamSize) payload.teamSize = teamSize;
        if (description !== originalData.description) payload.description = description;
        if (startupStage !== originalData.startupStage) payload.startupStage = startupStage;
        if (preferredMentorStyle !== originalData.preferredMentorStyle) payload.preferredMentorStyle = preferredMentorStyle;
        if (mentorAvailabilityExpectation !== originalData.mentorAvailabilityExpectation)
            payload.mentorAvailabilityExpectation = mentorAvailabilityExpectation;

        const parsedTags = tags.split(",").map(t => t.trim()).filter(Boolean);
        if (JSON.stringify(parsedTags) !== JSON.stringify(originalData.tags)) payload.tags = parsedTags;

        if (JSON.stringify(mentorshipNeeds) !== JSON.stringify(originalData.mentorshipNeeds))
            payload.mentorshipNeeds = mentorshipNeeds;

        if (founderBackground !== originalData.founderExperience?.background ||
            Number(founderExperienceYears) !== originalData.founderExperience?.years) {
            payload.founderExperience = {
                background: founderBackground,
                years: Number(founderExperienceYears),
            };
        }

        if (profileImage) payload.profileImage = profileImage;

        return payload;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = buildUpdatePayload();
        if (Object.keys(payload).length === 0) {
            alert("Koi change nahi kiya");
            return;
        }
         setLoading(true); 
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (key === "founderExperience" || Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        try {
            await axios.patch(`${serverUrl}/api/product/update/${data._id}`, formData, { withCredentials: true });
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


                <h2 className="text-2xl font-semibold mb-6 text-center">Edit Startup Profile</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Founder Name" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
                        <input value={startup} onChange={e => setStartup(e.target.value)} placeholder="Startup Name" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
                        <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
                        <input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="Industry" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
                        <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="Website" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
                        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
                        <input value={teamSize} onChange={e => setTeamSize(e.target.value)} placeholder="Team Size" className="p-2 bg-[#1F2937] rounded border border-gray-600" />
                    </div>

                    <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 bg-[#1F2937] rounded border border-gray-600" rows={4} />

                    <div className="flex flex-col items-start">
                        <label className="mb-2">Profile Image:</label>
                        {previewImage && <img src={previewImage} alt="preview" className="w-32 h-32 object-cover rounded-lg mb-2 border border-gray-600" />}
                        <input type="file" onChange={handleImageChange} className="text-sm" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select value={startupStage} onChange={e => setStartupStage(e.target.value)} className="p-2 bg-[#1F2937] rounded border border-gray-600">
                            <option value="">Select Startup Stage</option>
                            <option value="Idea">Idea</option>
                            <option value="MVP">MVP</option>
                            <option value="Early Revenue">Early Revenue</option>
                            <option value="Growth">Growth</option>
                            <option value="Scaling">Scaling</option>
                        </select>

                        <select value={founderBackground} onChange={e => setFounderBackground(e.target.value)} className="p-2 bg-[#1F2937] rounded border border-gray-600">
                            <option value="">Founder Background</option>
                            <option value="Tech">Tech</option>
                            <option value="Non-Tech">Non-Tech</option>
                        </select>

                        <input value={founderExperienceYears} onChange={e => setFounderExperienceYears(e.target.value)} type="number" placeholder="Founder Experience (Years)" className="p-2 bg-[#1F2937] rounded border border-gray-600" />

                        <select value={preferredMentorStyle} onChange={e => setPreferredMentorStyle(e.target.value)} className="p-2 bg-[#1F2937] rounded border border-gray-600">
                            <option value="">Preferred Mentor Style</option>
                            <option value="Hands-on">Hands-on</option>
                            <option value="Strategic">Strategic</option>
                            <option value="Friendly">Friendly</option>
                        </select>

                        <select value={mentorAvailabilityExpectation} onChange={e => setMentorAvailabilityExpectation(e.target.value)} className="p-2 bg-[#1F2937] rounded border border-gray-600">
                            <option value="">Mentor Availability</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
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
                                Updating...
                            </span>
                        ) : (
                            "Update Startup"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditFounderForm;
