class inputForm extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const form = document.createElement('form');
        form.id = "guest-book-form";
        form.innerHTML = `        
        <div class="text-center">
            <h2 class="title">Buku Tamu Pengunjung</h2>
            <h1>POLDA DIY</h1>
        </div>

        <div class="card">
            <div class="input-form">
                <p>
                    <label for="date">Tanggal</label><br>
                    <input class="input-box" type="date" name="date" id="date" required autocomplete="off">
                </p>
                <p>
                    <label for="name">Nama Lengkap</label><br>
                    <input class="input-box" type="text" name="name" id="name" placeholder="Masukkan Nama Lengkap Anda" required autocomplete="off">
                </p>
                <p>
                    <label for="address">Alamat</label><br>
                    <textarea class="input-box" name="address" id="address" placeholder="Masukkan Alamat Domisili Anda" required autocomplete="off"></textarea>
                </p>
                <p>
                    <label for="reason">Keperluan</label><br>
                    <input class="input-box" type="text" name="reason" id="reason" placeholder="Masukkan Keperluan Anda" required autocomplete="off">
                </p>
                <p>
                    <label for="phone">No. Telpon</label><br>
                    <input class="input-box" type="number" name="phone" id="phone" placeholder="08123456789">
                </p>
                <p><br>
                    <button type="submit" name="submit" value="Submit">Submit</button>
                </p>
            </div>
        </div>
    `;

        const style = document.createElement('style')
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

    .card{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        margin-left: 20%;
        line-height: 40px;
        width: 60%;
        background-color: rgba(255,255,255,0.5);
        border-radius: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
        padding: 20px 0;
    }

    .input-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    label {
        color: white;
    }

    .input-box, button{
        min-width: 80vh;
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

        /* Untuk layar lebih kecil dari 576px (ponsel) */
        @media screen and (max-width: 576px){
            .text-center{
                row-gap: 4px;
            }

            .card {
                margin-left: 8%;
                width: 80%;
            }

            .input-box, button{
                min-width: 48vh;
                background-color: blue;
            }
        }

        /* Untuk layar lebih besar dari 576px tapi lebih kecil dari 768px (tablet kecil) */
        @media screen and (min-width: 576px) and (max-width: 768px) {
            .text-center{
                row-gap: 12px;
            }

            .card{
                margin-left: 12%;
                width: 80%;
            }

            .input-box, button{
                min-width: 60vh;
            }
        }

        /* Untuk layar lebih besar dari 768px tapi lebih kecil dari 1000px (tablet atau laptop kecil) */
        @media screen and (min-width: 768px) and (max-width: 1000px){
            .text-center{
                row-gap: 16px;
            }

            .card {
                margin-left: 10%;
                width: 80%;
            }

            .input-box, button{
                min-width: 72vh;
            }
        }
    `;

        shadow.appendChild(form);
        shadow.appendChild(style);

        // Tangkap elemen form dan tambahkan event listener submit
        const guestBookForm = shadow.querySelector('#guest-book-form');

        guestBookForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

        // Redirect ke halaman check-in
        window.location.hash = '#check-in';
    });
    }
}

customElements.define('input-form', inputForm);