-- CREATING DB
CREATE DATABASE db_faculdade;

-- CREATING TABLES
CREATE TABLE alunos(
    id_aluno int primary key auto_increment,
    nome varchar(50),
    cpf char(15) UNIQUE,
    id_curso int
);

CREATE TABLE cursos(
    id_curso int primary key auto_increment,
    nome_curso varchar(50) UNIQUE
);

-- CONSTRAINTS
ALTER TABLE alunos
ADD CONSTRAINT fk_aluno_curso
FOREIGN KEY (id_curso) REFERENCES cursos(id_curso);