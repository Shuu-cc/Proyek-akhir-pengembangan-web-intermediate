import LoginPresenter from './login-presenter.js';

class LoginPage {
  async render() {
    return `
      <section class="login">
        <h2>Masuk</h2>
        <form id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Email" required />

          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password" required />

          <button type="submit">Login</button>
        </form>
        <div id="login-message"></div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.querySelector('#login-form');
    const msg = document.querySelector('#login-message');

    const presenter = new LoginPresenter({
      view: {
        showMessage(message, isError = false) {
          msg.textContent = message;
          msg.style.color = isError ? 'red' : 'green';
        },

        onLoginSuccess({ token, name }) {
          console.log('✅ Token diterima:', token);
          localStorage.setItem('token', token);
          localStorage.setItem('name', name);

          const verify = localStorage.getItem('token');
          console.log('📦 Token disimpan ke localStorage:', verify);

          if (!verify) {
            alert('❌ Gagal menyimpan token. Silakan ulangi login.');
            return;
          }

          setTimeout(() => {
            window.location.hash = '#/';
          }, 1000);
        },
      },
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.querySelector('#email').value.trim();
      const password = form.querySelector('#password').value.trim();

      await presenter.login({ email, password });
    });
  }
}

export default LoginPage;
