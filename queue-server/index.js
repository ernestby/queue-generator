require("dotenv").config();
const consola = require("consola");

const express = require("express");
const app = express();
var Db = require("./db");

var db = new Db(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_NAME
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

// App setup
const port = process.env.PORT;

server.listen(port, () => {
  consola.success({
    message: `App listening at http://localhost:${port}`,
    badge: true,
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World 2!");
});

app.get("/get_active_queues", (req, res) => {
  db.getActiveQueues().then((result) => res.send(result));
});

app.get("/get_assigned_queues", (req, res) => {
  db.getAssignedQueues().then((result) => res.send(result));
});

app.get("/get_usergroups", (req, res) => {
  db.getUserGroups().then((result) => res.send(result));
});

app.get("/get_assigned_queue", (req, res) => {
  db.getAssignedQueue(req.query.operatorId).then((result) => res.send(result));
});

app.get("/get_current_user", (req, res) => {
  db.getCurrentUser(req.query.id).then((result) => res.send(result));
});

app.put("/update_state", (req, res) => {
  console.log(req.body.params.operatorId, req.body.params.state);
  db.updateOperatorState(req.body.params.operatorId, req.body.params.state);
  io.emit("update", {});
  res.send({});
});

app.post("/start_serve", (req, res) => {
  const operator = req.body.operator;
  console.log("operator", operator);
  db.getActiveQueueByGroupId(operator.groupId)
    .then((result) => {
      db.assignQueue(result[0], operator);
      db.deleteActiveQueueById(result[0].id);
      db.updateOperatorState(operator.id, "busy");
    })
    .catch(() => {
      db.updateOperatorState(operator.id, "free");
    })
    .finally(() => {
      io.emit("update", {});
    });
});

app.post("/generate_queue_number", (req, res) => {
  const groupId = req.body.groupId;
  const groupPrefix = req.body.groupPrefix;
  var nextNumber = "";

  db.getLastTodayQueueByGroupId(groupId).then((lastTodayQueue) => {
    if (lastTodayQueue.length) {
      nextNumber = parseInt(lastTodayQueue[0].number) + 1;
      db.addTodayQueue({ groupPrefix, number: nextNumber, groupId });
      db.addActiveQueue({ groupPrefix, number: nextNumber, groupId });
    } else {
      nextNumber = 1;
      db.addTodayQueue({ groupPrefix, number: nextNumber, groupId });
      db.addActiveQueue({ groupPrefix, number: nextNumber, groupId });
    }

    db.assignQueueToFreeOperator({
      groupId,
      groupPrefix,
      number: nextNumber,
    }).then(() => io.emit("update", {}));

    io.emit("update", {});
    res.send({});
  });
});

app.post("/finish_current_queue", (req, res) => {
  const operator = req.body.operator;
  const queue = req.body.queue;

  const pause = req.body.break || false;

  // открепляем очередь от пользователя
  db.deleteAssignedQueue(operator.id, queue.number);

  if (pause) {
    db.updateOperatorState(operator.id, "break");
    io.emit("update", {});
  } else {
    // пытаемся найти новую очередь
    db.getActiveQueueByGroupId(operator.groupId)
      .then((activeQueue) => {
        console.log("naiden", activeQueue[0]);
        db.assignQueue(activeQueue[0], operator);
        db.deleteActiveQueueById(activeQueue[0].id);
        db.updateOperatorState(operator.id, "busy");
      })
      .catch(() => {
        db.updateOperatorState(operator.id, "free");
      })
      .finally(() => {
        io.emit("update", {});
      });
  }
  // добавляем очередь в таблицу завершенных
  db.addToFinishedQueues(
    { prefix: queue.prefix, number: queue.number },
    operator.groupId,
    operator.id
  );
  res.send({});
});

// connection.end();
