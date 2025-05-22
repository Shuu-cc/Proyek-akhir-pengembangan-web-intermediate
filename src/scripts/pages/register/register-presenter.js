import { registerUser } from '../../data/api.js';

class RegisterPresenter {
  constructor({ view }) {
    this._view = view;
  }

  async register({ name, email, password }) {
    try {
      if (password.length < 8) {
        this._view.showMessage('❗ Password minimal 8 karakter.', true);
        return;
      }

      const res = await registerUser({ name, email, password });
      this._view.showMessage(`✅ ${res.message}`);
      this._view.onRegisterSuccess();
    } catch (err) {
      this._view.showMessage(`❌ ${err.message}`, true);
    }
  }
}

export default RegisterPresenter;
