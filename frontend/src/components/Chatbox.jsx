import { useEffect, useRef, useState } from "react";
import socket from "../socket";
import { IoSend } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { Hand } from "lucide-react";
import "../App.css"
const Chatbox = ({ currentUser, receiver, onClose, serverUrl }) => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    if (!currentUser || !receiver) return;

    const initConversation = async () => {
      try {
        const body = { user1: currentUser, user2: receiver.email || receiver.id || receiver.name };
        const res = await fetch(serverUrl + "/api/chat/conversation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        });
        const data = await res.json();
        setConversationId(data._id);

        socket.emit("join_room", data._id);

        const msgsRes = await fetch(serverUrl + "/api/chat/messages/" + data._id, { credentials: "include" });
        const msgs = await msgsRes.json();
        setMessages(msgs);
      } catch (err) {
        console.error("Init conversation error:", err);
      }
    };

    initConversation();
  }, [currentUser, receiver]);

  useEffect(() => {
    const handler = (data) => {
      if (!conversationId) return;
      if (data.roomId === conversationId || data.conversationId === conversationId) {
        setMessages((prev) => [
          ...prev,
          {
            _id: data._id || Date.now(),
            conversationId,
            sender: data.sender,
            text: data.text,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    };

    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [conversationId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !conversationId) return;

    const msgBody = { conversationId, sender: currentUser, text: input.trim() };

    try {
      await fetch(serverUrl + "/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(msgBody),
      });
      socket.emit("send_message", { ...msgBody, roomId: conversationId });
      setInput("");
    } catch (err) {
      console.error("sendMessage error:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-[380px] md:w-[420px] z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="relative bg-[#0A0D1A]/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Decorative gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-50" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {(receiver.email || receiver.name || "U").charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0A0D1A] shadow-lg animate-pulse" />
              </div>

              <div>
                <div className="text-base font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  {receiver.name || receiver.email || "User"}
                </div>
                <div className="text-xs text-gray-400 truncate max-w-[200px]">{receiver.email || ""}</div>
              </div>
            </div>

            <button
              className="group relative p-2 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 transition-all duration-300"
              onClick={onClose}
              aria-label="Close chat"
            >
              <ImCross className="text-gray-400 group-hover:text-red-400 text-xs transition-colors" />
              <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[380px] overflow-y-auto p-3 mb-4 space-y-3 chat-scroll"
            style={{ scrollbarGutter: "stable" }}
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                  <Hand size={48} className="relative text-cyan-400 animate-bounce" />
                </div>
                <p className="text-sm text-gray-400">No messages yet</p>
                <p className="text-xs text-gray-500 mt-1">Start the conversation!</p>
              </div>
            )}

            {messages.map((m, i) => {
              const mine = m.sender === currentUser;
              return (
                <div
                  key={m._id || i}
                  className={`flex ${mine ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 fade-in duration-300`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div
                    className={`group relative max-w-[75%] px-4 py-2.5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${
                      mine
                        ? "bg-gradient-to-br from-cyan-500/80 to-blue-600/80 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30"
                        : "bg-white/5 text-gray-100 shadow-lg border border-white/10"
                    }`}
                  >
                    {mine && (
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity -z-10" />
                    )}
                    <p className="text-sm leading-relaxed break-words">{m.text}</p>
                    <div className={`text-[10px] mt-1.5 text-right ${mine ? "text-cyan-100/70" : "text-gray-400"}`}>
                      {new Date(m.createdAt).toLocaleString([], {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl" />
            <div className="relative flex gap-2 p-2 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                className="flex-1 px-4 py-2.5 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="group relative px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <IoSend className="relative text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
