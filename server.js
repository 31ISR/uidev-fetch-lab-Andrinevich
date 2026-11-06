const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mywintercar_mods'
};

app.use(async (req, res, next) => {
    try {
        req.db = await mysql.createConnection(dbConfig);
        next();
    } catch (error) {
        console.error('Ошибка подключения к БД:', error);
        res.status(500).json({ error: 'Не удалось подключиться к базе данных' });
    }
});

app.get('/api/mods', async (req, res) => {
    const { search = '', sort = 'new' } = req.query;

    let query = 'SELECT * FROM mods WHERE 1';
    const params = [];

    if (search) {
        query += ' AND (title LIKE ? OR author LIKE ? OR description LIKE ?)';
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
    }

    switch (sort) {
        case 'old':
            query += ' ORDER BY date_added ASC';
            break;
        case 'rating':
            query += ' ORDER BY rating DESC';
            break;
        case 'new':
        default:
            query += ' ORDER BY date_added DESC';
            break;
    }

    try {
        const [rows] = await req.db.execute(query, params);
        await req.db.end();
        res.json(rows);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).json({ error: 'Ошибка при запросе к базе данных' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});