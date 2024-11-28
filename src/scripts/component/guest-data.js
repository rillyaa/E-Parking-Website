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
                <div class="date-print">
                    <p>
                        <label for="daterange"><b>Tanggal : </b></label>
                        <input type="text" class="input-box daterange" name="daterange" value="11/22/2024 - 12/12/2024" />
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
                          <th>No. Telp</th>
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
      *{
        font-family: 'Poppins';
      }

      .text-center {
          margin-top: 1.6vw;
          text-align: center;
          color: #fff;
      }

      .text-center > h2 {
        font-size: clamp(20px, 5vw, 40px);
      }

      .card {
          width: 80vw;
          margin: auto;
          margin-top: 28px;
          margin-bottom: 80px;
          background-color: rgba(255,255,255,0.5);
          padding: 40px;
          border-radius: 20px;
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
        border-radius: 10px;
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
          font-weight: 600;
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
        const tamuResponse = await fetch('http://localhost:5000/api/guestData', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        const tamuData = await tamuResponse.json();
        
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
        
        let statusBadge;
        if (tamuData.checkoutStatus === 'sudah') {
          statusBadge = '<span class="status-badge status-checked-out">Completed</span>';
        } else {
          statusBadge = '<span class="status-badge status-not-checked-out">Pending</span>';
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

      // Inisialisasi daterangepicker
      const daterangeInput = this.shadowRoot.querySelector('.daterange');
      $(daterangeInput).daterangepicker({
        opens: 'left',
        locale: {
          format: 'MM/DD/YYYY'
        }
      }, (start, end) => {
        console.log("Selected range: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD'));
        // Anda dapat melakukan sesuatu dengan tanggal yang dipilih
        this.handleDateRangeSelection(start, end);
      });

      // Event listener untuk tombol cetak
      this.shadowRoot.querySelector('.print').addEventListener('click', async () => {
        try {
          // Belum menerapkan Filter Tanggal, masih PR 
          const response = await fetch('http://localhost:5000/api/tamu', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          const result = await response.json();

          console.log('Respons API:', result);
  
          // checking data array 
          if (result.message === 'Tamu Fetched Successfully' && Array.isArray(result.listTamu)) {
            printData(result.listTamu); 
          } else {
            console.error('Failed to fetch printable data:', result.message);
            alert('Gagal mengambil data untuk cetak.');
          }
        } catch (error) {
          console.error('Error fetching printable data:', error);
          alert('Terjadi kesalahan saat mengambil data untuk cetak.');
        }
      });
    }
    
    handleDateRangeSelection(start, end) {
      const startDate = start.format('YYYY-MM-DD');
      const endDate = end.format('YYYY-MM-DD');
      
      // Ambil data dari API dengan filter tanggal
      this.fetchFilteredData(startDate, endDate);
    }
    
    async fetchFilteredData(startDate, endDate) {
      try {
        const response = await fetch(`http://localhost:5000/api/guestData?start=${startDate}&end=${endDate}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (Array.isArray(data.listTamu)) {
          this.renderTable(data.listTamu);
        } else {
          console.error('Expected an array but received:', data);
          this.shadowRoot.querySelector('.data-guest').innerHTML = `<p>Error: Data is not an array.</p>`;
        }
      } catch (error) {
        console.error('Failed to fetch filtered data:', error.message);
        this.shadowRoot.querySelector('.data-guest').innerHTML = `<p>Error loading data.</p>`;
      }
    }
  }
  
  function printData(data) {
    if (!Array.isArray(data)) {
      console.error('Data yang diterima bukan array:', data);
      alert('Data yang diterima untuk cetak tidak valid.');
      return;
    }

    const printWindow = window.open('', '', 'width=800,height=600');
    
    // Header Tabel Cetak
    printWindow.document.write('<h1>Data Pengunjung</h1>');
    printWindow.document.write('<table border="1" style="width: 100%; border-collapse: collapse;">');
    printWindow.document.write(`
      <tr>
        <th>No</th>
        <th>Plat Nomor</th>
        <th>Nama Lengkap</th>
        <th>Alamat</th>
        <th>Keperluan</th>
        <th>No. Telp</th>
        <th>Jenis Kendaraan</th>
        <th>Catatan</th>
        <th>Waktu Check-In</th>
        <th>Waktu Check-Out</th>
        <th>Durasi Parkir</th>
      </tr>
    `);
  
    // Membuat Format Tabel untuk DiPrint
    data.forEach((row, index) => {
      let durasiParkir = '-';
      if (row.waktu_checkin && row.waktu_checkout) {
        const checkin = new Date(row.waktu_checkin);
        const checkout = new Date(row.waktu_checkout);

        if (!isNaN(checkin) && !isNaN(checkout)) {
          const selisihMs = checkout - checkin; // Selisih dalam milidetik
          const durasiJam = Math.floor(selisihMs / (1000 * 60 * 60));
          const durasiMenit = Math.floor((selisihMs % (1000 * 60 * 60)) / (1000 * 60));
          const durasiDetik = Math.floor((selisihMs % (1000 * 60)) / 1000);
          durasiParkir = `${durasiJam} jam ${durasiMenit} menit ${durasiDetik} detik`;
        }
      }

      printWindow.document.write(`
        <tr>
          <td>${index + 1}</td>
          <td>${row.plat_nomor}</td>
          <td>${row.nama}</td>
          <td>${row.alamat}</td>
          <td>${row.keperluan}</td>
          <td>${row.no_telp}</td>
          <td>${row.jenis_kendaraan}</td>
          <td>${row.catatan}</td>
          <td>${row.waktu_checkin}</td>
          <td>${row.waktu_checkout}</td>
          <td>${durasiParkir}</td>
        </tr>
      `);
    });
  
    printWindow.document.write('</table>');
    printWindow.document.close();
  
    // Cetak
    printWindow.print();
  }
  
  customElements.define('guest-data', guestData);