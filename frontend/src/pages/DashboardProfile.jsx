import { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/authContext'
import { userDataContext } from "../context/userContext";
import axios from 'axios'
import { MdEmail, MdDelete, MdGroups } from "react-icons/md";
import { FaBuilding, FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiStack } from "react-icons/gi";
import FoundersApplicationForm from './FoundersApplicationForm';
import DashboardProfileMentor from './Mentor/DashboardProfileMentor'
import EditFounderForm from './EditFounderForm'; 
import { IoAddCircleSharp } from "react-icons/io5";
const DashboardProfile = () => {
  const [list, setList] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);


  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)
  const role = userData?.role;

  const fetchMy = async () => {
    let userEmail = userData.email;
    try {
      const result = await axios.get(`${serverUrl}/api/product/my-startups`, {
        params: { email: userEmail },
        withCredentials: true,
      });
      setList(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      )
      if (result.data) fetchMy()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id) => {
    const res = await axios.get(
      `${serverUrl}/api/product/single/${id}`,
      { withCredentials: true }
    );
    setSelectedStartup(res.data);
    setIsEditOpen(true);
  };

  useEffect(() => {
    if (!userData || !userData.email) return;
    fetchMy();
  }, [userData]);

  const FounderUI = () => (
    <div className="min-h-screen bg-[#050810] text-white relative overflow-hidden px-10 py-10 flex justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">My Startups</h1>
            <p className="text-gray-400">Manage and track your startup portfolio</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm mb-6 ">
          <div className="flex items-center gap-2 text-teal-300">
            <span className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"></span>
            {list.length} Total Startups
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6
                hover:border-teal-400/50 transition-all duration-300 shadow-lg hover:shadow-teal-500/20"
              >
                {/* Avatar */}
                <img
                  src={item.profileImage}
                  alt="profile"
                  className="w-24 h-24 rounded-xl object-cover shadow-lg"
                />

                {/* Info */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h2 className="text-xl font-semibold capitalize">{item.name}</h2>
                    <span className="text-gray-500">|</span>
                    <p className="text-sm font-semibold uppercase text-blue-300">{item.role}</p>
                  </div>

                  {item.description && (
                    <p className="text-gray-400 text-sm mt-2 max-w-full">{item.description}</p>
                  )}

                  <div className="flex flex-wrap gap-4 mt-3 text-gray-300 text-sm">
                    <div className="flex items-center gap-1">
                      <MdEmail className="text-teal-400 text-lg" />
                      {item.email}
                    </div>
                    <div className="flex items-center gap-1 text-teal-300">
                      <FaBuilding className="text-lg" />
                      {item.startup}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mt-3 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <FaLocationDot className="text-teal-300 text-lg" />
                      {item.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <GiStack className="text-blue-300 text-lg" />
                      {Array.isArray(item.tags) &&
                        item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <MdGroups className="text-blue-300 text-lg" />
                      {item.teamSize}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row gap-3 mt-4 md:mt-0">

                  <button
                    onClick={() => handleEdit(item._id)}
                    className="w-10 h-10 flex items-center justify-center bg-blue-700/30 hover:bg-blue-600/40 rounded-lg transition">
                    <FaEdit className="text-blue-300 text-xl" />
                  </button>


                  <button
                    onClick={() => removeList(item._id)}
                    className="w-10 h-10 flex items-center justify-center 
                  bg-red-700/30 hover:bg-red-600/40 rounded-lg transition"
                  >
                    <MdDelete className="text-red-400 text-xl" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-20 text-xl col-span-full">
              No startups found
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <button
          className="fixed bottom-10 right-10 w-16 h-16 rounded-full 
        bg-gradient-to-br from-cyan-600 to-cyan-900 
        flex items-center justify-center text-white text-4xl shadow-xl
        hover:scale-110 transition"
          onClick={() => setIsFormOpen(true)}
        >
          <IoAddCircleSharp />
        </button>

        <FoundersApplicationForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            fetchMy();
          }}
        />
        <EditFounderForm
          isOpen={isEditOpen}
          data={selectedStartup}
          onClose={async () => {
            setIsEditOpen(false);
            setSelectedStartup(null);
            await fetchMy();
          }}
        />

      </div>
    </div>
  );


  return role === 'founder' ? <FounderUI /> : <DashboardProfileMentor />
}

export default DashboardProfile
