class checkOut extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const Swal = require('sweetalert2');

        const checkout = document.createElement('div');
        checkout.innerHTML = `
        <div class="wrapper">
            <div class="text-center">
                <h1 class="title">CHECK-OUT</h1>
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

        shadow.appendChild(checkout);
        shadow.appendChild(style); 
        
        const carCard = shadow.querySelector('#car-card button');
            carCard.addEventListener('click', (event) => {
                event.preventDefault();

                const tamuData = {
                    jenis_kendaraan: 'Mobil'
                }

                localStorage.setItem('tamuData', JSON.stringify(tamuData))
                window.location.hash = '#input-cof';
      
                const content = document.getElementById('content');
                content.innerHTML = '';
      
                const inputCofComponent = document.createElement('input-cof');
                content.appendChild(inputCofComponent);
        });

        // Event listener untuk card motor
        const motorCard = shadow.querySelector('#motor-card button');
            motorCard.addEventListener('click', (event) => {
                event.preventDefault(); 
                const tamuData = {
                    jenis_kendaraan: 'Motor'
                }

                localStorage.setItem('tamuData', JSON.stringify(tamuData))
                window.location.hash = '#input-cof';
      
                const content = document.getElementById('content');
                content.innerHTML = '';
      
                const inputCofComponent = document.createElement('input-cof');
                content.appendChild(inputCofComponent);
        });
    }
}

customElements.define('check-out', checkOut);