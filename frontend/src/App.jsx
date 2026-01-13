import './App.css';
import Navbar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Registration from './pages/Registration';
import DashboardProfile from './pages/DashboardProfile';
import MentorsDashboard from './pages/MentorsDashboard';
import FoundersDashboard from './pages/FoundersDashboard';
import Chats from './pages/Chats';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { userDataContext } from './context/userContext';

function App() {
  const location = useLocation();
  const { userData } = useContext(userDataContext);
  return (
    <div className="flex">
      {userData && <Navbar />}

      <div
        className={`flex-1 bg-gray-100 min-h-screen w-full ${
          userData ? 'md:ml-70' : ''
        }`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboardProfile"
            element={
              userData ? (
                <DashboardProfile />
              ) : (
                <Navigate to="/login" state={{ from: location.pathname }} />
              )
            }
          />

          <Route
            path="/mentorsDashboard"
            element={userData ? <MentorsDashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/foundersDashboard"
            element={userData ? <FoundersDashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/chats"
            element={userData ? <Chats /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
