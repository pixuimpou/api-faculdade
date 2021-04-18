const express = require('express');
const sql = require('../mysql/mysqlHelper');
const q = require('../mysql/queries');
const querystring = require('querystring');
const url = require('url');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    const columns = req.query.col;
    const joinTable = req.query.jt;
    const joinCondition = req.query.jc;

    if(req.query.col) {
        sql.doQuery(
            q.select(
                columns,
                'alunos a',
                undefined,
                q.join('INNER JOIN', joinTable, joinCondition)),
            (data) => {
                res.status(200).send(data);
            });
    } else {
        sql.doQuery(
            q.select(
                ['a.id_aluno', 'a.nome', 'a.cpf', 'c.nome_curso AS curso'],
                'alunos a',
                undefined,
                q.join('INNER JOIN', 'cursos c', 'c.id_curso = a.id_curso'),
                'a.nome'),
            (data) => {
                res.status(200).send(data);
            });
    }
    
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    sql.doQuery(
        q.select(
            ['id_aluno', 'nome', 'cpf', 'id_curso'],
            'alunos',
            `id_aluno = ${id}`),
        (data) => {
            res.status(200).send(data);
        });
});

router.post('/', (req, res) => {
    sql.doQuery(
        q.insert(
            ['NULL', JSON.stringify(req.body.nome), JSON.stringify(req.body.cpf), req.body.id_curso],
            'alunos'),
        (rows) => {
                    if(rows.affectedRows > 0) {
                        res.status(201).send('Novo aluno adicionado');
                    } else {
                        res.status(400).send('Ocorreu um erro');
                    }           
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    sql.doQuery(
        q.delete('alunos', `id_aluno = ${id}`), 
        (rows) => {
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

    sql.doQuery(
        q.update('alunos', columnString, `id_aluno = ${id}`), 
        (rows) => {
            if(rows.affectedRows > 0) {
                res.status(200).send('Aluno editado com sucesso');
            } else {
                res.status(400).send('Algo deu errado');
            }
        });
});

module.exports = router;