// CSS imports
import '../styles/styles.css';

import App from './pages/app.js';


document.addEventListener('DOMContentLoaded', () => {
  App.init();
  const toLogin = document.getElementById('to-login');
  const toRegister = document.getElementById('to-register');
  const logoutBtn = document.getElementById('logout');
  const isLoggedIn = !!localStorage.getItem('token');


  if (isLoggedIn) {
    toLogin.style.display = 'none';
    toRegister.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    logoutBtn.style.display = 'none';
  }


  if (toLogin) {
    toLogin.addEventListener('click', () => {
      window.location.hash = '#/login';
    });
  }

  if (toRegister) {
    toRegister.addEventListener('click', () => {
      window.location.hash = '#/register';
    });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert('Logout berhasil!');
      window.location.hash = '#/login';
      window.location.reload(); 
    });
  }
  }

  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('✅ SW registered'))
      .catch((err) => console.error('❌ SW failed', err));
  });
}
});

