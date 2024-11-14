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

              <div class="navbar">
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
                          <a href="#" class="dropdown-toggle">Data Pengunjung</a>
                          <ul class="dropdown-menu hidden">
                              <li><a href="#visit-car" class="dropdown-item" id="pengunjung-mobil">Pengunjung Mobil</a></li>
                              <li><a href="#visit-mot" class="dropdown-item" id="pengunjung-motor">Pengunjung Motor</a></li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      `;

      const style = document.createElement('style');
      style.textContent = `
          /* Base Styles */
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    width: 100%;
    // background-color: #333;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo img {
    height: 76px;
    cursor: pointer;
}

/* Menu Container */
.menu {
    margin-right: 70px;
    position: relative;
    z-index: 1;
}

/* Horizontal Menu for Desktop */
.navbar ul {
    display: flex;
    gap: 20px;
    list-style: none;
}

/* Menu Items */
.menu-item {
    position: relative;
}

.menu-item a {
    color: white;
    font-size: 18px;
    text-decoration: none;
}


/* More Specific - Overrides the above */
nav .dropdown-menu {
    display: none; 
} 

/* Initially hide the dropdown menu */
.dropdown-menu {
    display: none;  /* This will make it hidden by default */
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #333;
    padding: 10px 0;
    list-style: none;
    min-width: 150px;
    z-index: 1000;
    border-radius: 15px;
}

/* Show the dropdown on hover */
.menu-item.dropdown:hover .dropdown-menu,
.menu-item.dropdown.active .dropdown-menu {
    display: block; /* This will display the dropdown when hovered or clicked */
}


.dropdown-menu .dropdown-item {
    padding: 8px 20px;
    color: white;
    white-space: nowrap; /* Prevent text wrapping */
}

.dropdown-item {
    padding: 8px 20px;
    color: white;
}

.dropdown-item:hover {
    background-color: #444;
}

/* Mobile Menu Button */
#menu-toggle {
    display: none;
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    /* Show the menu button on mobile */
    #menu-toggle {
        display: block;
        font-size: 24px;
        color: white;
        background: none;
        border: none;
    }

    /* Hide the horizontal menu by default */
    .menu ul {
        display: none;
        flex-direction: column;
        background-color: #333;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        padding: 10px 0;
        z-index: 1000;
    }

    /* Show the menu vertically when toggled */
    .menu ul.visible {
        display: flex;
    }
}

/* Ensure menu items are clickable and have good spacing */
.menu-item a {
    padding: 5px 10px;
}

.menu-item a:hover {
    background-color: #444;
    border-radius: 15px;
}

/* Dropdown menu items spacing and hover effect */
.dropdown-menu .dropdown-item {
    padding: 10px 20px;
}

.dropdown-menu .dropdown-item:hover {
    background-color: #444;
    border-radius: 12px;
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
      // Dropdown toggle on hover and click
// Dropdown toggle on hover (use CSS for hover instead of JS)
const dropdown = shadow.querySelector('.dropdown');
const dropdownMenu = shadow.querySelector('.dropdown-menu');

// Hover functionality (CSS will handle this, no need for JS)
dropdown.addEventListener('mouseenter', () => {
    dropdownMenu.classList.remove('hidden'); // Show dropdown
});

dropdown.addEventListener('mouseleave', () => {
    dropdownMenu.classList.add('hidden'); // Hide dropdown
});

// Click functionality (toggle visibility)
dropdown.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents the click from propagating to document
    dropdownMenu.classList.toggle('hidden'); // Toggle visibility
    dropdown.classList.toggle('active'); // Optional, for styling when clicked
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
