const { 
    getAllParkir, 
    createparkir, 
    getParkirById , 
    getKapasitasByType, 
    getStatistikByType 
} = require('./parkir.service');

module.exports = {
    getAllParkir: (req, res) => {
        getAllParkir((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                error: false,
                message: 'Data Pakir fetched successfully',
                listParkir: results
            });
        });
    },

    createparkir: (req, res) => {
        const data = req.body;
        createparkir(data, (error, results) => {
            if(error) {
                console.error('Error create parkir data: ', error)
                return res.status(500).json({
                    error: true,
                    message: 'Failed to Create Parkir Data'
                })
            }
            return res.status(200).json({
                error: false,
                message: 'Parkir Data Created Successfully'
            });
        });
    },

    getParkirById: (req, res) => {
        const id = req.params.id;
        getParkirById(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    error: true, 
                    message: 'Data Parkir not found'
                });
            }
            return res.json({
                error: false,
                message: 'Data Parkir Found!',
                dataParkir: results
            });
        });
    },

    getKapasitasByType: (req, res) => {
        const {jenis_kendaraan} = req.body;
        console.log('Menerima permintaan untuk jenis kendaraan:', jenis_kendaraan);
        getKapasitasByType(jenis_kendaraan, (err, results) => {
            if(err){
                console.error('Error Getting Kapasitas: ', err);
                return res.status(500).json({
                    error: true,
                    message: 'Failed to fetch Kapasitas Data'
                });
            }
            if(!results){
                return res.status(400).json({
                    error: true,
                    message: 'Data Parkir not Found!'
                })
            }
            return res.status(200).json({
                error: false, 
                message: 'Kapasitas Data Fetched Sucessfully',
                data: results
            })
        })
    },

    getStatistikByType: (req, res) => {
        const {jenis_kendaraan} = req.body;
        console.log('API Menerima Permintaan untuk Jenis Kendaraan:', jenis_kendaraan);
        getStatistikByType(jenis_kendaraan, (err, results) => {
            if(err){
                console.error('Error Getting Statistik Data: ', err);
                return res.status(500).json({
                    error: true,
                    message: 'Failed to fetch Statistik Data'
                });
            }
            if(!results){
                return res.status(400).json({
                    error: true,
                    message: 'Data Statistik not Found!'
                })
            }
            return res.status(200).json({
                error: false, 
                message: 'Statistik Data Fetched Sucessfully',
                data: {
                    total_kapasitas: results.total_kapasitas,
                    total_pengunjung: results.total_pengunjung,
                    kapasitas_tersedia: results.kapasitas_tersedia,
                }
            })
        })
    }
}