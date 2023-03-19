
var express = require('express');
var configReader = require('node-yaml-config');
var bodyParser = require('body-parser');
const mysql = require('mysql');

var config = configReader.load('config/config.yml');


connection = getConnection(config);
connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Students . 
app.get('/students', function (req, res) {
    var query = 'SELECT * FROM students'
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "error": error
            })
        } else {
            res.send({
                "code": 200,
                "data": results
            });
        }
    });
});

app.get('/students/:id', function (req, res) {
    var id = req.params.id
    var query = 'SELECT * FROM students WHERE id = ?'
    connection.query(query, id, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "error": error
            })
        } else {
            res.send({
                "code": 200,
                "data": results
            });
        }
    });
});


app.post('/students', function (req, res) {
    var student = req.body;
    var query = 'INSERT INTO students (first_name,last_name, phone, email) VALUES(?,?,?,?)'
    connection.query(query, [student.firstName, student.lastName, student.phone, student.Email], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            res.send({
                "code": 200,
                "data": student
            });
        }
    });
});

app.put('/students/:id', function (req, res) {
    var student = req.body;
    var id = req.params.id;
    var query = 'UPDATE students SET first_name = ?, last_name = ?, phone = ?, email = ? WHERE id = ?'
    connection.query(query, [student.firstName, student.lastName, student.phone, student.Email, id], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            res.send({
                "code": 200,
                "data": student
            });
        }
    });
});

app.delete('/students/:id', function (req, res) {
    var id = req.params.id;
    var query = 'DELETE FROM students WHERE id = ?'
    connection.query(query, id, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            res.send({
                "code": 200,
                "data": null
            });
        }
    });
});

// Subjects . 
app.get('/subjects', function (req, res) {
    connection.query(
        'SELECT * FROM subjects',
        (error, results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
            if (error) {
                console.log(error);
            };
        }
    );
});

app.get('/subjects/:id', function (req, res) {
    var id = req.params.id
    var query = 'SELECT * FROM subjects WHERE  id = ' + id
    connection.query(query,
        (error, subject) => {
            res.setHeader('Content-Type', 'application/json');
            res.json(subject);
            if (error) {
                console.log(error);
            };
        }
    );
});

app.post('/subjects', function (req, res) {
    var subject = req.body;
    var query = 'INSERT INTO subjects (name, description) VALUES(?,?)'
    connection.query(query, [subject.name, subject.description], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            res.send({
                "code": 200,
                "data": subject
            });
        }
    });
});

app.put('/subjects/:id', function (req, res) {
    var subject = req.body;
    var id = req.params.id;
    var query = 'UPDATE subjects SET name = ?, description = ? WHERE id = ?'
    connection.query(query, [subject.name, subject.description, id], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            res.send({
                "code": 200,
                "data": subject
            });
        }
    });
});

app.delete('/subjects/:id', function (req, res) {
    var id = req.params.id;
    var query = 'DELETE FROM subjects WHERE id = ?'
    connection.query(query, id, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": error
            })
        } else {
            res.send({
                "code": 200,
                "data": null
            });
        }
    });
});


var port = config.app.port
app.listen(port, function () {
    console.log('Example app listening on port: ' + port);
});


function getConnection(config) {
    return mysql.createConnection({
        host: config.database.host,
        user: config.database.username,
        password: config.database.password,
        database: config.database.dbName
    });
}