const { getAllTamu, createTamu, deleteTamu, checkoutTamu } = require('./tamu.controller')

const router = require('express').Router();

router.get('/tamu', getAllTamu);
router.post('/createTamu', createTamu);
router.post('/checkoutTamu', checkoutTamu);
router.delete('/deleteTamu', deleteTamu);

module.exports = router