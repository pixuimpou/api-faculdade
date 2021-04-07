const express = require('express');
const alunos = require('./routes/alunos');

const app = express();
const PORT = 8080;


app.use('/alunos', alunos);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});