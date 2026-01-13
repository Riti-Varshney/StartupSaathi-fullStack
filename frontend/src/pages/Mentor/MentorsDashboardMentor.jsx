import React, { useState, useEffect, useContext } from "react";
import { FiMapPin, FiBriefcase, FiCheckCircle, FiMessageCircle } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { IoSparklesSharp } from "react-icons/io5";
import ChatBox from "../../components/Chatbox.jsx";
import { authDataContext } from "../../context/authContext";
import { userDataContext } from "../../context/userContext";
import MentorApplicationForm from "./MentorApplicationForm";

const MentorCard = ({
  name,
  email,
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
}) => (
  <div className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:border-cyan-500/50">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

    <div className="relative p-6">
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
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full p-1 shadow-lg">
            <BsStarFill size={10} className="text-black" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
          <div className="inline-block px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-2">
            <p className="text-sm text-cyan-300 truncate">{designation}</p>
          </div>
          {expertise && <p className="text-xs text-gray-400">{expertise} • {experience}+ yrs</p>}
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-5 line-clamp-3">{description}</p>

      <div className="space-y-2 mb-5 text-xs text-gray-400">
        {company && <div className="flex items-center gap-2"><FiCheckCircle className="text-cyan-400" />{company}</div>}
        {location && <div className="flex items-center gap-2"><FiMapPin className="text-blue-400" />{location}</div>}
        {experience && <div className="flex items-center gap-2"><FiBriefcase className="text-purple-400" />{experience} years experience</div>}
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

      <div className="flex gap-3">
        <button
          onClick={onChatClick}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium text-white hover:scale-[1.02] transition"
        >
          <FiMessageCircle size={16} /> Chat
        </button>
      </div>
    </div>
  </div>
);

const MentorsDashboardMentor = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const { serverUrl } = useContext(authDataContext);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPartner, setChatPartner] = useState(null);
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
    <div className="min-h-screen bg-[#050810] text-white relative overflow-hidden py-10 px-4 sm:px-6 md:px-10 mx-auto">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pl-6 relative z-10">
        <div className="text-center sm:text-left">
          <div className="flex justify-center sm:justify-start items-center gap-2 mb-2">
            <IoSparklesSharp className="text-3xl text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Mentor Directory
            </h1>
          </div>
          <p className="text-gray-400 max-w-xl">Mentoring isn’t just advice — it’s building the future</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="mt-4 sm:mt-0 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold rounded-lg hover:shadow-lg transition relative z-10"
        >
          Add Mentorship
        </button>
      </div>

     <div className="flex flex-wrap gap-3 mb-10 pl-6 " >
  {["Fundraising & Investor Relations","Product-Market Fit","Growth & Marketing","Pitch Deck Mastery","Team & Culture","Legal Guidance"].map((skill,i)=>(
    <span key={i} className="bg-cyan-600/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-500/30 transition cursor-pointer">
      {skill}
    </span>
  ))}
</div>


      {/* Mentor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pl-6 ">
        {mentors.map((mentor, i) => (
          <MentorCard key={i} {...mentor} onChatClick={() => openChat(mentor)} />
        ))}
      </div>

      {/* Chat Box */}
      {chatOpen && chatPartner && (
        <ChatBox
          currentUser={userData?.email || userData?._id}
          receiver={chatPartner}
          serverUrl={serverUrl}
          onClose={() => setChatOpen(false)}
        />
      )}

      <MentorApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default MentorsDashboardMentor;
