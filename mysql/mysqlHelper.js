const config = require('./mysqlConfig');

module.exports = {

    doQuery: (query, callback) => {
        const con = config.connection();
        let queryResult;
        con.connect(err => {
            if (err) {
                console.log(err);
                throw err;
            }
            con.query(query, (error, results) => {
                if (error) throw error;
                callback(results);
            });
        });
        return queryResult;
    }
}