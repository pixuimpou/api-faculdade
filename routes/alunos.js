const express = require('express');
const sql = require('../mysql/mysqlHelper');
const alunosController = require('../controllers/alunosController');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    const searchName = req.query.name;
    const searchCourse = req.query.course;
    const orderBy = req.query.order;

    let order;

    if(!orderBy || orderBy === 'id-desc'){
        order = 'a.id_aluno DESC';
    }
    else if(orderBy === 'id-asc'){
        order = 'a.id_aluno ASC';
    }
    else if(orderBy === 'name-asc'){
        order = 'a.nome ASC';
    }
    else if(orderBy === 'name-desc'){
        order = 'a.nome DESC';
    }
    else if(orderBy === 'curso-asc'){
        order = 'c.nome_curso ASC';
    }
    else if(orderBy === 'curso-desc'){
        order = 'c.nome_curso DESC';
    }

    if(searchName || searchCourse) {
        let name;
        let course;

        if (searchName){
            name = searchName.replace(/[\+]/g, ' ');
        }
        if (searchCourse){
            course = searchCourse.replace(/[\+]/g, ' ');
        }
        
        sql.doQuery(
            alunosController.basicSearch(name, course, order),
            (data) => {
                res.status(200).send(data);
            });
    } else {
        sql.doQuery(
            alunosController.basicSelection(undefined, order),
            (data) => {
                res.status(200).send(data);
            });
    }
    
});

router.get('/full', (req, res) => {
    sql.doQuery(
        alunosController.fullSelection(),
        (data) => {
            res.status(200).send(data);
        });
});

router.get('/full/:id', (req, res) => {
    const id = req.params.id;

    sql.doQuery(
        alunosController.fullSelection(id),
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
    
    columns = columns.filter(column => column != 'id_aluno');

    columns.forEach((column) => {
        console.log(column)
        if(column !== 'id_aluno'){
            values.push(JSON.stringify(req.body[column]));
        }  
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