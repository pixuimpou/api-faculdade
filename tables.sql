-- CREATING DB
CREATE DATABASE db_faculdade;

-- CREATING TABLES
CREATE TABLE alunos(
    id_aluno int primary key auto_increment,
    nome varchar(50),
    cpf varchar(15) UNIQUE,
    id_curso int
);

CREATE TABLE cursos(
    id_curso int primary key auto_increment,
    nome_curso varchar(50)
);

-- CONSTRAINTS
ALTER TABLE alunos
ADD CONSTRAINT fk_aluno_curso
FOREIGN KEY (id_curso) REFERENCES cursos(id_curso);

-- POPULATING THE DB
INSERT INTO cursos VALUES(NULL, "Medicina");
INSERT INTO cursos VALUES(NULL, "Administração");
INSERT INTO cursos VALUES(NULL, "Design");
INSERT INTO cursos VALUES(NULL, "Ciência da Computação");
INSERT INTO cursos VALUES(NULL, "Direito");

INSERT INTO alunos VALUES(NULL, "Melissa Aline Campos", "848.561.122-52", 5);
INSERT INTO alunos VALUES(NULL, "Marcela Amanda Bernardes", "345.778.421-30", 2);
INSERT INTO alunos VALUES(NULL, "Regina Emily da Paz", "966.159.371-07", 1);
INSERT INTO alunos VALUES(NULL, "Juan Marcos Manoel Silveira", "150.774.795-00", 5);
INSERT INTO alunos VALUES(NULL, "Kaique Severino da Mata", "835.383.471-58", 3);
INSERT INTO alunos VALUES(NULL, "Giovanna Mariane Luzia Drumond", "978.756.147-75", 2);
INSERT INTO alunos VALUES(NULL, "Sophia Eloá Lopes", "269.648.973-48", 3);
INSERT INTO alunos VALUES(NULL, "Carolina Marcela Andrea da Mata", "936.134.129-42", 1);
INSERT INTO alunos VALUES(NULL, "Cláudia Elaine Assunção", "309.589.449-03", 4);
INSERT INTO alunos VALUES(NULL, "Mariane Lopes Santos", "070.499.365-10", 4);
