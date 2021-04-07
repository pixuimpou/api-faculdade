let query = '';

let builder = {
    select: (columns, table) => {
        let columnNames = '';
        columns.forEach((column, index) => {
            if (index > 0) {
                columnNames += `, ${column}`;
            } else {
                columnNames += `${column}`;
            }
            
        });
        query = `SELECT ${columnNames} FROM ${table}`;
        return builder;
    },

    where: (params) => {
        query = `${query} WHERE ${params}`;
        return builder;
    },

    end: () => {
        let aux = query;
        query = '';
        return `${aux};`
    } 
}

module.exports = builder;