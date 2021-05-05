module.exports = {
    select: (columns, table, conditions, join, order) => {
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

        query += ` WHERE 1=1`;

        if(conditions) {
            conditions.forEach(condition => {
                query += ` AND ${condition}`;
            });
        }

        if(order) {
            query += ` ORDER BY ${order}`;
        }
        query += ';';
        return query;
    },

    join: (type, table, condition) => {
        let query = `${type} ${table} ON ${condition}`;
        return query;
    },

    insert: (values, columns, table) => {
        let valueString = '';
        let columnString = '';

        columns.forEach((column, index) => {
            if(index > 0) {
                columnString += `, ${column}`;
            } else {
                columnString += `${column}`;
            }
        })

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
        
        return `INSERT INTO ${table} (${columnString}) VALUES (${valueString});`;
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