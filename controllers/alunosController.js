const q = require('../mysql/queries');

module.exports = {

    basicSelection: () => {
        let query = 
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
        let query = 
            q.select(
                ['a.id_aluno AS matricula', 'a.nome', 'a.cpf', 'c.nome_curso as curso'],
                'alunos a',
                `id_aluno = ${id}`,
                q.join('INNER JOIN', 'cursos c', 'a.id_curso = c.id_curso'),
                'a.nome'
                );

        return query
    },

    delete: (id) => {
        let query = q.delete('alunos', `id_aluno = ${id}`);

        return query;
    }
}