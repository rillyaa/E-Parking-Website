class guestCar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      const dataContainer = document.createElement('div');
      dataContainer.innerHTML = `
        <div class="text-center" id="pengunjung">
            <h2 class="title">Informasi Data Pengunjung Mobil</h2>
        </div>
  
        <div class="card">
            <div class="table-guest">
                <div class="date-print">
                    <p>
                        <label for="date"><b>Tanggal : </b></label>
                        <input class="input-box" type="date" name="date" id="date" required autocomplete="off">
                    </p>

                    <button class="print"><box-icon type='solid' name='printer' style="margin-right: 6px;"></box-icon> Cetak</button>
                </div>

                <div class="data-guest">
                    <table>
                        <tr>
                          <th>No</th>
                          <th>Tanggal</th>
                          <th>Plat Nomor</th>
                          <th>Nama Lengkap</th>
                          <th>Alamat</th>
                          <th>Keperluan</th>
                          <th>No. Telpon</th>
                          <th>Status</th>
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
      * {
        font-family: 'Poppins';
      }

      .text-center {
          margin-top: 50px;
          text-align: center;
          color: #fff;
      }

      .title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
      }

      .card {
          max-width: 1054px;
          margin: 0 4vw;
          background-color: rgba(255,255,255,0.5);
          padding: 4vw;
          border-radius: 8px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
          margin-bottom: 80px;
      }

      .date-print{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .input-box {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-left: 10px;
      }

      input:focus{
        outline: 4px solid #F9AE22;
      }

      .print {
        font-size: 16px;
        display: flex;
        align-items: center;
        background-color: #F9AE22;
        font-weight: 500;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        height: 45px;
        padding: 10px 15px;
      }

      .print .icon {
        width: 20px;
        height: 20px;
      }

      .table-guest {
          overflow-x: auto;
          margin-bottom: 20px;
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

      tbody tr:nth-child(even), tbody tr:nth-child(even) {
          background-color: #f9f9f9;
      }

      table tbody tr:nth-child(odd) {
        background-color: #fff;
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

      .status-checked-out {
          background-color: #4CAF50;
      }

      .status-not-checked-out {
          background-color: #F44336;
      }
      `;
  
      this.shadowRoot.appendChild(dataContainer);
      this.shadowRoot.appendChild(style);
    }
  
    async fetchData() {
      try {
        const tamuResponse = await fetch('http://localhost:5000/api/guestByType', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jenis_kendaraan: 'Mobil'}),
        });

        const tamuData = await tamuResponse.json();
        
        if (Array.isArray(tamuData.DataTamu)) {
          this.renderTable(tamuData.DataTamu);
        } else {
          console.error('Expected an array but received:', tamuData);
          this.shadowRoot.querySelector('.data-guest').innerHTML = `<p>Error: Data is not an array.</p>`;
        }
      } catch (error) {
        console.error('Failed to fetch guest car data:', error.message);
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

        let statusBadge;
        if (tamuData.checkoutStatus === 'sudah') {
          statusBadge = '<span class="status-badge status-checked-out">Checkout Completed</span>';
        } else {
          statusBadge = '<span class="status-badge status-not-checked-out">Checkout Pending</span>';
        }

        const formattedDate = tamuData.tanggal.substring(0, 10); 
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${formattedDate}</td>
          <td>${tamuData.plat_nomor}</td>
          <td>${tamuData.nama}</td>
          <td>${tamuData.alamat}</td>
          <td>${tamuData.keperluan}</td>
          <td>${tamuData.no_telp}</td>
          <td>${statusBadge}</td>
        `;
        tbody.appendChild(row);
      });
    }
  
    connectedCallback() {
      this.fetchData();
    }
  }
  
  customElements.define('guest-car', guestCar);