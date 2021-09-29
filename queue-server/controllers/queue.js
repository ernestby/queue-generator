import db from "../models/queue";
import { io } from "../config/socket";

class queue {
  async main(req, res) {
    res.send("queue root");
  }

  getActiveQueues(req, res) {
    db.getActiveQueues().then((result) => res.send(result));
  }

  getAssignedQueues(req, res) {
    db.getAssignedQueues().then((result) => res.send(result));
  }

  getUsergroups(req, res) {
    db.getUserGroups().then((result) => res.send(result));
  }

  getAssignedQueue(req, res) {
    db.getAssignedQueue(req.query.operatorId).then((result) =>
      res.send(result)
    );
  }

  getCurrentUser(req, res) {
    db.getCurrentUser(req.query.id).then((result) => res.send(result));
  }

  updateState(req, res) {
    db.getCurrentUser(req.query.id).then((result) => res.send(result));
    db.updateOperatorState(req.body.params.operatorId, req.body.params.state);
    io.emit("update", {});
    res.send({});
  }

  startServe(req, res) {
    // console.log("start serve", io);
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
        res.send({});
      });
  }

  generateQueue(req, res) {
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
  }

  finishQueue(req, res) {
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
  }
}

module.exports = new queue();
