class inputCof extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const Swal = require('sweetalert2');

        const inputcof = document.createElement('form');
        inputcof.id = "input-checkout-form";
        inputcof.innerHTML = `
        <div class="wrapper">
            <div class="text-center">
                <h1 class="title">CHECK-OUT</h1>
                <h2 class="text-choice">Masukkan Identitas Anda</h2>
            </div>
        </div>

        <div class="container-form">
            <p>
                <label for="name">Nama Lengkap</label><br>
                <input type="text" name="name" id="name" placeholder="Masukkan Nama Lengkap Anda" required autocomplete="off">
            </p>
            <p><br>
                <button type="submit" name="submit" value="Submit">Submit</button>
            </p>
        </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .wrapper {
                text-align: center;
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
