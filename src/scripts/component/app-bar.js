class appBar extends HTMLElement {
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
              <button id="menu-toggle">
                  <box-icon id="menu-icon" name="menu" color="white"></box-icon>
              </button>

              <nav class="navbar">
                  <ul id="menu-list" class="hidden">
                      <li class="menu-item"><a href="#check-out">Check-Out</a></li>
                      
                      <!-- Dropdown Menu -->
                      <li class="menu-item dropdown">
                          <a href="#" class="dropdown-toggle">Statistik Parkir</a>
                          <ul class="dropdown-menu hidden">
                              <li><a href="#stat-car" class="dropdown-item" id="dropdown-mobil">Mobil</a></li>
                              <li><a href="#stat-mot" class="dropdown-item" id="dropdown-motor">Motor</a></li>
                          </ul>
                      </li>
                      <li class="menu-item dropdown">
                          <a href="#guest-data" class="dropdown-toggle">Data Pengunjung</a>
                          <ul class="dropdown-menu hidden">
                              <li><a href="#visit-car" class="dropdown-item" id="pengunjung-mobil">Data Pengunjung Mobil</a></li>
                              <li><a href="#visit-mot" class="dropdown-item" id="pengunjung-motor">Data Pengunjung Motor</a></li>
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
              padding: 0;
              font-family: 'Poppins';
              text-decoration: none;
              list-style: none;
          }

          nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            min-height: 15vh;
            position: fixed;
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
              display: grid;
              justify-content: flex-end;
              algn-items: center;
              flex-grow: 1;
              font-size: 24px;
            //   position: relative;
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
              flex-direction: column;
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
              display: none;
              position: absolute;
              top: 100%;
              left: 0;
              background-color: #333;
              padding: 10px 0;
              list-style-type: none;
              width: 100%;
              z-index: 1000;
          }

          .menu-item.dropdown:hover .dropdown-menu {
              display: block;
              pointer-events: auto;
          }

          .menu-item.dropdown:hover{
            margin-bottom: 108px;
            transform: none;
          }

          .dropdown-item {
              padding: 8px 20px;
              color: white;
              text-decoration: none;
              display: block;
          }

          .dropdown-item:hover {
              background-color: #444;
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

      //button menu dan close
      const menuButton = shadow.querySelector('#menu-toggle');
      const menuIcon = shadow.querySelector('#menu-icon');
      const menuList = shadow.querySelector('#menu-list');

      menuButton.addEventListener('click', (event) => {
          event.stopPropagation();
          menuList.classList.toggle('hidden');

          // Ganti ikon
          if (menuIcon.getAttribute('name') === 'menu') {
              menuIcon.setAttribute('name', 'x');
          } else {
              menuIcon.setAttribute('name', 'menu');
          }
      });

      document.addEventListener('click', (event) => {
          if (!menuList.contains(event.target) && !menuButton.contains(event.target)) {
              menuList.classList.add('hidden');
              menuIcon.setAttribute('name', 'menu');
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

      //event listener statistik mobil
      const dropdownMobil = shadow.querySelector('#dropdown-mobil');
      const dropdownMotor = shadow.querySelector('#dropdown-motor');

      dropdownMobil.addEventListener('click', (event) => {
          event.preventDefault(); 
          window.location.hash = '#stat-car';

          const content = document.getElementById('content');
          content.innerHTML = '';

          const statCarComponent = document.createElement('stat-car');
          content.appendChild(statCarComponent);
      });

      // event listener statistik motor
      dropdownMotor.addEventListener('click', (event) => {
          event.preventDefault(); 
          window.location.hash = '#stat-mot';

          const content = document.getElementById('content');
          content.innerHTML = '';

          const statMotComponent = document.createElement('stat-mot');
          content.appendChild(statMotComponent);
      });
  }
}

customElements.define('app-bar', appBar);
