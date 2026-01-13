import React, { useEffect, useState, useContext } from "react";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import ChatBox from "../components/Chatbox";
import "../App.css";
const Chats = () => {
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const currentUser = userData?.email || userData?._id;

  useEffect(() => {
    if (!currentUser) return;

    fetch(`${serverUrl}/api/chat/user/${currentUser}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setConversations);
  }, [currentUser]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#050810] via-[#070914] to-[#0A0D1A] text-white overflow-hidden relative pl-9">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Sidebar / Chat list */}
      <div className="relative z-10 w-full max-w-[360px] flex flex-col bg-[#0A0D1A]/40 backdrop-blur-2xl border-r border-white/10 shadow-2xl">
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
          <div className="relative">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-2">
              Messages
            </h1>
            <p className="text-sm text-gray-400">
              {conversations.length} conversation{conversations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 conversation-scroll">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-in fade-in duration-700">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10">
                  <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">No conversations yet</p>
              <p className="text-gray-500 text-xs">Start chatting to see your messages here</p>
            </div>
          ) : (
            conversations.map((conv, index) => {
              const partner = conv.members.find((m) => m !== currentUser);
              const isActive = activeChat?.convId === conv._id;

              return (
                <div
                  key={conv._id}
                  onClick={() => setActiveChat({ convId: conv._id, partner })}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 shadow-lg shadow-cyan-500/20 border border-cyan-400/30"
                      : "bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {isActive && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-xl opacity-20 -z-10" />}
                  <div className="flex items-center space-x-3">
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-transform group-hover:scale-110 ${isActive ? "bg-gradient-to-br from-cyan-400 to-blue-600" : "bg-gradient-to-br from-cyan-500/80 to-blue-600/80"}`}>
                      {partner.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${isActive ? "text-cyan-200" : "text-gray-100 group-hover:text-white"}`}>{partner}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Click to open chat</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat box */}
      <div className="relative z-10 flex-1 flex flex-col bg-[#070914]/40 backdrop-blur-sm">
        {activeChat ? (
          <ChatBox
            currentUser={currentUser}
            receiver={{ email: activeChat.partner, name: activeChat.partner }}
            serverUrl={serverUrl}
            onClose={() => setActiveChat(null)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center animate-in fade-in zoom-in duration-700">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl">
                  <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-3">
                Welcome to Messages
              </h2>
              <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                Select a conversation from the sidebar to start chatting with your connections.
              </p>

              <div className="flex items-center justify-center gap-2 mt-8">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200" />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500" />
              </div>
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default Chats;
