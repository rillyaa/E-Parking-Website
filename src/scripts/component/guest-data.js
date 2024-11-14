class guestData extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      const dataContainer = document.createElement('div');
      dataContainer.innerHTML = `
        <div class="text-center" id="pengunjung">
            <h2 class="title">Informasi Data Pengunjung</h2>
        </div>
  
        <div class="card">
            <div class="table-guest">
                <p>
                    <label for="date">Tanggal : </label>
                    <input class="input-box" type="date" name="date" id="date" required autocomplete="off">
                </p>
                <div class="data-guest">
                    <table>
                        <tr>
                          <th>No</th>
                          <th>Nama Lengkap</th>
                          <th>Alamat</th>
                          <th>Keperluan</th>
                          <th>No. Telpon</th>
                        </tr>
                        <tbody id="guest-rows">
                            <!-- Rows will be added here dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      `;
  
      const style = document.createElement('style');
      style.textContent = `
      .text-center {
          margin-top: 50px;
          text-align: center;
          color: #fff;
      }

      .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
      }

      .card {
          max-width: 800px;
          margin: 0 auto;
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .input-box {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-left: 10px;
      }

      .table-guest {
          overflow-x: auto;
      }

      table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
      }

      th, td {
          padding: 12px;
          text-align: left;
      }

      th {
          background-color: #f3f3f3;
          font-weight: bold;
      }

      tbody tr:nth-child(even) {
          background-color: #f9f9f9;
      }

      table, th, td {
          border: 1px solid #ddd;
      }

      tbody td {
          color: #333;
      }

      .status-badge {
          display: inline-block;
          padding: 4px 10px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          border-radius: 12px;
      }

      .status-progress {
          background-color: #4CAF50;
      }

      .status-open {
          background-color: #FFC107;
          color: black;
      }

      .status-hold {
          background-color: #F44336;
      }
      `;
  
      this.shadowRoot.appendChild(dataContainer);
      this.shadowRoot.appendChild(style);
    }
  
    async fetchData() {
      try {
        const tamuResponse = await fetch('http://localhost:5000/api/tamu', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        const tamuData = await tamuResponse.json();
        
        // Akses langsung array listTamu di dalam objek tamuData
        if (Array.isArray(tamuData.listTamu)) {
          this.renderTable(tamuData.listTamu);
        } else {
          console.error('Expected an array but received:', tamuData);
          this.shadowRoot.querySelector('.data-guest').innerHTML = `<p>Error: Data is not an array.</p>`;
        }
      } catch (error) {
        console.error('Failed to fetch guest data:', error.message);
        this.shadowRoot.querySelector('.data-guest').innerHTML = `<p>Error loading data.</p>`;
      }
    }
  
    renderTable(data) {
      const tbody = this.shadowRoot.querySelector('#guest-rows');
      tbody.innerHTML = '';
      
      if (!Array.isArray(data)) {
        console.error('renderTable expected an array but received:', data);
        tbody.innerHTML = '<tr><td colspan="5">Error: Data is not an array.</td></tr>';
        return;
      }

      data.forEach((tamuData, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${tamuData.nama}</td>
          <td>${tamuData.alamat}</td>
          <td>${tamuData.keperluan}</td>
          <td>${tamuData.no_telp}</td>
        `;
        tbody.appendChild(row);
      });
    }
  
    connectedCallback() {
      this.fetchData();
    }
  }
  
  customElements.define('guest-data', guestData);