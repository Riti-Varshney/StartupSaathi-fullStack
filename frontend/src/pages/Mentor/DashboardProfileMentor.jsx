import { useContext, useEffect, useState } from 'react';
import { authDataContext } from '../../context/authContext';
import { userDataContext } from '../../context/userContext';
import axios from 'axios';
import { MdEmail, MdDelete } from "react-icons/md";
import { FaBuilding, FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import MentorApplicationForm from './MentorApplicationForm';
import EditMentorForm from './EditMentorForm';
const DashboardProfileMentor = () => {
  const [list, setList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const fetchMy = async () => {
    if (!userData?.email) return;
    try {
      const result = await axios.get(`${serverUrl}/api/mentor/my-mentors`, {
        params: { email: userData.email },
        withCredentials: true,
      });
      setList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/mentor/remove/${id}`,
        {},
        { withCredentials: true }
      );
      if (result.data) fetchMy();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${serverUrl}/api/mentor/single/${id}`, {
        withCredentials: true
      });
      setSelectedMentor(res.data);
      setIsEditOpen(true);
    } catch (error) {
      console.log("Error fetching mentor:", error);
    }
  };

  useEffect(() => {
    fetchMy();
  }, [userData]);

  return (
    <div className="min-h-screen bg-[#050810] text-white px-4 py-10 flex justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            My Mentor Profiles
          </h1>
          <p className="text-gray-400 mt-1">Manage and track your mentor portfolio</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm mb-6">
          <div className="flex items-center gap-2 text-teal-300">
            <span className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"></span>
            {list.length} Mentor Profiles
          </div>
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6
                hover:border-teal-400/50 hover:shadow-teal-500/20 transition-all duration-300 shadow-lg hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
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
                    <p className="text-sm font-semibold uppercase text-blue-300">{item.designation}</p>
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
                      {item.company}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mt-3 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <GiSkills className="text-blue-300 text-lg" />
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
                      <MdWork className="text-yellow-300 text-lg" />
                      {item.experience} Years
                    </div>
                    <div className="flex items-center gap-1">
                      <FaLocationDot className="text-teal-300 text-lg" />
                      {item.location}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-3 mt-4 md:mt-0">
                  <button onClick={() => handleEdit(item._id)} className="w-10 h-10 flex items-center justify-center bg-blue-700/30 hover:bg-blue-600/40 rounded-lg transition">
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
              No mentor profiles found
            </div>
          )}
        </div>

        {/* Add Mentor Button */}
        <button
          className="fixed bottom-10 right-10 w-16 h-16 rounded-full 
          bg-gradient-to-br from-teal-600 to-cyan-900 
          flex items-center justify-center text-white text-4xl shadow-xl
          hover:scale-110 transition"
          onClick={() => setIsFormOpen(true)}
        >
          <IoAddCircleSharp />
        </button>

        <MentorApplicationForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            fetchMy();
          }}
        />
        <EditMentorForm
          isOpen={isEditOpen}
          data={selectedMentor}
          onClose={async () => {
            setIsEditOpen(false);
            setSelectedMentor(null);
            await fetchMy();
          }}
        />

      </div>
    </div>
  );
};

export default DashboardProfileMentor;
