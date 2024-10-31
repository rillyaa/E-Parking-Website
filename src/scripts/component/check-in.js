class checkIn extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const Swal = require('sweetalert2');

        const checkin = document.createElement('div');
        checkin.innerHTML = `
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
        `;

        const style = document.createElement('style')
        style.textContent = `
        .text-center{
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 10px;
        }

        .container-card{
            padding-top: 80px;
            display: flex;
            justify-content: center;
            column-gap: 120px;
            align-items: center;
        }

        .card{
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            border-radius: 20px;
            padding: 20px;
            height: 320px;
            width: 360px;
            display: flex;
            justify-content: center;
            align-items: center;
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
    `;

        shadow.appendChild(checkin);
        shadow.appendChild(style); 
        
        const carCard = shadow.querySelector('#car-card button');
        carCard.addEventListener('click', () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Check-In berhasil!',
                    text: 'Kapasitas parkir mobil yang tersedia: ',
                    confirmButtonText: 'Tutup'
                });
        });

        // Event listener untuk card motor
        const motorCard = shadow.querySelector('#motor-card button');
        motorCard.addEventListener('click', () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Check-In berhasil',
                    text: 'Kapasitas parkir motor yang tersedia: ',
                    confirmButtonText: 'Tutup'
                });
        });
    }
}

customElements.define('check-in', checkIn);