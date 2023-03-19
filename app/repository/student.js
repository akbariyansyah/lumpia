


var List = (connection, result) => {
    var query = 'SELECT * FROM students'
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
    var query = 'SELECT * FROM students WHERE id = ?'
    connection.query(query, id, function (error, rows, fields) {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows, null);
        }
    });
}

var Create = (connection, student, result) => {
    var query = 'INSERT INTO students (first_name,last_name, phone, email) VALUES(?,?,?,?)'
    connection.query(query, [student.firstName, student.lastName, student.phone, student.Email], function (error, rows, fields) {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(student, null);
        }
    });
}

var Update = (connection, student, id, result) => {
    var query = 'UPDATE students SET first_name = ?, last_name = ?, phone = ?, email = ? WHERE id = ?'
    connection.query(query, [student.firstName, student.lastName, student.phone, student.Email, id], function (error, rows, fields) {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows.affectedRows, null);
        }
    });
}


var Delete = (connection, id, result) => {
    var query = 'DELETE FROM students WHERE id = ?'
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
