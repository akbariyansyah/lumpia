const mysql = require('mysql');

let Connect = (config) => {
    connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.username,
        password: config.database.password,
        database: config.database.dbName
    })
    connection.connect((err) => {
        if (err) {
            console.log('error connecting: ' + err.stack);
            return;
        }
        console.log('success connected to mysql !');
    });

    return connection;
}

module.exports = { Connect };