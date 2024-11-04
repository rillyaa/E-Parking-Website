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

        <div class="container-form">
            <fieldset>
                    <p>
                        <label for="name">Nama Lengkap</label><br>
                        <input type="text" name="name" id="name" placeholder="Masukkan Nama Lengkap Anda" required autocomplete="off">
                    </p>
                    <p>
                        <label for="address">Alamat</label><br>
                        <textarea name="address" id="address" placeholder="Masukkan Alamat Domisili Anda" required autocomplete="off"></textarea>
                    </p>
                    <p>
                        <label for="reason">Keperluan</label><br>
                        <input type="text" name="reason" id="reason" placeholder="Masukkan Keperluan Anda" required autocomplete="off">
                    </p>
                    <p>
                        <label for="phone">No. Telpon</label><br>
                        <input type="number" name="phone" id="phone" placeholder="08123456789">
                    </p>
                    <p><br>
                        <button type="submit" name="submit" value="Submit">Submit</button>
                    </p>
            </fieldset>
        </div>
    `;

    const style = document.createElement('style')
    style.textContent = ``;

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