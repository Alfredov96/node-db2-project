const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cars = await db('cars');
        res.json(cars);
    } catch ({ err }) {
        res.status(500).json({ message: 'Failed to retrieve cars', err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cars = await db('cars').where({ id });

        res.json(cars);
    } catch ({ err }) {

        res.status(500).json({ message: 'Failed to retrieve cars', err });
    }
});

router.post('/', async (req, res) => {
    const carsData = req.body;
    console.log(req.body);
    try {

        const [id] = await db('cars').insert(carsData);
        const newCarEntry = await db('cars').where({ id });

        res.status(201).json(newCarEntry);
    } catch ({ err }) {
        console.log('POST error', { err });
        res.status(500).json({ message: "Failed to store data" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const editedCarData = req.body;
        const editedCarDataEntry = await db('cars')
            .where({ id: req.params.id })
            .update(req.body)
            .then(count => {
                if (count) {
                    res.status(200).json({ message: `${count} record(s) updated` });
                } else {
                    res.status(404).json({ message: 'Account not found' });
                }
            })
    } catch ({ err }) {
        res.status(500).json({ message: 'Could not update the account' });
    }

});

router.delete('/:id', async (req, res) => {
    try {
        db('cars')
            .where({ id: req.params.id })
            .del()
            .then(count => {
                res.status(200).json({ message: `${count} record(s) deleted` });
            })
    } catch ({ err }) {
        res.status(500).json({ message: 'Could not remove the account' });
    }
});

module.exports = router;