import React, { useState, useEffect, useContext } from "react";
import { FiMapPin, FiBriefcase, FiGlobe, FiMessageCircle } from "react-icons/fi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoSparklesSharp } from "react-icons/io5";
import { HiUserGroup, HiOutlineCalendar, HiOutlineStar, HiOutlineClock } from "react-icons/hi";
import ChatBox from "../components/Chatbox.jsx";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import FoundersApplicationForm from "./FoundersApplicationForm";

const FounderCard = ({
  name,
  startup,
  role = "",
  industry = "",
  description = "",
  location = "",
  teamSize = null,
  website = "",
  tags = [],
  profileImage,
  onChat,
}) => (
  <div className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:border-cyan-500/50">

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
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
          <div className="inline-block px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-2">
            <p className="text-sm text-cyan-300 truncate">{startup}</p>
          </div>
          <p className="text-xs text-gray-400">
            {role} {industry && `• ${industry}`}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-5 line-clamp-3">
        {description}
      </p>

      {/* Meta */}
      <div className="space-y-2 mb-5 text-xs text-gray-400">
        {location && (
          <div className="flex items-center gap-2">
            <FiMapPin className="text-cyan-400" />
            {location}
          </div>
        )}
        {teamSize && (
          <div className="flex items-center gap-2">
            <FiBriefcase className="text-blue-400" />
            Team Size: {teamSize}
          </div>
        )}
        {website && (
          <div className="flex items-center gap-2">
            <FiGlobe className="text-purple-400" />
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              {website}
            </a>
          </div>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag, idx) => (
            <span
              key={idx}
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
          onClick={onChat}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-medium text-white hover:scale-[1.02] transition"
        >
          <FiMessageCircle size={16} />
          Chat
        </button>

        {role === "founder" && (
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm text-purple-300 hover:border-purple-400/50 transition">
            <BsFillPersonCheckFill size={16} />
            Match %
          </button>
        )}
      </div>
    </div>
  </div>
);

const FoundersDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [founders, setFounders] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPartner, setChatPartner] = useState(null);

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const role = userData?.role;

  const getIdentifier = (founder) =>
    founder.email || founder._id || founder.name;

  const openChat = (founder) => {
    setChatPartner({
      id: founder._id,
      name: founder.name,
      email: founder.email,
      partnerIdentifier: getIdentifier(founder),
    });
    setChatOpen(true);
  };

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const res = await fetch(serverUrl + "/api/product/list");
        const data = await res.json();
        setFounders(data);
      } catch (err) {
        console.error("Error fetching founders:", err);
      }
    };
    fetchFounders();
  }, [serverUrl]);

  return (
    <div className="min-h-screen bg-[#050810] text-white relative overflow-hidden pl-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 md:px-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <IoSparklesSharp className="text-3xl text-cyan-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Founders Directory
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl">
              Connect with visionary founders and build the future together.
            </p>
          </div>

          {role === "founder" && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white hover:scale-105 transition"
            >
              Add Startup →
            </button>
          )}
        </div>

        {/* Info Cards */}
        {role === "founder" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { icon: HiUserGroup, label: "Co-founder search" },
              { icon: HiOutlineStar, label: "Fundraising advice" },
              { icon: HiOutlineCalendar, label: "Tech partnerships" },
              { icon: HiOutlineClock, label: "Market expansion" },
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { icon: HiUserGroup, label: "Guide Co-founders" },
              { icon: HiOutlineStar, label: "Advise on Fundraising" },
              { icon: HiOutlineCalendar, label: "Support Tech Partnerships" },
              { icon: HiOutlineClock, label: "Assist Market Expansion" },
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
        )}
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {founders.map((founder, i) => (
            <FounderCard
              key={i}
              {...founder}
              onChat={() => openChat(founder)}
            />
          ))}
        </div>
      </div>

      {chatOpen && chatPartner && (
        <ChatBox
          currentUser={userData?.email || userData?._id}
          receiver={chatPartner}
          serverUrl={serverUrl}
          onClose={() => setChatOpen(false)}
        />
      )}

      <FoundersApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default FoundersDashboard;
