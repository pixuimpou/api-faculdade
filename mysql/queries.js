const config = require('./mysqlConfig');

module.exports = {

    doQuerry: (query, callback) => {
        const con = config.connection();
        let queryResult;
        con.connect(err => {
            if (err) {
                console.log(err);
                throw err;
            }
            con.query(query, (err, results) => {
                if (err) throw err;
                callback(results);
            });
        });
        return queryResult;
    }
}