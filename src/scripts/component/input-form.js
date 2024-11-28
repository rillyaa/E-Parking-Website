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
                    <input class="input-box" type="text" name="plat" id="plat_nomor" placeholder="Masukkan Plat Nomor Kendaraan Anda" required autocomplete="off">
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

            .text-center .card{
                display: flex;
            }

            .text-center{
                margin-top: 1.6vw;
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                row-gap: 1vw;
            }

            .text-center > h2 {
                font-size: clamp(20px, 5vw, 40px);
            }
                
            .text-center > h1 {
                font-size: clamp(24px, 6vw, 44px);
            }

            .card{
                justify-content: center;
                align-items: center;
                margin: auto;
                margin-top: 28px;
                margin-bottom: 80px;
                padding: 40px 0;
                line-height: 40px;
                width: 60vw;
                background-color: rgba(255,255,255,0.5);
                border-radius: 20px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
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
                font-size: clamp(14px, 2vw, 18px);
            }

            .input-box{
                padding: 0 20px;
            }

            textarea.input-box{
                padding-top: 20px;
            }

            .input-box, button{
                width: 44vw;
                height: clamp(28px, 3.6rem, 68px);
                border-radius: 6px;
                border: none;
            }

            button{
                background-color: #F9AE22;
                color: black;
                font-size: clamp(14px, 2vw, 18px);
                font-weight: bold;
                cursor: pointer;
            }
        `;

        shadow.appendChild(form);
        shadow.appendChild(style);

        // Tangkap elemen form dan tambahkan event listener submit
        const guestBookForm = shadow.querySelector('#guest-book-form');

        guestBookForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const tamuData = {
                plat_nomor: shadow.getElementById('plat_nomor').value,
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