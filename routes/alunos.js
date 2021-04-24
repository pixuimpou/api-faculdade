const express = require('express');
const sql = require('../mysql/mysqlHelper');
const q = require('../mysql/queries');
const alunosController = require('../controllers/alunosController');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
        sql.doQuery(
            alunosController.basicSelection(),
            (data) => {
                res.status(200).send(data);
            });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    sql.doQuery(
        alunosController.basicSelection(id),
        (data) => {
            res.status(200).send(data);
        });
});

router.post('/', (req, res) => {
    let columns = Object.getOwnPropertyNames(req.body);
    let values = [];
    
    columns.forEach(column => {
        values.push(JSON.stringify(req.body[column]));
    });

    sql.doQuery(
        alunosController.insert(values, columns),
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
        alunosController.delete(id), 
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
        alunosController.update(columnString, id), 
        (rows) => {
            if(rows.affectedRows > 0) {
                res.status(200).send('Aluno editado com sucesso');
            } else {
                res.status(400).send('Algo deu errado');
            }
        });
});

module.exports = router;