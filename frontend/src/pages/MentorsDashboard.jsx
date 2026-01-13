import { useState, useEffect, useContext } from "react";
import { FiMapPin, FiBriefcase, FiCheckCircle, FiMessageCircle } from "react-icons/fi";
import { BsFillPersonCheckFill, BsStarFill } from "react-icons/bs";
import { IoSparklesSharp } from "react-icons/io5";
import { HiUserGroup, HiOutlineStar, HiOutlineClock } from "react-icons/hi";
import ChatBox from "../components/Chatbox.jsx";
import { authDataContext } from "../context/authContext";
import MentorsDashboardMentor from "../pages/Mentor/MentorsDashboardMentor";
import MatchPopup from "./MatchPopup";
import { userDataContext } from "../context/userContext";
const MentorCard = ({
  name,
  expertise,
  experience,
  company,
  designation,
  location,
  linkedin,
  description,
  tags = [],
  profileImage,
  onChatClick,
  onMatchClick,
}) => (
  <div className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:border-cyan-500/50">

    {/* glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

    <div className="relative p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full blur-md opacity-60" />
          <div className="relative h-16 w-16 rounded-full bg-[#0B1120] p-[2px]">
            <img
              src={profileImage || "/placeholder.svg"}
              alt={name}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          {/* verified */}
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full p-1 shadow-lg">
            <BsStarFill size={10} className="text-black" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
          <div className="inline-block px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-2">
            <p className="text-sm text-cyan-300 truncate">{designation}</p>
          </div>
          <p className="text-xs text-gray-400">
            {expertise} • {experience}+ yrs
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-5 line-clamp-3">
        {description}
      </p>

      {/* Meta */}
      <div className="space-y-2 mb-5 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <FiCheckCircle className="text-cyan-400" />
          {company}
        </div>
        <div className="flex items-center gap-2">
          <FiMapPin className="text-blue-400" />
          {location}
        </div>
        <div className="flex items-center gap-2">
          <FiBriefcase className="text-purple-400" />
          {experience} years experience
        </div>

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            LinkedIn Profile
          </a>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onChatClick}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium text-white hover:scale-[1.02] transition"
        >
          <FiMessageCircle size={16} />
          Chat
        </button>

        <button
          onClick={onMatchClick}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm text-purple-300 hover:border-purple-400/50 transition"
        >
          <BsFillPersonCheckFill size={16} />
          Match
        </button>
      </div>
    </div>
  </div>
);

const MentorDashboardWrapper = () => {
  const { userData } = useContext(userDataContext);
  return userData?.role === "founder" ? <MentorDashboard /> : <MentorsDashboardMentor />;
};

const MentorDashboard = () => {
  const [mentors, setMentors] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPartner, setChatPartner] = useState(null);
  const [matchPopupOpen, setMatchPopupOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const openChat = (mentor) => {
    setChatPartner({
      id: mentor._id,
      name: mentor.name,
      email: mentor.email,
    });
    setChatOpen(true);
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch(serverUrl + "/api/mentor/list");
        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error("Error fetching mentors:", err);
      }
    };
    fetchMentors();
  }, [serverUrl]);

  return (
    <div className="min-h-screen bg-[#050810] text-white relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 md:px-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-16 pl-6 ">
          <div className="flex items-center gap-3 mb-4">
            <IoSparklesSharp className="text-3xl text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Mentors Directory
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Learn from experienced founders and industry leaders guiding startups to scale.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-14 pl-6 ">
          {[
            { icon: HiUserGroup, label: "Expert Network" },
            { icon: HiOutlineClock, label: "Instant Chat" },
            { icon: HiOutlineStar, label: "Smart Matching" },
            { icon: HiUserGroup, label: "Diverse Expertise" }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-3"
            >
              <item.icon className="text-cyan-400 text-lg" />
              <span className="text-gray-300 text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Mentor grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-6 ">
          {mentors.map((mentor, i) => (
            <MentorCard
              key={i}
              {...mentor}
              onChatClick={() => openChat(mentor)}
              onMatchClick={() => {
                setSelectedMentor(mentor);
                setMatchPopupOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {matchPopupOpen && selectedMentor && (
        <MatchPopup mentor={selectedMentor} onClose={() => setMatchPopupOpen(false)} />
      )}

      {chatOpen && chatPartner && (
        <ChatBox
          currentUser={userData?.email || userData?._id}
          receiver={chatPartner}
          serverUrl={serverUrl}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
};

export default MentorDashboardWrapper;
