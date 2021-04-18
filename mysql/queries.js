module.exports = {
    select: (columns, table, condition, join, order) => {
        let columnString = '';
        let query = '';

        columns.forEach((column, index) => {
            if (index > 0) {
                columnString += `, ${column}`;
            } else {
                columnString += `${column}`;
            }
        });

        query = `SELECT ${columnString} FROM ${table}`;

        if (join) {
            query += ` ${join}`;
        }

        if(condition) {
            query += ` WHERE ${condition}`;
        }

        if(order) {
            query += ` ORDER BY ${order}`;
        }
        console.log(query)
        query += ';';
        return query;
    },

    join: (type, table, condition) => {
        let query = `${type} ${table} ON ${condition}`;
        return query;
    },

    insert: (values, table) => {
        let valueString = '';
        values.forEach((value, index) => {
            if(index > 0) {
                if(value) {
                    valueString += `, ${value}`;
                } else {
                    valueString += `, NULL`;
                }
            } else {
                if(value) {
                    valueString += `${value}`;
                } else {
                    valueString += `NULL`;
                } 
            } 
        });
        return `INSERT INTO ${table} VALUES (${valueString});`;
    },

    delete: (table, condition) => {
        let query = `DELETE FROM ${table} WHERE ${condition};`;
        return query;
    },

    update: (table, columnString, condition) => {
        let query = `UPDATE ${table} SET ${columnString} WHERE ${condition};`
        return query;
    }
}