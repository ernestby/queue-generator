// test.js
const mysql = require("mysql");

class Db {
  connection = "";
  constructor(host, username, password, database) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.database = database;
    this.connect();
  }

  connect() {
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.username,
      password: this.password,
      database: this.database,
    });
    this.connection.connect();
  }

  getUserGroups() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM user_groups WHERE status = 'active'",
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getActiveQueues() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM queues_active",
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getAssignedQueues() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM queues_assigned",
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getAssignedQueue(operatorId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM queues_assigned WHERE operator_id = '${operatorId}' LIMIT 1`,
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getCurrentUser(userId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM users WHERE id = '${userId}'`,
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  updateOperatorState(operatorId, state = "free") {
    this.connection.query(
      `UPDATE users SET state = '${state}' WHERE id = '${operatorId}'`,
      function (err, results, fields) {
        console.log(err);
      }
    );
  }

  getActiveQueueByGroupId(groupId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM queues_active WHERE group_id = '${groupId}' ORDER BY date_added ASC LIMIT 1`,
        function (err, results, fields) {
          results.length ? resolve(results) : reject("");
        }
      );
    });
  }

  assignQueue(queue, operator) {
    this.connection.query(
      `INSERT INTO queues_assigned (prefix, number, operator_id, room) VALUES('${queue.prefix}', '${queue.number}', '${operator.id}', '${operator.room}')`,
      function (err, results, fields) {
        console.log("assignQueueErr", err);
        console.log("assignQueueResults", results);
      }
    );
  }

  deleteActiveQueueById(id) {
    this.connection.query(
      `DELETE FROM queues_active WHERE id = '${id}'`,
      function (err, results, fields) {}
    );
  }

  addToFinishedQueues(queue, groupId, operatorId) {
    this.connection.query(
      `INSERT INTO queues_finished (prefix, number, group_id, operator_id) VALUES('${queue.prefix}', '${queue.number}', ${groupId},'${operatorId}')`,
      function (err, results, fields) {}
    );
  }

  deleteAssignedQueue(operatorId, number) {
    this.connection.query(
      `DELETE FROM queues_assigned WHERE operator_id = '${operatorId}' AND number = '${number}'`,
      function (err, results, fields) {
        console.log(err);
      }
    );
  }

  addTodayQueue({ groupPrefix, number, groupId }) {
    this.connection.query(
      `INSERT INTO queues_today (prefix, number, group_id) VALUES('${groupPrefix}', '${number}', '${groupId}')`,
      function (err, results, fields) {}
    );
  }

  assignQueueToFreeOperator({ groupId, groupPrefix, number }) {
    const that = this;
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM users WHERE state = 'free' AND group_id = '${groupId}' ORDER BY RAND() LIMIT 1`,
        function (err, results, fields) {
          if (results.length) {
            const freeUser = results[0];

            that.assignQueue({ prefix: groupPrefix, number }, freeUser.id);
            that.updateOperatorState(freeUser.id, "busy");
            that.connection.query(
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
    this.connection.query(
      `INSERT INTO queues_active (prefix, number, group_id) VALUES('${groupPrefix}', '${number}', '${groupId}')`,
      function (err, results, fields) {}
    );
  }

  getLastTodayQueueByGroupId(groupId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM queues_today WHERE group_id = '${groupId}' ORDER BY date_added DESC LIMIT 1`,
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getQueueList() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM queues_assigned LEFT JOIN queues_active`,
        function (err, results, fields) {
          console.log(results);
          err ? reject(err) : resolve(results);
        }
      );
    });
  }
}

module.exports = Db;
