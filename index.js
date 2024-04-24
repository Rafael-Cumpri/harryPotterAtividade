const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3036

let sangues = ['Puro', 'Mestiço', 'Trouxa'];
let casas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'atividadeharry',
    password: 'Rcc030706',
    port: 5432,
});

app.use(express.json());

app.get('/bruxos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bruxos');
        res.json({
            total : result.rowCount,
            bruxos: result.rows,
        });
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/bruxos/:filter', async (req, res) => {
    const { filter } = req.params;
    try {
        if (isNaN(req.params.filter)) {
            const result = await pool.query('SELECT * FROM bruxos WHERE nome LIKE $1', [`%${filter}%`]);
            res.status(200).json(result.rows[0]);
        } else {
            const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [filter]);
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/bruxos', async (req, res) => {
    try {
        const { nome, idade, casa, habilidade, blood_status, datadenascimento, patrono } = req.body;

        if (!nome || !idade || !casa || !habilidade || !blood_status || !datadenascimento) {
            throw new Error('Todos os campos são obrigatórios');
        }
        
        if (!sangues.includes(blood_status)) {
            throw new Error('Casa inválida');
        }

        if (!casas.includes(casa)) {
            throw new Error('Blood status inválido');
        }

        if (idade < 0) {
            throw new Error('Idade inválida');
        }

        const result = await pool.query('INSERT INTO bruxos (nome, idade, casa, habilidade, blood_status, datadenascimento, patrono) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nome, idade, casa, habilidade, blood_status, datadenascimento, patrono]);
        res.status(201).json("Bruxo criado com sucesso");
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.put('/bruxos/:id', async (req, res) => {
    try {
        const { nome, idade, casa, habilidade, blood_status, datadenascimento, patrono } = req.body;

        if (!nome || !idade || !casa || !habilidade || !blood_status || !datadenascimento) {
            throw new Error('Todos os campos são obrigatórios');
        }
        
        if (!sangues.includes(blood_status)) {
            throw new Error('Casa inválida');
        }

        if (!casas.includes(casa)) {
            throw new Error('Blood status inválido');
        }

        if (idade < 0) {
            throw new Error('Idade inválida');
        }

        const result = await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, blood_status = $5, datadenascimento = $6, patrono = $7 WHERE id = $8', [nome, idade, casa, habilidade, blood_status, datadenascimento, patrono, req.params.id]);
        res.status(200).json("Bruxo atualizado com sucesso");
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.delete('/bruxos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
        res.status(200).json("Bruxo deletado com sucesso");
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/varinhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM varinhas');
        res.json({
            total : result.rowCount,
            varinhas: result.rows,
        });
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/varinhas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/varinhas', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_criacao } = req.body;

        if (!material || !comprimento || !nucleo || !data_criacao) {
            throw new Error('Todos os campos são obrigatórios');
        }

        const result = await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, data_criacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_criacao]);
        res.status(201).json("Varinha criada com sucesso");
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.put('/varinhas/:id', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_criacao } = req.body;

        if (!material || !comprimento || !nucleo || !data_criacao) {
            throw new Error('Todos os campos são obrigatórios');
        }

        const result = await pool.query('UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_criacao = $4 WHERE id = $5', [material, comprimento, nucleo, data_criacao, req.params.id]);
        res.status(200).json("Varinha atualizada com sucesso");
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.delete('/varinhas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
        res.status(200).json("Varinha deletada com sucesso");
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});