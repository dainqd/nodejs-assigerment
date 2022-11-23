const express = require("express");
const database = require("../database/db");
const path = require("path");
const {query} = require("express");
const users = require("../controller/users.controller");
module.exports = app => {
    const users = require("../controller/users.controller.js");
    var path = require('path');

    var router = require("express").Router();

    // Create a new users
    router.post("/api/users/", users.create);

    // Retrieve all users
    router.get("/api/users/", users.findAll);

    // Retrieve a single users with id
    router.get("/api/users/:id", users.findOne);

    // Update a  with id
    router.put("/api/users/:id", users.update);

    // Delete a  with id
    router.delete("/api/users/:id", users.delete);

    // Delete all
    router.delete("/api/users/", users.deleteAll);

    app.set('views', path.join(__dirname, '../config/views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, 'public')));

    /* GET home page. */
    router.get('/register', function (req, res, next) {
        res.render('register', {title: 'Express', session: req.session});
    });

    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Express', session: req.session});
    });

    router.get('/views', function (req, res, next) {
        var sql='SELECT * FROM users';
        database.query(sql, function (err, data, fields) {
            if (err) throw err;
            res.render('view', {title: 'Express', userData: data});
        });
    });

    router.post('/create', function(req, res, next) {

        // store all the user input data
        const userDetails=req.body;

        // insert user data into users table
        var sql = 'INSERT INTO users SET ?';
        database.query(sql, userDetails,function (err, data) {
            if (err) throw err;
            console.log("User register successfully ");
        });
        res.redirect('/views');  // redirect to user form page after inserting the data
    });

    app.use('/', router);

    module.exports = router;
};