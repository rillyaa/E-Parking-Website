const pool = require('../../config/database');

module.exports = {
    getAllParkir: callback => {
        pool.query(
            `SELECT * FROM parkir`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        );
    },

    createparkir: (data, callback) => {
        pool.query(
            `INSERT INTO parkir(jenis_kendaraan, total_kapasitas, kapasitas_tersedia)
            VALUES (?,?,?)`,
            [
                data.jenis_kendaraan,
                data.total_kapasitas,
                data.kapasitas_tersedia
            ],
            (error, results, fields)=>{
                if(error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },
    
    getParkirById: (id, callback) => {
        pool.query(
            `SELECT * FROM parkir WHERE id_parkir = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    getKapasitasByType: (jenis_kendaraan, callback) => {
        pool.query(
            `SELECT total_kapasitas, kapasitas_tersedia FROM parkir WHERE jenis_kendaraan = ?`,
            [jenis_kendaraan],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                if(results.length === 0){
                    return callback(null, null)
                }
                return callback(null, results[0]);
            }
        )
    },

    getStatistikByType: (jenis_kendaraan, callback) => {
        pool.query(
            `SELECT 
                p.total_kapasitas,
                p.kapasitas_tersedia,
                COUNT(c.id_tamu) AS total_pengunjung
            FROM parkir p
            LEFT JOIN tamu t ON t.jenis_kendaraan = p.jenis_kendaraan
            LEFT JOIN checkin c ON c.id_tamu = t.id_tamu AND c.waktu_checkout IS NULL
            WHERE p.jenis_kendaraan = ?
            GROUP BY p.total_kapasitas, p.kapasitas_tersedia`,
            [jenis_kendaraan],
            (error, results) => {
                if(error) {
                    return callback(error);
                }
                if(results.length === 0){
                    return callback(null, null);
                }
                return callback(null, results[0]);
            }
        )
    }
}