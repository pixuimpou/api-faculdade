const express = require('express');
const sql = require('../mysql/mysqlHelper');
const cursosController = require('../controllers/cursosController');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    sql.doQuery(
        cursosController.basicSelection(),
        (data) => {
            res.status(200).send(data);
        }
    );
});

router.get('/:id/alunos', (req, res) => {
    const id = req.params.id;

    sql.doQuery(
        cursosController.getStudents(id),
        (data) => {
            res.status(200).send(data);
        }
    );
});

router.post('/', (req, res) => {
    let columns = Object.getOwnPropertyNames(req.body);
    let values = [];

    columns.forEach((column, index) => {
        console.log(column)
        if(column !== 'id_curso'){
            values.push(JSON.stringify(req.body[column]));
        } else {
            columns.splice(index, 0);
        }
    });

    sql.doQuery(
        cursosController.insert(values, columns),
        (rows) => {
            if(rows.affectedRows > 0) {
                res.status(201).send('Novo curso adicionado');
            } else {
                res.status(400).send('Ocorreu um erro');
            }
        }
    );
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    sql.doQuery(
        cursosController.delete(id), 
        (rows) => {
            if(rows.affectedRows > 0) {
                res.status(202).send('Curso apagado');
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
        cursosController.update(columnString, id), 
        (rows) => {
            if(rows.affectedRows > 0) {
                res.status(200).send('Curso editado com sucesso');
            } else {
                res.status(400).send('Algo deu errado');
            }
        });
});

module.exports = router;