class statCar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const statcar = document.createElement('div');
        statcar.innerHTML = `
        <div class="text-center" id="statistik">
            <h2 class="title">Statistik Parkir Mobil</h2>
        </div>

        <div class="capacity-card">
            <div id="kapasitas" class="card">
                <div class="card-content">
                    <h3 class="text">Total Kapasitas<br>Parkiran</h3>
                    <h2 class="number" id="totalKapasitas">Loading...</h2>            
                </div>
            </div>

            <div id="pengunjung" class="card">
                <div class="card-content">
                    <h3 class="text">Total<br>Pengunjung</h3>
                    <h2 class="number" id="totalPengunjung">Loading...</h2>
                </div>
            </div>
        
            <div id="parkiran" class="card">
                <div class="card-content">
                    <h3 class="text">Total Parkiran<br>Tersedia</h3>
                    <h2 class="number" id="parkiranTersedia">Loading...</h2>
                </div>
            </div>
        </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .text-center {
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                row-gap: 20px;
            }

            .capacity-card {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .card {
                width: 60%;
                margin-left: 20%;
                background-color: rgba(255,255,255,0.5);
                border-radius: 20px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
            }

            .card-content {
                color: white;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
        `;

        shadow.appendChild(statcar);
        shadow.appendChild(style);

        // Panggil metode fetchData setelah komponen dibuat
        this.fetchData();
    }

    async fetchData() {
        try {
            // Ambil data kapasitas parkir dari endpoint /kapasitas
            const response = await fetch('http://localhost:5000/api/kapasitas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jenis_kendaraan: 'Mobil' })
            });

            const responseData = await response.json();
            console.log('Response Data:', responseData); // Cek apakah ini JSON atau HTML

            if (responseData.data){
                const data = responseData.data;

                // Perbarui elemen dengan data yang diambil
                const shadow = this.shadowRoot;
                shadow.querySelector('#totalKapasitas').textContent = data.total_kapasitas;
                shadow.querySelector('#totalPengunjung').textContent = "Unavailable";
                shadow.querySelector('#parkiranTersedia').textContent = data.kapasitas_tersedia;
            }  else {
                console.error('Data is null or undefined in API response');
            }
            
        } catch (error) {
            console.error('Error fetching parking data:', error);
        }
    }
}

customElements.define('stat-car', statCar);