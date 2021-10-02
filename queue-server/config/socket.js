import socketIO from "socket.io";

let io = null;

export const initSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      credentials: true,
    },
    allowEIO3: true,
  });
};

export { io };
