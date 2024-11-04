// src-api/parkir/parkir.router.js

const { getAllParkir, createparkir, getParkirById , getKapasitasByType } = require('./parkir.controller');

const router = require('express').Router();

router.get('/parkir', getAllParkir);
router.get('/parkir/:id', getParkirById)
router.post('/kapasitas', getKapasitasByType);
router.post('/addparkir', createparkir);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const ParkirController = require('./parkir.controller');

// router.get('/', ParkirController.getAllParkir);
// router.get('/:id', ParkirController.getParkirById);
// router.post('/addparkir', ParkirController.createParkir);
// router.put('/:id', ParkirController.updateParkir);
// router.delete('/:id', ParkirController.deleteParkir);

// module.exports = router;
