
const List = (connection, result) => {
    const query = 'SELECT * FROM subjects'
    connection.query(query,  (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows, null);
        }
    });
}

const Detail = (connection, id, result) => {
    const query = 'SELECT * FROM subjects WHERE id = ?'
    connection.query(query, id,  (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows, null);
        }
    });
}

const Create = (connection, subject, result) => {
    const query = 'INSERT INTO subjects (name, description) VALUES(?,?)'
    connection.query(query, [subject.name, subject.description],  (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(subject, null);
        }
    });
}

const Update = (connection, subject, id, result) => {
    const query = 'UPDATE subjects SET name = ?, description = ? WHERE id = ?'
    connection.query(query, [subject.name, subject.description, id],  (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows.affectedRows, null);
        }
    });
}


const Delete = (connection, id, result) => {
    const query = 'DELETE FROM subjects WHERE id = ?'
    connection.query(query, id,  (error, rows, fields) => {
        if (error) {
            console.log("error ocurred", error);
            result(null, error);
        } else {
            result(rows.affectedRows, null);
        }
    });
}


module.exports = { List, Detail, Create, Update, Delete };