import React, { useEffect, useState, useContext } from "react";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { MdEmail, MdGroups } from "react-icons/md";
import { FaBuilding, FaHandsHelping, FaChartLine } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiStack } from "react-icons/gi";
import Summary from "./Summary";
import { ImCross } from "react-icons/im";
import { GrLinkedin } from "react-icons/gr";
import "../App.css";

const MatchPopup = ({ mentor, onClose }) => {
    const { serverUrl } = useContext(authDataContext);
    const { userData } = useContext(userDataContext);

    const [startups, setStartups] = useState([]);
    const [selectedStartup, setSelectedStartup] = useState(null);
    const [showCards, setShowCards] = useState(false);
    const [matchPercent, setMatchPercent] = useState(null);

    // Fetchng founder startups like DashboardProfile
    useEffect(() => {
        const fetchStartups = async () => {
            if (!userData?.email) return;
            try {
                const res = await axios.get(`${serverUrl}/api/product/my-startups`, {
                    params: { email: userData.email },
                    withCredentials: true,
                });
                setStartups(res.data);
            } catch (error) {
                console.error("Error fetching startups:", error);
            }
        };
        fetchStartups();
    }, [serverUrl, userData.email]);

    const calculateMatch = async () => {
        try {
            const res = await axios.post(`${serverUrl}/api/match/startup-mentor`, {
                startupId: selectedStartup._id,
                mentorId: mentor._id,
            });
            setMatchPercent(res.data.matchPercent);
        } catch (error) {
            console.error("Error calculating match:", error);
        }
    };
    const [strengths, setStrengths] = useState([]);
    const fetchMentorStrengths = async () => {
        const res = await axios.post(`${serverUrl}/api/match/mentor-strengths`, {
            startupId: selectedStartup._id,
            mentorId: mentor._id,
        });

        setStrengths(res.data.insights);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!mentor) return null;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#050810]/95 via-[#070914]/90 to-[#0A0D1A]/95 backdrop-blur-xl flex items-center justify-center z-50 p-4">

            <div className="bg-gradient-to-br from-[#0A0D1A] via-[#0b1220] to-[#070914] p-8 rounded-3xl w-full max-w-6xl text-white border border-cyan-500/20 relative shadow-2xl shadow-cyan-500/10 max-h-[95vh] overflow-y-auto custom-scrollbar">
                <button onClick={onClose} className="absolute top-6 right-6 group text-cyan-400 hover:text-cyan-300 transition-all duration-300 p-2 rounded-xl hover:bg-cyan-500/10 hover:shadow-cyan-500/20 hover:shadow-lg hover:scale-110 backdrop-blur-sm border border-cyan-500/30" >
                    <ImCross size={20} />
                </button>

                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        Mentor-Startup Match Analysis
                    </h2>
                    <p className="text-gray-400 mt-2">Evaluate compatibility and insights for optimal collaboration</p>
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* Left Column: Mentor Card */}
                    <div className="flex-1">
                        <div className="bg-gradient-to-br from-[#0b1220]/80 to-[#070914]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <img
                                    src={mentor.profileImage}
                                    alt={mentor.name}
                                    className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-600 shadow-md"
                                />

                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        {mentor.name}
                                    </h3>

                                    <p className="text-base text-gray-300 mb-2">
                                        {mentor.designation} @ {mentor.company}
                                    </p>
                                    <p className="text-sm text-teal-400 font-medium mb-2">
                                        Expertise: {mentor.expertise}
                                    </p>

                                    {mentor.linkedin && (
                                        <a
                                            href={mentor.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
                                        >
                                            <GrLinkedin /> LinkedIn Profile
                                        </a>
                                    )}

                                    <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                                        {mentor.description}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {mentor.experience} years of experience
                                    </p>

                                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
                                        <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-2 rounded-lg">
                                            <MdEmail className="text-teal-400" />
                                            <span className="truncate">{mentor.email}</span>
                                        </div>

                                        <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-2 rounded-lg">
                                            <FaLocationDot className="text-teal-400" />
                                            {mentor.location}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {mentor.tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            {mentor.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="p-2 text-sm rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}


                                    {mentor.stageExpertise?.length > 0 && (
                                        <div className="mt-4 ">
                                            {/* Heading */}
                                            <h3 className="text-sm font-medium text-gray-300 mb-2">Stage Expertise:</h3>

                                            {/* Pills */}
                                            <div className="flex gap-3  flex-wrap ">
                                                {mentor.stageExpertise.map((stage, i) => (
                                                    <span key={i} className="px-3 py-2 text-sm rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 font-medium"
                                                    >
                                                        {stage}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-5 space-y-4">

                                        {/* Mentoring Style */}
                                        {mentor.mentoringStyle && (
                                            <div className="flex items-start gap-4 p-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 hover:border-blue-400 transition-all duration-300"
                                            >
                                                <div
                                                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400"
                                                >
                                                    <FaHandsHelping size={18} />
                                                </div>

                                                <div>
                                                    <p className="text-xs uppercase tracking-wide text-blue-300">
                                                        Mentoring Style
                                                    </p>
                                                    <p className="text-white font-semibold text-sm">
                                                        {mentor.mentoringStyle}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Success Metrics */}
                                        {mentor.successMetrics && (
                                            <div className="flex items-start gap-4 p-1 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400"
                                                >
                                                    <FaChartLine size={18} />
                                                </div>

                                                <div>
                                                    <p className="text-xs uppercase tracking-wide text-emerald-300">
                                                        Success Metrics
                                                    </p>
                                                    <p className="text-white font-semibold text-sm leading-snug">
                                                        {mentor.successMetrics}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                    </div>


                                    <div className="flex gap-6 mt-6 text-sm text-gray-400 bg-gray-700/20 px-4 py-3 rounded-lg">
                                        <span className="flex items-center gap-2">
                                            <MdGroups className="text-blue-400" />
                                            Startups Mentored: {mentor.startupsMentored}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <GiStack className="text-purple-400" />
                                            Exits: {mentor.exits}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FaBuilding className="text-orange-400" />
                                            Availability: {mentor.mentoringAvailability}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Startup Selection and Card */}
                    <div className="flex-1">
                        {/* Select box */}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-white mb-3">Select Your Startup</label>
                            <select className="w-full p-6 bg-gradient-to-r from-[#0b1220]/80 to-[#070914]/80 rounded-3xl border border-white/20 text-white text-lg focus:ring-4 focus:ring-cyan-500/50 transition-all duration-500 shadow-2xl backdrop-blur-xl"
                                onChange={(e) => {
                                    const startup = startups.find((s) => s._id === e.target.value);
                                    setSelectedStartup(startup);
                                    setShowCards(Boolean(startup));
                                }}
                            >
                                <option value="" className="bg-gray-800">Choose a startup to analyze</option>
                                {startups.map((s) => (
                                    <option key={s._id} value={s._id} className="bg-gray-800">
                                        {s.startup}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Show startup details like small cards */}
                        {showCards && selectedStartup && (
                            <div className="bg-gradient-to-br from-[#0b1220]/80 to-[#070914]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
                                <div className="flex items-start gap-6">
                                    <img
                                        src={selectedStartup.profileImage}
                                        alt={selectedStartup.name}
                                        className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-600 shadow-md"
                                    />

                                    <div className="flex-1">
                                        {/* Founder Name + Role */}
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {selectedStartup.name}
                                        </h3>

                                        <p className="text-base text-gray-300 mb-2">
                                            {selectedStartup.role} @ {selectedStartup.startup}
                                        </p>

                                        <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                                            {selectedStartup.description}
                                        </p>

                                        {/* Founder experience */}
                                        <p className="text-sm text-gray-500 mb-4">
                                            {selectedStartup.founderExperience.background} Founder ·{" "}
                                            {selectedStartup.founderExperience.years} yrs experience
                                        </p>

                                        {/* Contact + Location */}
                                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
                                            <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-2 rounded-lg">
                                                <MdEmail className="text-teal-400" />
                                                <span className="truncate">{selectedStartup.email}</span>
                                            </div>

                                            <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-2 rounded-lg">
                                                <FaLocationDot className="text-teal-400" />
                                                {selectedStartup.location}
                                            </div>
                                        </div>

                                        {/* Tags / Industry */}
                                        {selectedStartup.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-3 mt-4">
                                                {selectedStartup.tags.map((tag, index) => (
                                                    <span key={index} className="px-3 py-2 text-sm rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Startup + Founder meta */}
                                        <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-400 bg-gray-700/20 px-4 py-3 rounded-lg">
                                            <span className="flex items-center gap-2">
                                                <FaBuilding className="text-orange-400" />
                                                Stage: {selectedStartup.startupStage}
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <MdGroups className="text-blue-400" />
                                                Team Size: {selectedStartup.teamSize}
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <GiStack className="text-purple-400" />
                                                Industry: {selectedStartup.industry}
                                            </span>
                                        </div>

                                        {/* Mentor expectations */}
                                        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-300">
                                            <span className="px-3 py-2 rounded-full bg-green-500/10 text-green-300 border border-green-500/30">
                                                Mentor Style: {selectedStartup.preferredMentorStyle}
                                            </span>

                                            <span className="px-3 py-2 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/30">
                                                Availability Needed: {selectedStartup.mentorAvailabilityExpectation}
                                            </span>
                                        </div>

                                        {/* Mentorship needs */}
                                        {selectedStartup.mentorshipNeeds?.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-xs text-gray-400 mb-2">Mentorship Needs</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedStartup.mentorshipNeeds.map((need, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-1 text-xs rounded-md 
                             bg-teal-500/10 text-teal-300 
                             border border-teal-500/30"
                                                        >
                                                            {need}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Match buttons below both columns */}
                <div className="text-center space-y-4">
                    <button
                        onClick={calculateMatch}
                        disabled={!selectedStartup}
                        className="w-full max-w-sm mx-auto py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl font-bold text-white hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Calculate Match Percentage
                    </button>

                    {matchPercent !== null && (
                        <>
                            <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 p-6 rounded-xl border border-gray-500/50">
                                <p className="text-2xl font-bold text-center text-white mb-2">
                                    Match Compatibility: <span className="text-teal-400">{matchPercent}%</span>
                                </p>
                                <div className="w-full bg-gray-600 rounded-full h-4 mb-4">
                                    <div
                                        className="bg-gradient-to-r from-teal-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${matchPercent}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button
                                onClick={fetchMentorStrengths}
                                className="w-full max-w-sm mx-auto py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                View Mentor Strength Analysis
                            </button>
                        </>
                    )}
                </div>

                <div className="mt-8">
                    <Summary strengths={strengths} />
                </div>
            </div>
        </div>
    );
};

export default MatchPopup;
