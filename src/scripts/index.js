import 'regenerator-runtime';
import '../styles/style.css';
import '../scripts/component/component.js';

const loadContent = () => {
    const hash = window.location.hash.split('/')[0];
    const content = document.getElementById('content');
    
    switch (hash) {
        case '#stat-car':
            content.innerHTML = '<stat-car></stat-car>';
            break;
        case '#check-in':
            content.innerHTML = '<check-in></check-in>';
            break;
        default:
            content.innerHTML = '<input-form></input-form>';
            break;
    }
};

// Listener untuk perubahan hash
window.addEventListener('hashchange', loadContent);

// Load konten pertama kali
window.addEventListener('DOMContentLoaded', loadContent);