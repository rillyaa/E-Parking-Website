const { 
    getAllTamu, 
    createTamu, 
    deleteTamu, 
    checkoutTamu, 
    getTamubyName, 
} = require('./tamu.service');

module.exports = {
    getAllTamu: (req, res) => {
        getAllTamu((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                error: false,
                message: 'Tamu Fetched Successfully',
                listTamu: results
            });
        });
    },

    createTamu: (req, res) => {
        const data = req.body;
        createTamu(data, (error, results) => {
            if(error){
                console.error('Error Create Tamu Data: ', error);
                return res.status(500).json({
                    error: true,
                    message: 'Failed to Create Tamu Data'
                });
            }

            if(data.catatan == 'Parkir Luar'){
                return res.status(200).json({
                    error: false, 
                    message: 'Parkir Penuh. Tamu dicatat dengan catatan parkir luar'
                });
            } else {
                return res.status(200).json({
                    error: false, 
                    message: 'Tamu Data Created Successfully and checked into parkir dalam'
                })
            }
        })
    },

    deleteTamu: (req,res) => {
        const data = req.body;
        deleteTamu(data, (error, results) => {
            if(error) {
                console.error('Error Deleting Tamu Data: ', error);
                return res.json(500).json({
                    error: true,
                    message: 'Failed to Delete Tamu'
                });
            }
            return res.status(200).json({
                error: false, 
                message: results.message
            });
        });
    },

    checkoutTamu: (req, res) => {
        const data = req.body;
        checkoutTamu(data, (error, results) => {
            if(error){
                console.error('Error Checkout Tamu Data: ', error);
                return res.json(500).json({
                    error: true,
                    message: 'Failed to Checkout Tamu'
                });
            }
            return res.status(200).json({
                error: false, 
                message: results.message
            });
        });
    },

    getTamubyName: (req, res) => {
        const data = req.body;
        getTamubyName(data, (error, results) => {
            if(error){
                console.error('Error Mencari Nama Tamu: ', error);
                return res.status(500).json({
                    error: true,
                    message: 'Failed Fetch Data Tamu'
                });
            }
            return res.status(200).json({
                error: false,
                message: 'Data Tamu Fetched Successfully',
                DataTamu: results
            });
        });
    }
}