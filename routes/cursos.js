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
    )
});

router.get('/:id/alunos', (req, res) => {
    const id = req.params.id;

    sql.doQuery(
        cursosController.getStudents(id),
        (data) => {
            res.status(200).send(data);
        }
    )
});

module.exports = router;