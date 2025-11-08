const db = require('../config/db');

async function getAllRiders(req, res) {
    try {
        const qry = 'SELECT * FROM rhfd_riders';
        const [riders] = await db.query(qry);
        res.json(riders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRiderById(req, res) {
    try {
        const qry = 'SELECT * FROM rhfd_riders WHERE rider_id = ?';
        const [rider] = await db.query(qry, [req.params.id]);
        if (rider.length === 0) return res.status(404).json({ message: 'Rider not found' });
        res.json(rider[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createRider(req, res) {
    try {
        const { name, email, phone } = req.body;
        const insertQry = 'INSERT INTO rhfd_riders (name, email, phone) VALUES (?, ?, ?)';
        const [result] = await db.query(insertQry, [name, email, phone]);

        const selectQry = 'SELECT * FROM rhfd_riders WHERE rider_id = ?';
        const [rider] = await db.query(selectQry, [result.insertId]);
        res.status(201).json(rider[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateRider(req, res) {
    try {
        const { name, email, phone } = req.body;
        const qry = 'UPDATE rhfd_riders SET name = ?, email = ?, phone = ? WHERE rider_id = ?';
        await db.query(qry, [name, email, phone, req.params.id]);
        res.json({ message: 'Rider updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteRider(req, res) {
    try {
        const qry = 'DELETE FROM rhfd_riders WHERE rider_id = ?';
        await db.query(qry, [req.params.id]);
        res.json({ message: 'Rider deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllRiders,
    getRiderById,
    createRider,
    updateRider,
    deleteRider,
};