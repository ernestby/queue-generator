import db from "../config/db";

class Db {
  getActiveQueues() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM queues_active", function (err, results, fields) {
        err ? reject(err) : resolve(results);
      });
    });
  }

  getAssignedQueues() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM queues_assigned",
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getAssignedQueue(operatorId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM queues_assigned WHERE operator_id = '${operatorId}' LIMIT 1`,
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  updateOperatorState(operatorId, state = "free") {
    db.query(
      `UPDATE users SET state = '${state}' WHERE id = '${operatorId}'`,
      function (err, results, fields) {
        console.log(err);
      }
    );
  }

  getActiveQueueByGroupId(groupId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM queues_active WHERE group_id = '${groupId}' ORDER BY date_added ASC LIMIT 1`,
        function (err, results, fields) {
          results.length ? resolve(results) : reject("");
        }
      );
    });
  }

  assignQueue(queue, operator) {
    db.query(
      `INSERT INTO queues_assigned (prefix, number, operator_id, room) VALUES('${queue.prefix}', '${queue.number}', '${operator.id}', '${operator.room}')`,
      function (err, results, fields) {
        console.log("assignQueueErr", err);
        console.log("assignQueueResults", results);
      }
    );
  }

  deleteActiveQueueById(id) {
    db.query(
      `DELETE FROM queues_active WHERE id = '${id}'`,
      function (err, results, fields) {}
    );
  }

  addToFinishedQueues(queue, groupId, operatorId) {
    db.query(
      `INSERT INTO queues_finished (prefix, number, group_id, operator_id) VALUES('${queue.prefix}', '${queue.number}', ${groupId},'${operatorId}')`,
      function (err, results, fields) {}
    );
  }

  deleteAssignedQueue(operatorId, number) {
    db.query(
      `DELETE FROM queues_assigned WHERE operator_id = '${operatorId}' AND number = '${number}'`,
      function (err, results, fields) {
        console.log(err);
      }
    );
  }

  addTodayQueue({ groupPrefix, number, groupId }) {
    db.query(
      `INSERT INTO queues_today (prefix, number, group_id) VALUES('${groupPrefix}', '${number}', '${groupId}')`,
      function (err, results, fields) {}
    );
  }

  assignQueueToFreeOperator({ groupId, groupPrefix, number }) {
    const that = this;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE state = 'free' AND group_id = '${groupId}' ORDER BY RAND() LIMIT 1`,
        function (err, results, fields) {
          if (results.length) {
            const freeUser = results[0];

            that.assignQueue({ prefix: groupPrefix, number }, freeUser);
            that.updateOperatorState(freeUser.id, "busy");
            db.query(
              `DELETE FROM queues_active WHERE number = '${number}'`,
              function (err, results, fields) {}
            );
            resolve();
          }
        }
      );
    });
  }

  addActiveQueue({ groupPrefix, number, groupId }) {
    db.query(
      `INSERT INTO queues_active (prefix, number, group_id) VALUES('${groupPrefix}', '${number}', '${groupId}')`,
      function (err, results, fields) {}
    );
  }

  getLastTodayQueueByGroupId(groupId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM queues_today WHERE group_id = '${groupId}' ORDER BY date_added DESC LIMIT 1`,
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getQueueList() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM queues_assigned LEFT JOIN queues_active`,
        function (err, results, fields) {
          console.log(results);
          err ? reject(err) : resolve(results);
        }
      );
    });
  }
}

module.exports = new Db();
