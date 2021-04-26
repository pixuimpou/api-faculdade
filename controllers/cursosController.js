const q = require('../mysql/queries');

module.exports = {
    basicSelection: (id) => {
        let query;

        if(id) {
            query = 
                q.select(
                    ['id_curso, nome_curso AS curso'],
                    'cursos',
                    `id_curso = ${id}`,
                    undefined,
                    'nome_curso'
                );

            return query;    
        }
        query =
            q.select(
                ['id_curso, nome_curso AS curso'],
                'cursos',
                undefined,
                undefined,
                'nome_curso'
            );
        
        return query;
    },

    getStudents: (id) => {
        let query;

        query =
            q.select(
                ['a.nome'],
                'cursos c',
                `c.id_curso = ${id}`,
                q.join('INNER JOIN', 'alunos a', 'a.id_curso = c.id_curso'),
                undefined
        );

        return query;
    }
}