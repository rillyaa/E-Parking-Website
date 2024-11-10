const { 
    getAllParkir, 
    createparkir, 
    getParkirById, 
    getKapasitasByType, 
    getStatistikByType, 
} = require('./parkir.controller');

const router = require('express').Router();

router.get('/parkir', getAllParkir);
router.get('/parkir/:id', getParkirById)
router.post('/kapasitas', getKapasitasByType);
router.post('/addparkir', createparkir);
router.post('/statistik', getStatistikByType)

module.exports = router;