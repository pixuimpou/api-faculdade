const q = require('../mysql/queries');

module.exports = {

    basicSelection: (id) => {
        let query;

        if(id) {
            query =
                q.select(
                    ['a.id_aluno AS matricula, a.nome, c.nome_curso AS curso'],
                    'alunos a',
                    `id_aluno = ${id}`,
                    q.join('INNER JOIN', 'cursos c', 'a.id_curso = c.id_curso'),
                    'a.nome'
            ); 
            return query;
        }
        query = 
            q.select(
                ['a.id_aluno AS matricula, a.nome, c.nome_curso AS curso'],
                'alunos a',
                undefined,
                q.join('INNER JOIN', 'cursos c', 'a.id_curso = c.id_curso'),
                'a.nome'
            );
        
        return query;
    },
        
    
    fullSelection: (id) => {
        let query;

        if(id) {
            query = 
                q.select(
                    ['a.id_aluno AS matricula', 'a.nome', 'a.cpf', 'c.nome_curso as curso'],
                    'alunos a',
                    `id_aluno = ${id}`,
                    q.join('INNER JOIN', 'cursos c', 'a.id_curso = c.id_curso'),
                    'a.nome'
                    );
            
            return query;
        }
        
        query = 
                q.select(
                    ['a.id_aluno AS matricula', 'a.nome', 'a.cpf', 'c.nome_curso as curso'],
                    'alunos a',
                    undefined,
                    q.join('INNER JOIN', 'cursos c', 'a.id_curso = c.id_curso'),
                    'a.nome'
                    );

        return query
    },

    basicSearch: (name) => {
        let query =
                q.select(
                    ['a.id_aluno AS matricula, a.nome, c.nome_curso AS curso'],
                    'alunos a',
                    `a.nome LIKE "%${name}%"`,
                    q.join('INNER JOIN', 'cursos c', 'a.id_curso = c.id_curso'),
                    'a.nome'
            ); 

            return query;
    },

    fullSearch: (name) => {
        query = 
                q.select(
                    ['a.id_aluno AS matricula', 'a.nome', 'a.cpf', 'c.nome_curso as curso'],
                    'alunos a',
                    `a.name LIKE %${name}%`,
                    q.join('INNER JOIN', 'cursos c', 'a.id_curso = c.id_curso'),
                    'a.nome'
                    );
            
            return query;
    },

    delete: (id) => {
        let query = q.delete('alunos', `id_aluno = ${id}`);

        return query;
    },

    insert: (values, columns) => {
        let query = 
            q.insert(
                ['NULL', ...values],
                ['id_aluno', ...columns],
                'alunos');
        
        return query;
    },

    update: (columnString, id) => {
        let query = q.update('alunos', columnString, `id_aluno = ${id}`);

        return query;
    }
}