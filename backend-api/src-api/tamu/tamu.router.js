// const { createGuests } = require('../tamu/tamu.controller');

// const router = require('express').Router();

// router.post('/createTamu', createGuests) 

// src-api/tamu/tamu.router.js

// const express = require('express');
// const router = express.Router();
// const TamuController = require('./tamu.controller');

// router.post('/checkin', TamuController.checkinTamu);

// module.exports = router;

const { getAllTamu, createTamu, deleteTamu, checkoutTamu } = require('./tamu.controller')

const router = require('express').Router();

router.get('/tamu', getAllTamu);
router.post('/createTamu', createTamu);
router.post('/checkoutTamu', checkoutTamu);
router.delete('/deleteTamu', deleteTamu);

module.exports = router