
var List = (connection, result) => {
    var query = 'SELECT * FROM subjects'
    connection.query(query, function (error, rows, fields) {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows, null);
        }
    });
}

var Detail = (connection, id, result) => {
    var query = 'SELECT * FROM subjects WHERE id = ?'
    connection.query(query, id, function (error, rows, fields) {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows, null);
        }
    });
}

var Create = (connection, subject, result) => {
    var query = 'INSERT INTO subjects (name, description) VALUES(?,?)'
    connection.query(query, [subject.name, subject.description], function (error, rows, fields) {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(subject, null);
        }
    });
}

var Update = (connection, subject, id, result) => {
    var query = 'UPDATE subjects SET name = ?, description = ? WHERE id = ?'
    connection.query(query, [subject.name, subject.description, id], function (error, rows, fields) {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows.affectedRows, null);
        }
    });
}


var Delete = (connection, id, result) => {
    var query = 'DELETE FROM subjects WHERE id = ?'
    connection.query(query, id, function (error, rows, fields) {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows.affectedRows, null);
        }
    });
}


module.exports = { List, Detail, Create, Update, Delete };