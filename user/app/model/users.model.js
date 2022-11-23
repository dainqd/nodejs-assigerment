// const connection = require("app/database/db.js");

const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
// const {username} = require("npm/lib/utils/read-user-info");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// constructor
const Users = function(cus) {
    this.id = cus.id;
    this.username = cus.username;
    this.firstName = cus.firstName;
    this.lastName = cus.lastName;
    this.phone = cus.phone;
    this.password = cus.password;
};

Users.create = (newUser, result) => {
    connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created users: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

Users.findById = (id, result) => {
    connection.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Users.getAll = (username, result) => {
    let query = "SELECT * FROM users";

    if (username) {
        query += ` WHERE username LIKE '%${username}%'`;
    }

    connection.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("User: ", res);
        result(null, res);
    });
};

Users.updateById = (id, users, result) => {
    connection.query(
        "UPDATE users SET username = ?, firstName = ?, lastName = ?, phone = ?, password = ? WHERE id = ?",
        [users.username, users.firstName, users.lastName, users.phone, users.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated users: ", { id: id, ...users });
            result(null, { id: id, ...users });
        }
    );
};

Users.remove = (id, result) => {
    connection.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

Users.removeAll = result => {
    connection.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} user`);
        result(null, res);
    });
};

module.exports = Users