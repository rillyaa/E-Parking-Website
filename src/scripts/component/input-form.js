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
                    <label for="plat">Plat Nomor</label><br>
                    <input class="input-box" type="text" name="plat" id="plat-kendaraan" placeholder="Masukkan Plat Nomor Kendaraan Anda" required autocomplete="off">
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
                margin-top: 50px;
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
                margin-top: 40px;
                margin-left: 20%;
                margin-bottom: 80px;
                line-height: 40px;
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

            textarea:focus{
                outline: 4px solid #F9AE22;
            }

            label {
                color: black;
                font-weight: 500;
            }

            .input-box{
                padding: 0 20px;
            }

            textarea.input-box{
                padding-top: 20px;
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
                    min-width: 80vh;
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

        guestBookForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const tamuData = {
                nama: shadow.getElementById('name').value,
                alamat: shadow.getElementById('address').value,
                keperluan: shadow.getElementById('reason').value,
                no_telp: shadow.getElementById('phone').value,
                jenis_kendaraan: '',
            };

            localStorage.setItem('tamuData', JSON.stringify(tamuData));
            window.location.hash = '#check-in';
        });
    }
}

customElements.define('input-form', inputForm);