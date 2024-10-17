class appBar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const nav = document.createElement('nav');
      nav.innerHTML = `
        <style>
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
          }
  
          nav .logo {
            padding: 30px 0 0 40px;
          }
  
          nav .logo img {
            height: 78px;
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
        </style>
  
        <div class="logo">
          <img src="/img/logo-polda.png" alt="logo-polda">
          <img src="/img/logo_bid-tik.png" alt="logo-bid-tik">
        </div>
  
        <div class="menu">
          <button id="menu-toggle"><box-icon name='menu'></box-icon></button>
  
          <ul id="menu-list" class="hidden">
            <li class="menu-item"><a href="#">Check-In</a></li>
            <li class="menu-item"><a href="check-out">Check-Out</a></li>
            <li class="menu-item"><a href="statistik">Statistik Parkir</a></li>
          </ul>
        </div>
      `;
  
      // Append the nav to the shadow DOM
      shadow.appendChild(nav);
  
      // Add event listener for the menu toggle
      const menuButton = shadow.querySelector('#menu-toggle');
      const menuList = shadow.querySelector('#menu-list');
      
      menuButton.addEventListener('click', () => {
        menuList.classList.toggle('hidden');
      });
    }
  }
  
  customElements.define('app-bar', appBar);
  