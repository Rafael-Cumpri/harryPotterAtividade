-- Criar banco de dados
CREATE DATABASE atividadeharry;

-- Acessar
\c atividadeharry
USE atividadeharry;

-- Criar tabela
CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(256) NOT NULL,
    idade INT NOT NULL,
    casa VARCHAR(256) NOT NULL,
    habilidade VARCHAR(256) NOT NULL,
    blood_status VARCHAR(256) NOT NULL,
    datadenascimento DATE NOT NULL,
    patrono VARCHAR(100)
);

CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY NOT NULL,
    material VARCHAR(256) NOT NULL,
    comprimento INT NOT NULL,
    nucleo VARCHAR(256) NOT NULL,
    data_criacao DATE NOT NULL
);