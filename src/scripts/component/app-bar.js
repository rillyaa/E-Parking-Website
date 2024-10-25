class appBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const nav = document.createElement('nav');
    nav.innerHTML = `
      <div class="logo">
        <img src="/img/logo-polda.png" alt="logo-polda">
        <img src="/img/logo_bid-tik.png" alt="logo-bid-tik">
      </div>

      <div class="menu">
        <button id="menu-toggle"><box-icon name='menu' color='white'></box-icon></button>

        <ul id="menu-list" class="hidden">
          <li class="menu-item"><a href="#">Check-In</a></li>
          <li class="menu-item"><a href="check-out">Check-Out</a></li>
          <li class="menu-item"><a href="statistik">Statistik Parkir</a></li>
        </ul>
      </div>
    `;

    const style = document.createElement('style')
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
          padding-right: 20px;
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
          display: inline-block;
          margin-right: 20px;
        }

        .menu ul li a {
          color: white;
          font-size: 18px;
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

    // Append the nav to the shadow DOM
    shadow.appendChild(nav);
    shadow.appendChild(style);

    // Add event listener for the menu toggle
    const menuButton = shadow.querySelector('#menu-toggle');
    const menuList = shadow.querySelector('#menu-list');
    
    menuButton.addEventListener('click', () => {
      menuList.classList.toggle('hidden');
    });
  }
}

customElements.define('app-bar', appBar);