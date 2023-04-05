var express = require('express');
var configReader = require('node-yaml-config');
var bodyParser = require('body-parser');
var database = require('./config/database');
var subjectRepo = require('./app/repository/subject.js');
var studentController = require('./app/controller/student.js')
const fs = require("fs");

var config = configReader.load('config/config.yml');

connection = database.Connect(config)

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};


let demoLogger = (req, res, next) => { //middleware function
    let current_datetime = new Date();
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
    let log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
    console.log(log);
    fs.appendFile("request_logs.log", log + "\n", err => {
        if (err) {
            console.log(err);
        }
    });
    next();
};

app.use(demoLogger)

// Students . 
app.get('/students', studentController.ListController);

app.get('/students/:id', studentController.DetailController);

app.post('/students', studentController.CreateController);

app.put('/students/:id', studentController.UpdateController);

app.delete('/students/:id', studentController.DeleteController);

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



let port = config.app.port
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
