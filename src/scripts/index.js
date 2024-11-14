import 'regenerator-runtime';
import '../styles/style.css';
import '../scripts/component/component.js';

const loadContent = () => {
    const hash = window.location.hash.split('/')[0];
    const content = document.getElementById('content');
    
    switch (hash) {
        case '#guest-car':
            content.innerHTML = '<guest-car></guest-car>';
            break;
            case '#guest-mot':
            content.innerHTML = '<guest-mot></guest-mot>';
            break;
        case '#guest-data':
            content.innerHTML = '<guest-data></guest-data>';
            break;
        case '#input-cof':
            content.innerHTML = '<input-cof></input-cof>';
            break;
        case '#check-out':
            content.innerHTML = '<check-out></check-out>';
            break;
        case '#stat-mot':
            content.innerHTML = '<stat-mot></stat-mot>';
            break;
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