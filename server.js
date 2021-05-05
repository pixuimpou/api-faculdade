const express = require('express');
const alunos = require('./routes/alunos');
const cursos = require('./routes/cursos');

const app = express();
const PORT = 8080;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
 
app.use('/alunos', alunos);

app.use('/cursos', cursos);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});