import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUserFriends, FaBars, FaTimes } from 'react-icons/fa';
import { MdForum, MdAccountCircle } from 'react-icons/md';
import { BsBuildings, BsBriefcaseFill } from 'react-icons/bs';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import startupLogo1 from '../assets/startupLogo1.png';
import { userDataContext } from '../context/userContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import "../App.css";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [showProfile, setShowProfile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { getCurrentUser, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => setMounted(true), []);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) setActiveItem(currentItem.id);
  }, [location.pathname]);

  const handleResize = () => {
    setIsSidebarOpen(window.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      getCurrentUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    { label: 'Home', icon: <FaHome />, id: 'Home', path: "/" },
    { label: 'My Profile', icon: <BsBuildings />, id: 'Dashboard/Profile', path: "/dashboardProfile" },
    { label: 'Founder Directories', icon: <BsBriefcaseFill />, id: 'Founder Directories', path: "/foundersDashboard" },
    { label: 'Mentor Directories', icon: <FaUserFriends />, id: 'Mentor Directories', path: "/mentorsDashboard" },
    { label: 'Inbox', icon: <MdForum />, id: 'Chats', path: "/chats" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed top-6 right-6 z-50 p-3 rounded-xl md:hidden
          bg-gradient-to-br from-[#00B2D4]/20 to-[#1C92F2]/20 
          backdrop-blur-xl border border-white/10
          text-cyan-300 shadow-lg shadow-cyan-500/20
          hover:shadow-cyan-500/40 hover:scale-110
          transition-all duration-300 ease-out
          ${mounted ? "animate-fade-in-down" : "opacity-0"}`}
        onClick={() => setIsSidebarOpen(prev => !prev)}
        aria-label="Toggle Sidebar">
        <div className="relative">
          <div
            className={`transition-all duration-300 ${isSidebarOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"} absolute inset-0 flex items-center justify-center`}
          >
            <FaBars size={18} />
          </div>
          <div
            className={`transition-all duration-300 ${isSidebarOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
          >
            <FaTimes size={18} />
          </div>
        </div>
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-70 transform transition-all duration-500 ease-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40 ${mounted ? "animate-fade-in-left" : "opacity-0"}`}>
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070f] via-[#080c1a] to-[#0a0f16]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00B2D4]/5 via-transparent to-[#1C92F2]/5" />
        <div className="absolute inset-0 backdrop-blur-1xl" />
        <div className="absolute top-20 -left-20 w-60 h-60 bg-[#05070f]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 -right-20 w-60 h-60 bg-[#1C92F2]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute inset-0 border-r border-white/5" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-white/10 animate-fade-in-down" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 transition-all duration-300 group">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#00b1d44d] to-[#021b309b] p-2 flex items-center justify-center shadow-lg">
                <img src={startupLogo1} alt="Logo" className="w-full h-full rounded-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                  Start<span className="text-[#00eeff3c]">Up</span> Saathi
                </h1>
                <p className="text-xs text-white/50 font-light tracking-wide">Growing Success</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-3 px-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Navigation</p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
            {menuItems.map((item, index) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeItem === item.id}
                item={item}
                setActiveItem={setActiveItem}
                setIsSidebarOpen={setIsSidebarOpen}
                index={index}
              />
            ))}
          </div>

          {/* Profile & Logout */}
          <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {userData ? (
                    <>
                      <div className="relative cursor-pointer" onClick={() => setShowProfile(prev => !prev)}>
                        <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#00B2D4] to-[#0FCFE9] p-[2px] shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-[#0a0f1e] flex items-center justify-center">
                            <span className="text-cyan-300 font-bold text-base">{userData.name.slice(0,1).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col leading-tight flex-1 min-w-0">
                        <span className="text-sm text-white font-semibold truncate">{userData.name}</span>
                        <span className="text-xs text-cyan-400/70 capitalize font-light">({userData.role})</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowProfile(prev => !prev)}>
                      <MdAccountCircle className="w-11 h-11 text-cyan-400/70" />
                      <span className="text-sm text-white/60">Not logged in</span>
                    </div>
                  )}
                </div>

                {userData && (
                  <button
                    onClick={() => { handleLogout(); setShowProfile(false) }}
                    className="flex items-center gap-1.5 p-1 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all duration-300 shadow-sm hover:shadow-red-500/20">
                    <span className="text-xs font-medium">Logout</span>
                    <RiLogoutCircleRLine size={14} />
                  </button>
                )}
              </div>

              <div ref={profileRef} className="relative">
                {!userData && showProfile && (
                  <div className="absolute bottom-full left-0 right-0 mb-3 animate-fade-in-up">
                    <div className="relative p-2 rounded-xl bg-[#0a0f1e]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-cyan-500/20">
                      <div className="relative space-y-1">
                        <button onClick={() => { navigate("/login"); setShowProfile(false) }} className="w-full px-4 py-3 text-sm text-white/80 hover:text-white rounded-lg bg-white/0 hover:bg-gradient-to-r hover:from-[#00B2D4]/20 hover:to-[#1C92F2]/20 border border-transparent hover:border-cyan-500/30 transition-all duration-300 text-left font-medium hover:shadow-lg hover:shadow-cyan-500/10">Login</button>
                        <button onClick={() => { navigate("/signup"); setShowProfile(false) }} className="w-full px-4 py-3 text-sm text-white/80 hover:text-white rounded-lg bg-white/0 hover:bg-gradient-to-r hover:from-[#00B2D4]/20 hover:to-[#1C92F2]/20 border border-transparent hover:border-cyan-500/30 transition-all duration-300 text-left font-medium hover:shadow-lg hover:shadow-cyan-500/10">Signup</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </aside>

    </>
  );
};

const NavItem = ({ icon, label, active, item, setActiveItem, setIsSidebarOpen, index }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setActiveItem(item.id);
    if (item.path) navigate(item.path);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative group cursor-pointer animate-fade-in-left`}
      style={{ animationDelay: `${0.3 + index * 0.05}s` }}
    >
      {active && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#00B2D4] to-[#1C92F2] rounded-r-full shadow-lg shadow-cyan-500/50" />
      )}
      <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ease-out
        ${active
          ? "bg-gradient-to-r from-[#00B2D4]/15 to-[#1C92F2]/15 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
          : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
        }`}>
        <div className={`relative text-xl transition-all duration-300 ${active ? "scale-110 text-cyan-300" : "group-hover:scale-105"}`}>{icon}</div>
        <span className={`relative text-sm font-medium transition-all duration-300 ${active ? "font-semibold" : ""}`}>{label}</span>
        {active && <div className="absolute right-3 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse" />}
      </div>
    </div>
  );
};

export default Sidebar;
