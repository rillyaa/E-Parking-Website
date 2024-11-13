const { getAllTamu, createTamu, deleteTamu, checkoutTamu, getTamubyType } = require('./tamu.controller')

const router = require('express').Router();

router.get('/tamu', getAllTamu);
router.post('/createTamu', createTamu);
router.post('/checkoutTamu', checkoutTamu);
router.post('/dataTamu', getTamubyType)
router.delete('/deleteTamu', deleteTamu);

module.exports = router