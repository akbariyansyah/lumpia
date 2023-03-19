var express = require('express');
var configReader = require('node-yaml-config');
var bodyParser = require('body-parser');
var database = require('./config/database');
var studentRepo = require('./app/repository/student.js');
var subjectRepo = require('./app/repository/subject.js');

var config = configReader.load('config/config.yml');

connection = database.Connect(config)

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Students . 
app.get('/students', function (req, res) {
    studentRepo.List(connection, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching students" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});

app.get('/students/:id', function (req, res) {
    var id = req.params.id
    studentRepo.Detail(connection, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving student" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});


app.post('/students', function (req, res) {
    var student = req.body;
    studentRepo.Create(connection, student, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating student" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});

app.put('/students/:id', function (req, res) {
    var student = req.body;
    var id = req.params.id;
    studentRepo.Update(connection, student, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating student" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});

app.delete('/students/:id', function (req, res) {
    var id = req.params.id;
    studentRepo.Delete(connection, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting student" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});

// Subjects . 
app.get('/subjects', function (req, res) {
    subjectRepo.List(connection, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching subjects" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});

app.get('/subjects/:id', function (req, res) {
    var id = req.params.id
    subjectRepo.Detail(connection, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving subject" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});

app.post('/subjects', function (req, res) {
    var student = req.body;
    subjectRepo.Create(connection, student, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating subject" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});

app.put('/subjects/:id', function (req, res) {
    var subject = req.body;
    var id = req.params.id;
    subjectRepo.Update(connection, subject, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating subject" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });

});

app.delete('/subjects/:id', function (req, res) {
    var id = req.params.id;
    subjectRepo.Delete(connection, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting subject" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
});


var port = config.app.port
app.listen(port, function () {
    console.log('app listening on port: ' + port);
    console.log(getServiceName());
});

function getServiceName() {
    return `     _                           _       
    | |                         (_)      
    | |    _   _ _ __ ___  _ __  _  __ _ 
    | |   | | | | '_ \` _ \\| '_ \\| |/ _\` |
    | |___| |_| | | | | | | |_) | | (_| |
    |______\\__,_|_| |_| |_| .__/|_|\\__,_|
                          | |            
                          |_|`;
}
