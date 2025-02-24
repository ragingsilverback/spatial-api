const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = new Pool({
    user: 'db-username',
    host: 'localhost',
    database: 'spatial_db',
    password: 'db-password',
    port: 5432,
});

// API to store point data
app.post('/points', async (req, res) => {
    const { name, lat, lng } = req.body;
    const query = 'INSERT INTO points (name, geom) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326)) RETURNING *';
    try {
        const result = await pool.query(query, [name, lng, lat]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to retrieve all points
app.get('/points', async (req, res) => {
    const query = 'SELECT id, name, ST_AsGeoJSON(geom) as geom FROM points';
    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to update a point
app.put('/points/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lat, lng } = req.body;
    const query = 'UPDATE points SET name = $1, geom = ST_SetSRID(ST_MakePoint($2, $3), 4326) WHERE id = $4 RETURNING *';
    try {
        const result = await pool.query(query, [name, lng, lat, id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to delete a point
app.delete('/points/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM points WHERE id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to store polygon data
app.post('/polygons', async (req, res) => {
    const { name, coordinates } = req.body;
    const query = 'INSERT INTO polygons (name, geom) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326)) RETURNING *';
    try {
        const result = await pool.query(query, [name, JSON.stringify({ type: 'Polygon', coordinates })]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to retrieve all polygons
app.get('/polygons', async (req, res) => {
    const query = 'SELECT id, name, ST_AsGeoJSON(geom) as geom FROM polygons';
    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to update a polygon
app.put('/polygons/:id', async (req, res) => {
    const { id } = req.params;
    const { name, coordinates } = req.body;
    const query = 'UPDATE polygons SET name = $1, geom = ST_SetSRID(ST_GeomFromGeoJSON($2), 4326) WHERE id = $3 RETURNING *';
    try {
        const result = await pool.query(query, [name, JSON.stringify({ type: 'Polygon', coordinates }), id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to delete a polygon
app.delete('/polygons/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM polygons WHERE id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
