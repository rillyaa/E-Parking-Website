class inputCof extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const Swal = require('sweetalert2');

        const inputcof = document.createElement('form');
        inputcof.id = "input-checkout-form";
        inputcof.innerHTML = `
            <div class="text-center">
                <h1 class="title">CHECK-OUT</h1>
                <h2 class="text-choice">Masukkan Identitas Anda</h2><br>
            </div>

            <div class="card">
                <div class="input-form">
                    <p>
                    <label for="plat">Plat Nomor</label><br>
                    <input class="input-box" type="text" name="plat" id="plat-kendaraan" placeholder="Masukkan Plat Nomor Kendaraan Anda" required autocomplete="off">
                    </p>
                    <p><br>
                        <button type="submit" name="submit" value="Submit">Submit</button>
                    </p>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            *{
                margin: 0;
                font-family: 'Poppins';
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

            .card{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
                margin-left: 20%;
                margin-bottom: 80px;
                width: 60%;
                background-color: rgba(255,255,255,0.5);
                border-radius: 20px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
                padding: 40px 0;
            }

            .input-form{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            input:focus{
                outline: 4px solid #F9AE22;
            }

            label{
                color: black;
                font-weight: 500;
                line-height: 32px;
            }

            .input-box{
                padding: 0 20px;
            }

            .input-box, button{
                min-width: 92vh;
                min-height: 8vh;
                border-radius: 6px;
                border: none;
            }

            button{
                background-color: #F9AE22;
                color: black;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
            }
        `;

        shadow.appendChild(inputcof);
        shadow.appendChild(style);

        // Event listener untuk handle form submission
        inputcof.addEventListener('submit', (event) => {
            event.preventDefault(); 

            if (shadow.getElementById('name').checkValidity()) {
                Swal.fire({
                    icon: 'success',
                    title: 'Check-Out berhasil',
                    text: 'Tamu Berhasil Checkout dan Data Parkir Diperbarui',
                    confirmButtonText: 'Tutup'
                });
                window.location.hash = '#check-out';
            } else {
                shadow.getElementById('name').reportValidity();
            }
        });
    }
}

customElements.define('input-cof', inputCof);
