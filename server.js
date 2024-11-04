const express = require('express');
const app = express()

const bodyParser = require('body-parser');
const dbPool = require('./backend-api/config/database.js');

require('dotenv').config()
const port = process.env.APP_PORT || 5000

app.use(express.json());
app.use(bodyParser.json());

const parkirRouter = require('./backend-api/src-api/parkir/parkir.router.js');
app.use('/', parkirRouter);

const tamuRouter = require('./backend-api/src-api/tamu/tamu.router.js');
app.use('/', tamuRouter);

const kendaraanRouter = require('./backend-api/src-api/kendaraan/kendaraan.router.js');
app.use('/', kendaraanRouter);

app.get('/' , (req , res)=>{
    res.send('hello from simple server :)');
});

const checkDatabaseConnection = () => {
    dbPool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to the database as ID:', connection.threadId);
        connection.release(); // Melepaskan koneksi kembali ke pool
    });
};

// Panggil fungsi untuk cek koneksi
checkDatabaseConnection();
 
app.listen(port , ()=> {
    console.log('> Server is up and running on port : ' + port);
})