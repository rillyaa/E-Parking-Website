const { 
    getAllTamu, 
    createTamu, 
    deleteTamu, 
    checkoutTamu, 
    getTamubyType,
    getGuestData,
    getGuestDatabyType
} = require('./tamu.controller')

const router = require('express').Router();

router.get('/tamu', getAllTamu);
router.get('/guestData', getGuestData);
router.post('/createTamu', createTamu);
router.post('/checkoutTamu', checkoutTamu);
router.post('/dataTamu', getTamubyType);
router.post('/guestByType', getGuestDatabyType);
router.delete('/deleteTamu', deleteTamu);

module.exports = router