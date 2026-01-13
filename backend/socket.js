export default function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);
    // Joined private room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log("User joined room:", roomId);
    });
    // Send message privately
    socket.on("send_message", (data) => {
      io.to(data.roomId).emit("receive_message", data);  //by using io.to() -> sends msg to only those people who once existed in that room
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
