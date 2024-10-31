class AppBar extends HTMLElement {
  constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });

      const nav = document.createElement('nav');
      nav.innerHTML = `
          <div class="logo" id="logo">
              <img src="/img/logo-polda.png" alt="logo-polda">
              <img src="/img/logo_bid-tik.png" alt="logo-bid-tik">
          </div>

          <div class="menu">
              <button id="menu-toggle"><box-icon name='menu' color='white'></box-icon></button>

              <nav class="navbar">
                  <ul id="menu-list" class="hidden">
                      <li class="menu-item"><a href="check-out">Check-Out</a></li>
                      
                      <!-- Dropdown Menu -->
                      <li class="menu-item dropdown">
                          <a href="#" class="dropdown-toggle">Statistik Parkir</a>
                          <ul class="dropdown-menu hidden">
                              <li><a href="#stat-car" class="dropdown-item">Mobil</a></li>
                              <li><a href="#stat-mot" class="dropdown-item">Motor</a></li>
                          </ul>
                      </li>
                  </ul>
              </nav>
          </div>
      `;

      const style = document.createElement('style');
      style.textContent = `
          * {
              margin: 0;
              font-family: 'Poppins';
              text-decoration: none;
              list-style: none;
          }

          nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 15vh;
          }

          nav .logo {
            padding: 0 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 10px;
            }
            
          nav .logo img {
            height: 76px;
            cursor: pointer;
          }

          .hidden {
            display: none;
          }

          .menu button {
              color: white;
              cursor: pointer;
              border: none;
              background-color: transparent;
          }
          
          .menu button i {
            font-size: 24px;
          }

          .menu ul {
            list-style: none;
          }

          .menu ul li {          
            margin-right: 20px;
          }

          .menu ul li a {
            color: white;
            font-size: 18px;
          }

          .menu-list {
              display: flex;
              flex-direction: column; /* Mengatur menu utama secara vertikal */
              padding: 0;
          }

          .menu-item {
              position: relative;
              margin-bottom: 10px;
          }

          .menu-item a {
              color: white;
              font-size: 18px;
              text-decoration: none;
          }

          .dropdown-menu {
              display: none; /* Sembunyikan dropdown secara default */
              position: absolute;
              top: 100%; /* Tempatkan di bawah item utama */
              left: 0;
              background-color: #333;
              padding: 10px 0;
              list-style-type: none;
              width: 100%;
          }

          .menu-item.dropdown:hover .dropdown-menu {
              display: block; /* Tampilkan dropdown saat menu utama di-hover */
          }

          .dropdown-item {
              padding: 8px 20px;
              color: white;
              text-decoration: none;
              display: block;
          }

          .dropdown-item:hover {
              background-color: #444; /* Warna latar belakang saat di-hover */
          }

          /* Untuk layar lebih kecil dari 576px (ponsel) */
          @media screen and (max-width: 576px){
            nav .logo img {
              height: 40px;
            }
              
          }

          /* Untuk layar lebih besar dari 576px tapi lebih kecil dari 768px (tablet kecil) */
          @media screen and (min-width: 576px) and (max-width: 768px){
            nav .logo img {
              height: 60px;
            }
          }
      `;

      shadow.appendChild(nav);
      shadow.appendChild(style);

      // Add event listener for logo click
      const logo = shadow.querySelector('#logo');
      logo.addEventListener('click', () => {
          window.location.hash = '#';
      });

      const menuButton = shadow.querySelector('#menu-toggle');
      const menuList = shadow.querySelector('#menu-list');
      
      menuButton.addEventListener('click', (event) => {
          event.stopPropagation(); 
          menuList.classList.toggle('hidden');
      });
      
      // Menutup menu jika klik di luar menu
      document.addEventListener('click', (event) => {
          if (!menuList.contains(event.target) && !menuButton.contains(event.target)) {
              menuList.classList.add('hidden');
          }
      });

      // Dropdown toggle on hover
      const dropdown = shadow.querySelector('.dropdown');
      dropdown.addEventListener('mouseenter', () => {
          const dropdownMenu = shadow.querySelector('.dropdown-menu');
          dropdownMenu.classList.remove('hidden');
      });

      dropdown.addEventListener('mouseleave', () => {
          const dropdownMenu = shadow.querySelector('.dropdown-menu');
          dropdownMenu.classList.add('hidden');
      });

      const dropdownMobil = shadow.querySelector('.dropdown-item');

      dropdownMobil.addEventListener('click', (event) => {
          event.preventDefault(); 

          // Mengubah hash URL
          window.location.hash = '#stat-car';

          // Clear the content area
          const content = document.getElementById('content');
          content.innerHTML = ''; // Clear previous content

          // Create and append the stat-car component
          const statCarComponent = document.createElement('stat-car');
          content.appendChild(statCarComponent);
      });

  }
}

customElements.define('app-bar', AppBar);