const pool = require('../../config/database.js');
// const moment = require('moment');

module.exports = {
    getAllTamu: callback => {
        pool.query(
            `SELECT * FROM tamu`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }, 

    createTamu: (data, callback) => {
        // const formattedDate = moment(data.tanggal).format("DD-MM-YYYY");
        pool.query(
            `SELECT kapasitas_tersedia FROM parkir WHERE jenis_kendaraan = ?`,
            [data.jenis_kendaraan],
            (error, results) => {
                if(error){
                    return callback(error);
                }

                const kapasitasTersedia = results[0]?.kapasitas_tersedia || 0;

                if(kapasitasTersedia > 0){
                    pool.query(
                        `INSERT INTO tamu(tanggal, plat_nomor, nama, alamat, keperluan, no_telp, jenis_kendaraan, catatan) VALUES (NOW(),?,?,?,?,?,?,?)`,
                        [
                            data.plat_nomor,
                            data.nama,
                            data.alamat,
                            data.keperluan,
                            data.no_telp,
                            data.jenis_kendaraan,
                            'Parkir Dalam'
                        ],
                        (error, tamuResults) => {
                            if(error){
                                return callback(error);
                            }

                            const idTamu = tamuResults.insertId;

                            pool.query(
                                `INSERT INTO checkin(id_tamu, waktu_checkin) VALUES (?,CURRENT_TIMESTAMP)`,
                                [idTamu],
                                (error)=>{
                                    if(error){
                                        return callback(error);
                                    }
                                    pool.query(
                                        `UPDATE parkir SET kapasitas_tersedia = kapasitas_tersedia - 1 WHERE jenis_kendaraan = ?`,
                                        [data.jenis_kendaraan],
                                        (error) => {
                                            if(error){
                                                return callback(error);
                                            }
                                            return callback(null, results)
                                        }
                                    );
                                }
                            );
                        }
                    );
                } else {
                    pool.query(
                        `INSERT INTO tamu(tanggal, plat_nomor, nama, alamat, keperluan, no_telp, jenis_kendaraan, catatan) VALUES (NOW(),?,?,?,?,?,?,?)`,
                        [
                            data.plat_nomor,
                            data.nama,
                            data.alamat,
                            data.keperluan,
                            data.no_telp,
                            data.jenis_kendaraan,
                            'Parkir Luar'
                        ],
                        (error, results) => {
                            if(error){
                                return callback(error);
                            }
                            return callback(null, results)
                        }
                    )
                }
            }
        )
    },

    deleteTamu: (data, callback) => {
        pool.query(
            `SELECT jenis_kendaraan FROM tamu WHERE nama = ?`,
            [data.nama],
            (error, results) => {
                if(error){
                    return callback(error);
                }

                if(results.length === 0){
                    return callback(null, {message: 'Tamu tidak Ditemukan.'});
                }

                const jenisKendaraan = results[0].jenis_kendaraan;

                pool.query(
                    `DELETE FROM tamu WHERE nama = ?`,
                    [data.nama],
                    (error) => {
                        if(error){
                            return callback(error);
                        }

                        pool.query(
                            `UPDATE parkir SET kapasitas_tersedia = kapasitas_tersedia + 1 WHERE jenis_kendaraan = ?`,
                            [jenisKendaraan],
                            (error) => {
                                if(error){
                                    return callback(error);
                                }
                                return callback(null, {message: 'Data tamu berhasil dihapus dan kapasitas parkir diperbarui'})
                            }
                        );
                    }
                );
            }
        );
    },

    // checkoutTamu: (data, callback) => {
    //     pool.query(
    //         `SELECT checkin.id_tamu, tamu.jenis_kendaraan FROM checkin
    //         JOIN tamu ON checkin.id_tamu = tamu.id_tamu
    //         WHERE tamu.nama = ? AND checkin.waktu_checkout IS NULL`,
    //         [data.nama],
    //         (error, results) => {
    //             if(error){
    //                 return callback(error);
    //             }
    //             if(results.length === 0){
    //                 return callback(null, { message: 'Tidak ada data tamu dengan nama tersebut atau tamu sudah checkout.' });
    //             }

    //             const {id_tamu, jenis_kendaraan} = results[0];

    //             pool.query(
    //                 `UPDATE checkin SET waktu_checkout = CURRENT_TIMESTAMP WHERE id_tamu = ?`,
    //                 [id_tamu],
    //                 (error, results) => {
    //                     if(error){
    //                         return callback(error);
    //                     }

    //                     pool.query(
    //                         `UPDATE parkir SET kapasitas_tersedia = kapasitas_tersedia + 1 WHERE jenis_kendaraan = ?`,
    //                         [jenis_kendaraan],
    //                         (error, results) => {
    //                             if(error){
    //                                 return callback(error);
    //                             }
    //                             return callback(null, { message: 'Tamu Berhasil Checkout dan Data parkir diperbarui' })
    //                         }
    //                     );
    //                 }
    //             );
    //         }
    //     );
    // },

    checkoutTamu: (data, callback) => {
        pool.query(
            `SELECT checkin.id_tamu, tamu.jenis_kendaraan FROM checkin
            JOIN tamu ON checkin.id_tamu = tamu.id_tamu
            WHERE tamu.plat_nomor = ? AND tamu.jenis_kendaraan = ? AND checkin.waktu_checkout IS NULL`,
            [data.plat_nomor, data.jenis_kendaraan],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                if(results.length === 0){
                    return callback(null, { message: 'Tidak ada data tamu dengan nama dan jenis kendaraan tersebut atau tamu sudah checkout.' });
                }
    
                const {id_tamu, jenis_kendaraan} = results[0];
    
                pool.query(
                    `UPDATE checkin SET waktu_checkout = CURRENT_TIMESTAMP WHERE id_tamu = ?`,
                    [id_tamu],
                    (error, results) => {
                        if(error){
                            return callback(error);
                        }
    
                        pool.query(
                            `UPDATE parkir SET kapasitas_tersedia = kapasitas_tersedia + 1 WHERE jenis_kendaraan = ?`,
                            [jenis_kendaraan],
                            (error, results) => {
                                if(error){
                                    return callback(error);
                                }
                                return callback(null, { message: 'Tamu Berhasil Checkout dan Data parkir diperbarui' })
                            }
                        );
                    }
                );
            }
        );
    },

    getTamubyName: (data, callback) => {
        pool.query(
            `SELECT * FROM tamu WHERE nama = ?`,
            [data.nama],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                if(results.length === 0){
                    return callback(null, {message: 'Tidak Ditemukan Tamu dengan Nama Tersebut'})
                }
                return callback(null, results);
            }
        )
    }, 

    getTamubyType: (data, callback) => {
        pool.query(
            `SELECT * FROM tamu WHERE jenis_kendaraan = ?`,
            [data.jenis_kendaraan],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                if(results.length === 0){
                    return callback(null, {message: 'Tidak Ditemukan Tamu dengan Jenis Kendaraan Tersebut'})
                }
                return callback(null, results);
            }
        )
    }
}