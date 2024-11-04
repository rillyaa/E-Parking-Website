class statMot extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const statmot = document.createElement('div');
        statmot.innerHTML = `
        <div class="text-center" id="statistik">
            <h2 class="title">Statistik Parkir Motor</h2>
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

        shadow.appendChild(statmot);
        shadow.appendChild(style);
    }
}

customElements.define('stat-mot', statMot);