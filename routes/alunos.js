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

module.exports = router;