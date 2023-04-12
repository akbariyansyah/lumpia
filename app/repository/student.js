const List = (connection, result) => {
    const query = 'SELECT * FROM students'
    connection.query(query, (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows, null);
        }
    });
}

const Detail = (connection, id, result) => {
    const query = 'SELECT * FROM students WHERE id = ?'
    connection.query(query, id, (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows, null);
        }
    });
}

const Create = (connection, student, result) => {
    const query = 'INSERT INTO students (first_name,last_name, phone, email) VALUES(?,?,?,?)'
    connection.query(query, [student.first_name, student.last_name, student.phone, student.email],  (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(student, null);
        }
    });
}

const Update = (connection, student, id, result) => {
    const query = 'UPDATE students SET first_name = ?, last_name = ?, phone = ?, email = ? WHERE id = ?'
    connection.query(query, [student.first_name, student.last_name, student.phone, student.email, id], (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows.affectedRows, null);
        }
    });
}


const Delete = (connection, id, result) => {
    const query = 'DELETE FROM students WHERE id = ?'
    connection.query(query, id, (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows.affectedRows, null);
        }
    });
}


module.exports = { List, Detail, Create, Update, Delete };
