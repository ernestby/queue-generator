import http from "http";
import express from "express";
import consola from "consola";
import cors from "cors";
import authRouter from "./router/auth";
import queueRouter from "./router/queue";

import { initSocket, io } from "./config/socket";
import { PORT } from "./config/constants";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
initSocket(server);

app.use("/auth", authRouter);
app.use("/queue", queueRouter);

server.listen(PORT, () => {
  consola.success({
    message: `App listening at http://localhost:${PORT}`,
    badge: true,
  });
});

io.on("connection", (socket) => {
  consola.success({ message: "Socket connection", badge: true });
});
