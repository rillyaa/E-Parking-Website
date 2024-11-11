const { text } = require('body-parser');

class checkIn extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const Swal = require('sweetalert2');

        const checkin = document.createElement('div');
        checkin.innerHTML = `
        <div class="wrapper">
            <div class="text-center">
                <h1 class="title">CHECK-IN</h1>
                <h2 class="text-choice">Pilih Kendaraan Anda</h2>
            </div>

            <div class="container-card">
                <div id="car-card" class="card">
                    <button><img src="/img/icon-car.png" alt="icon-mobil"></button>
                </div>
                <div id="motor-card" class="card">
                    <button><img src="/img/icon-motor.png" alt="icon-motor"></button>
                </div>
            </div>
        </div>
        `;

        const style = document.createElement('style')
        style.textContent = `
        *{
            margin: 0;
        }

        .wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 85vh;
            box-sizing: border-box;
        }

        .text-center{
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 20px;
        }

        .text-center > h2 {
            font-size: 36px;
        }

        .text-center > h1 {
            font-size: 44px;
        }

        .container-card{
            padding: 10px;
            display: flex;
            justify-content: center;
            column-gap: 60px;
            align-items: center;
        }

        .card{
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            border-radius: 20px;
            margin: 20px;
            height: 280px;
            width: 320px;
            display: flex;
            justify-content: center;
            align-items: center;
            }
            
        .card, button{
            cursor: pointer;
        }

        .container-card .card button{
            border: none;
            background: transparent;
        }

        .container-card .card button img{
            height: 200px;
        }

        .container-card #car-card{
            background-color: rgba(131, 195, 91, 0.5);
        }

        .container-card #motor-card{
            background-color: rgba(57, 189, 189, 0.5)
        }

        /* Untuk layar lebih kecil dari 576px (ponsel) */
        @media screen and (max-width: 576px){
            .text-center{
                row-gap: 4px;
            }
            .container-card{
                flex-direction: column;
                row-gap: 8px;
                padding: 20px 0;
            }
            
            .card{
                width: 240px;
                height: 200px;
            }

            .container-card .card button img{
                height: 120px;
            }

        }

        /* Untuk layar lebih besar dari 576px tapi lebih kecil dari 768px (tablet kecil) */
        @media screen and (min-width: 576px) and (max-width: 768px){
            .text-center{
                row-gap: 12px;
            }

            .container-card {
                flex-direction: column;
                row-gap: 12px;
                padding: 24px 0;
            }

            .card {
                width: 300px;
                height: 250px;
            }

            .container-card .card button img {
                height: 160px;
            }
        }

        /* Untuk layar lebih besar dari 768px tapi lebih kecil dari 1000px (tablet atau laptop kecil) */
        @media screen and (min-width: 768px) and (max-width: 1000px){
            .text-center{
                row-gap: 16px;
            }

            .container-card {
                column-gap: 40px;
                padding: 24px 0;
            }

            .card {
                width: 284px;
                height: 252px;
            }

            .container-card .card button img {
                height: 160px;
            }
        }
    `;

        shadow.appendChild(checkin);
        shadow.appendChild(style);

        const carCard = shadow.querySelector('#car-card button');
        carCard.addEventListener('click', async() => {
            const tamuData = JSON.parse(localStorage.getItem('tamuData'));
            tamuData.jenis_kendaraan = 'Mobil';

            try {
                // First, call createTamu to perform the check-in
                const response = await fetch('http://localhost:5000/api/createTamu', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tamuData),
                });

                const result = await response.json();

                if (result && !result.error) {
                    const kapasitasResponse = await fetch('http://localhost:5000/api/kapasitas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ jenis_kendaraan: 'Mobil' }),
                    });

                    const kapasitasData = await kapasitasResponse.json();
                    console.log("Updated kapasitasData: ", kapasitasData);

                    if (kapasitasData && kapasitasData.data && kapasitasData.data.kapasitas_tersedia !== undefined) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Check-In berhasil!',
                            text: `Kapasitas parkir mobil yang terbaru tersedia: ${kapasitasData.data.kapasitas_tersedia}`,
                            confirmButtonText: 'Tutup'
                        });
                        window.location.hash = '#input-form';
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal',
                            text: 'Data kapasitas tidak ditemukan setelah Check-In!',
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Check-In',
                        text: result.message,
                    });
                }
            } catch (error) {
                console.error('Error during Check-In: ', error);
            }
        });


        const motorCard = shadow.querySelector('#motor-card button');
        motorCard.addEventListener('click', async () => {
            const tamuData = JSON.parse(localStorage.getItem('tamuData'));
            tamuData.jenis_kendaraan = 'Motor';  // Menambahkan jenis kendaraan

            try {
                const response = await fetch('http://localhost:5000/api/createTamu', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tamuData),
                });

                const result = await response.json();

                if (result && !result.error) {
                    const kapasitasResponse = await fetch('http://localhost:5000/api/kapasitas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ jenis_kendaraan: 'Motor' }),
                    });

                    const kapasitasData = await kapasitasResponse.json();
                    console.log("Updated kapasitasData: ", kapasitasData);

                    if (kapasitasData && kapasitasData.data && kapasitasData.data.kapasitas_tersedia !== undefined) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Check-In berhasil!',
                            text: `Kapasitas parkir Motor yang terbaru tersedia: ${kapasitasData.data.kapasitas_tersedia}`,
                            confirmButtonText: 'Tutup'
                        });
                        window.location.hash = '#input-form';
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal',
                            text: 'Data kapasitas tidak ditemukan setelah Check-In!',
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Check-In',
                        text: result.message,
                    });
                }
            } catch (error) {
                console.error('Error during Check-In: ', error);
            }
        });
    }
}

customElements.define('check-in', checkIn);