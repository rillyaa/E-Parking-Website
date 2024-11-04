// // src-api/parkir/parkir.controller.js

// const ParkirService = require('./parkir.service');

// const getAllParkir = async (req, res) => {
//     try {
//         const data = await ParkirService.getAllParkir();
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getParkirById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const data = await ParkirService.getParkirById(id);
//         if (!data) return res.status(404).json({ message: "Parkir not found" });
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const createParkir = async (req, res) => {
//     try {
//         const { jenis_kendaraan, total_kapasitas, kapasitas_tersedia } = req.body;
//         const data = await ParkirService.createParkir(jenis_kendaraan, total_kapasitas, kapasitas_tersedia);
//         res.status(201).json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const updateParkir = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { jenis_kendaraan, total_kapasitas, kapasitas_tersedia } = req.body;
//         const data = await ParkirService.updateParkir(id, jenis_kendaraan, total_kapasitas, kapasitas_tersedia);
//         if (!data) return res.status(404).json({ message: "Parkir not found" });
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const deleteParkir = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const success = await ParkirService.deleteParkir(id);
//         if (!success) return res.status(404).json({ message: "Parkir not found" });
//         res.status(200).json({ message: "Parkir deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { getAllParkir, getParkirById, createParkir, updateParkir, deleteParkir };

const { getAllParkir, createparkir, getParkirById , getKapasitasByType} = require('./parkir.service');

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
    }
}