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
                <h3 class="text">Total Kapasitas Parkiran</h3>
                <h2 class="number">100</h2>
            </div>
            <div id="pengunjung" class="card">
                <h3 class="text">Total Pengunjung</h3>
                <h2 class="number">100</h2>
            </div>
            <div id="parkiran" class="card">
                <h3 class="text">Total Parkiran Tersedia</h3>
                <h2 class="number">100</h2>
            </div>
        </div>
        `;
        
        const style = document.createElement('style')
        style.textContent = ``;

        shadow.appendChild(statcar);
        shadow.appendChild(style);
    }
}

customElements.define('stat-car', statCar);