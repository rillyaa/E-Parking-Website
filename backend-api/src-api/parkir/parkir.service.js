// src-api/parkir/parkir.service.js

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
    }
}

// const getAllParkir = async () => {
//     const [rows] = await pool.query(`SELECT * FROM parkir`);
//     return rows;
// };

// const getParkirById = async (id) => {
//     const [rows] = await pool.query(`SELECT * FROM parkir WHERE id_parkir = ?`, [id]);
//     return rows[0];
// };

// const createParkir = async (jenis_kendaraan, total_kapasitas, kapasitas_tersedia) => {
//     const [result] = await pool.query(
//         `INSERT INTO parkir (jenis_kendaraan, total_kapasitas, kapasitas_tersedia) VALUES (?, ?, ?)`,
//         [jenis_kendaraan, total_kapasitas, kapasitas_tersedia]
//     );
//     return { id: result.insertId, jenis_kendaraan, total_kapasitas, kapasitas_tersedia };
// };

// const updateParkir = async (id, jenis_kendaraan, total_kapasitas, kapasitas_tersedia) => {
//     const [result] = await pool.query(
//         `UPDATE parkir SET jenis_kendaraan = ?, total_kapasitas = ?, kapasitas_tersedia = ? WHERE id_parkir = ?`,
//         [jenis_kendaraan, total_kapasitas, kapasitas_tersedia, id]
//     );
//     return result.affectedRows > 0;
// };

// const deleteParkir = async (id) => {
//     const [result] = await pool.query(`DELETE FROM parkir WHERE id_parkir = ?`, [id]);
//     return result.affectedRows > 0;
// };

// module.exports = { getAllParkir, getParkirById, createParkir, updateParkir, deleteParkir };
