import RegisterPresenter from './register-presenter.js';

class RegisterPage {
  async render() {
    return `
      <section class="register">
        <h2>Daftar Akun</h2>
        <form id="register-form">
          <label for="name">Nama Lengkap</label>
          <input type="text" id="name" placeholder="Nama Lengkap" required />

          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Email" required />

          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password (min 8 karakter)" required />
          
          <button type="submit">Daftar</button>
        </form>
        <div id="register-message"></div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.querySelector('#register-form');
    const msg = document.querySelector('#register-message');

    const presenter = new RegisterPresenter({
      view: {
        showMessage(message, isError = false) {
          msg.textContent = message;
          msg.style.color = isError ? 'red' : 'green';
        },
        onRegisterSuccess() {
          msg.textContent = '✅ Pendaftaran berhasil! Mengarahkan ke login...';
          msg.style.color = 'green';
          setTimeout(() => {
            window.location.hash = '#/login';
          }, 1500);
        },
      },
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const password = form.querySelector('#password').value.trim();

      await presenter.register({ name, email, password });
    });
  }
}

export default RegisterPage;
