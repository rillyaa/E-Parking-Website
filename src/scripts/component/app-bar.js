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
                            <ul class="dropdown-menu statistik-parkir hidden">
                                <li><a href="#stat-car" class="dropdown-item" id="dropdown-mobil">Mobil</a></li>
                                <li><a href="#stat-mot" class="dropdown-item" id="dropdown-motor">Motor</a></li>
                            </ul> 
                        </li>
                        <li class="menu-item dropdown">
                            <a href="#guest-data" class="dropdown-toggle">Data Pengunjung</a>
                            <ul class="dropdown-menu data-pengunjung hidden">
                                <li><a href="#guest-car" class="dropdown-item" id="pengunjung-mobil">Pengunjung Mobil</a></li>
                                <li><a href="#guest-mot" class="dropdown-item" id="pengunjung-motor">Pengunjung Motor</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
        /* Base Styles */

        .logo .menu{
            display: flex; 
        }

        nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 16px 20px;
        }

        .logo img {
            cursor: pointer;
            width: 12%;
            min-width: 48px;
            height: auto;
        }

        /* Menu Container */
        .menu {
            position: relative;
            display: flex;
            margin-right: 20px;
            padding: 16px 20px;
        }

        /* Horizontal Menu for Desktop */
        .navbar ul {
            display: flex;
            gap: 8px;
            list-style: none;
        }

        /* Menu Items */
        .menu-item {
            position: relative;
            white-space: nowrap;
        }

        .menu-item a {
            color: white;
            font-weight: 500;
            text-decoration: none;
            font-size: 1.7vw;
        }

        /* More Specific - Overrides the above */
        nav .dropdown-menu {
            display: none; 
        } 

        /* Initially hide the dropdown menu */
        .dropdown-menu {
            display: flex;
            position: absolute;
            background-color: #333;
            border-radius: 12px;
            white-space: nowrap;
            padding-left: 0;
        }

        .dropdown-menu.statistik-parkir {
            width: 10vw;
        }
        .dropdown-menu.statistik-parkir.hidden {
            display: none;
        }

        .dropdown-menu.data-pengunjung {
            width: 18vw;
        }

        .dropdown-menu li{
            text-align: center;
        }

        .dropdown-menu li a {
            font-weight: 500;
            border-radius: 12px;
        }

        .dropdown-menu .dropdown-item{
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        /* Show the dropdown on hover */
       .menu-item.dropdown:hover .dropdown-menu,
        .menu-item.dropdown.active .dropdown-menu {
            display: block;
        }

        .menu-item.dropdown .dropdown-menu {
            display: none;
        }

        .dropdown-item {
            padding: 1px 16px;
        }

        .dropdown-item:hover {
            boder-radius: 12px;
            background-color: #444;
        }

        /* Mobile Menu Button */
        #menu-toggle {
            display: none;
        }

        /* Mobile Styles */
        @media screen and (max-width: 576px){

        }

        @media screen and (max-width: 768px) {
            .menu {
	            margin-right: 88px;
            }
            /* Show the menu button on mobile */
            #menu-toggle {
                display: block;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 24px;
                position: relative;
                left: 64px;
            }

            .navbar {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100px;
                background-color: #333;
                z-index: 1000;
                padding: 10px 0;
                max-height: 300px;
            }

            .navbar.visible {
                display: contents; 
            }

            #menu-list{
                right: -12vw;
                top: 40px;
                position: absolute;
                background-color: #000;
                height: auto;
                border-radius: 12px;
                transform: translateX(-40px);
            }

            .menu-item {
                width: 100%;
                white-text: no-wrap;
            }

            .menu-item a{
                padding: 10px;
                text-align: center;
                display: block;
                font-size: 2.3vw;
            }

            .dropdown-menu {
                position: relative;
            }

            .dropdown-menu.statistik-parkir {
                width: 16vw;
            }

            .dropdown-menu.data-pengunjung {
                width: 32vw;
            }

            .dropdown-menu li {
                text-align: left; /* Rata kiri teks dalam dropdown */
            }

            .navbar ul{
                display: none;
            }

            .navbar.visible ul {
                display: flex;
            }

            /* Hide the horizontal menu by default */
            .menu ul {
                display: none;
                flex-direction: column;
                position: absolute;
                left: 0;
                padding: 10px 0;
                z-index: 1000;
            }

            .hidden {
                display: none;
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
            border-radius: 12px;
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
            // Toggle kelas 'visible' pada navbar
            const navbar = shadow.querySelector('.navbar');
            navbar.classList.toggle('visible');

            // Ganti ikon
            if (navbar.classList.contains('visible')) {
                menuIcon.setAttribute('name', 'x'); // Ganti ikon menjadi 'x' saat menu terbuka
            } else {
                menuIcon.setAttribute('name', 'menu'); // Ganti ikon kembali menjadi 'menu' saat menu tertutup
            }
        });

        // Menutup menu saat klik di luar
        document.addEventListener('click', (event) => {
            if (!menuList.contains(event.target) && !menuButton.contains(event.target)) {
                menuList.classList.add('hidden');
                menuIcon.setAttribute('name', 'menu');
            }
        });

        // Dropdown toggle on hover
        // Dropdown toggle on hover and click
        // Dropdown toggle on hover (use CSS for hover instead of JS)
        const dropdown = shadow.querySelectorAll('.dropdown');
        const dropdownMenu = shadow.querySelectorAll('.dropdown-menu');

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
