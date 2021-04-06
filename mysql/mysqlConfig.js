const mysql = require('mysql');

module.exports = {
    connection: () => {
        config = {
            host: "localhost",
            database: "db_faculdade",
            user: "root",
            password: "root"
        }
        return mysql.createConnection(config);
    }
}