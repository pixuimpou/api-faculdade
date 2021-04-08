const { json } = require('express');
const express = require('express');
const sql = require('../mysql/queries');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    sql.doQuerry(`SELECT 
                    a.id_aluno, 
                    a.nome, 
                    a.cpf,
                    a.id_curso,
                    c.nome_curso
                FROM alunos a
                INNER JOIN cursos c
                ON c.id_curso = a.id_curso
                ;`, (data) => {
                    res.send(data);
                });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    sql.doQuerry(`SELECT
                    id_aluno,
                    nome,
                    cpf,
                    id_curso
                FROM alunos
                WHERE
                    id_aluno = ${id}
                ;`, (data) => {
                    res.send(data);
                });
});

router.post('/', (req, res) => {
    sql.doQuerry(`INSERT INTO alunos
                    VALUES(
                        NULL, 
                        ${JSON.stringify(req.body.nome)}, 
                        ${JSON.stringify(req.body.cpf)}, 
                        ${req.body.id_curso}
                        );`, (rows) => {
                            if(rows.affectedRows > 0) {
                                res.status(201).send('Novo aluno adicionado');
                            } else {
                                res.status(400).send('Ocorreu um erro');
                            }
                            
                        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    sql.doQuerry(`DELETE FROM alunos
                    WHERE id_aluno = ${id}
                    ;`, (rows) => {
                        if(rows.affectedRows > 0) {
                            res.status(202).send('Aluno apagado');
                        } else {
                            res.status(204).send('Sem conteúdo');
                        }
                    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const columns = Object.getOwnPropertyNames(req.body);
    let columnString = ''; 
    columns.forEach((column, index) => {
        if (index === 0) {
            columnString = `${column} = ${JSON.stringify(req.body[column])}`;
        } else {
            columnString = (`${columnString}, ${column} = ${JSON.stringify(req.body[column])}`);
        }
    });
    sql.doQuerry(`UPDATE alunos
                    SET ${columnString}
                    WHERE id_aluno = ${id}`, (rows) => {
                        if(rows.affectedRows > 0) {
                            res.status(200).send('Aluno editado com sucesso');
                        } else {
                            res.status(400).send('Algo deu errado');
                        }
                    })
})

module.exports = router;