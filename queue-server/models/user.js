import db from "../config/db";

class User {
  getUserGroups() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user_groups WHERE status = 'active'",
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getCurrentUser(userId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT u.id, u.fullname, u.username, u.status, u.state, u.room, g.is_admin, g.title as group_title FROM users u LEFT JOIN user_groups g ON (g.id = u.group_id) WHERE u.id = '${userId}'`,
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }

  getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE username = '${username}' LIMIT 1`,
        function (err, results, fields) {
          err ? reject(err) : resolve(results[0]);
        }
      );
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users`, function (err, results, fields) {
        err ? reject(err) : resolve(results);
      });
    });
  }

  saveUser({ username, password, fullname, group_id, state }) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (username, password, fullname, group_id, state) VALUES('${username}', '${password}', '${fullname}','${group_id}', '${state}')`,
        function (err, results, fields) {
          err ? reject(err) : resolve(results);
        }
      );
    });
  }
}

module.exports = new User();
