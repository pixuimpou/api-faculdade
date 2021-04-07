const express = require('express');
const sql = require('../mysql/queries');

const router = express.Router();
const app = express();

router.use(express.json());

router.get('/', (req, res) => {
    sql.doQuerry(`SELECT 
                    id_aluno, 
                    nome, 
                    cpf,
                    id_curso
                FROM alunos
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
    
module.exports = router;