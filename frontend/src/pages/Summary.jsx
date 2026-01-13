import { FaCheckCircle, FaExclamationTriangle, FaRocket } from "react-icons/fa";
import "../App.css";
const Summary = ({ strengths = [] }) => {
  if (!strengths.length) return null;

  return (
    <>

      <div className="strengths-container mt-6 p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl border border-gray-700 shadow-2xl">
        <h3 className="font-bold text-xl mb-4 text-white flex items-center gap-2">
          <span className="icon-rocket flex items-center justify-center w-8 h-8 rounded-fullbg-blue-500/10 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]">
            <FaRocket className="text-lg" />
          </span>
          Mentor Strengths
        </h3>

        <ul className="space-y-3">
          {strengths.map((item, index) => (
            <li
              key={index}
              className="strength-item flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border-l-4 border-l-blue-500 hover:bg-gray-600/70 transition-all duration-300"
            >
              <span
                className={`text-lg ${item.type === "positive" 
                    ? "text-green-400"
                    : "text-yellow-400"
                  }`}
              >
                {item.type === "positive" ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationTriangle />
                )}
              </span>

              <span className="text-gray-200 font-medium">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Summary;
