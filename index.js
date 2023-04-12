const express = require('express');
const configReader = require('node-yaml-config');
const bodyParser = require('body-parser');
const database = require('./config/database');
const StudentRoutes = require('./app/routes/student.js')
const SubjectRoutes = require('./app/routes/subject.js');
const fs = require("fs");

const config = configReader.load('config/config.yml');

connection = database.Connect(config)

const app = express();
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
StudentRoutes.StudentRoutes(app)

// Subjects . 
SubjectRoutes.SubjectRoutes(app)

app.get("/ping", (req, res) => {
    res.send({
        "appVersion": "1.0.0",
        "appName": "Lumpia",
        "env": "local"
    });
})

const port = config.app.port
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
