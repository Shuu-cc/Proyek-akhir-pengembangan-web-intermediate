import { loginUser } from '../../data/api.js';
import PushHelper from '../../utils/push-helper.js';

class LoginPresenter {
  constructor({ view }) {
    this._view = view;
  }

  async login({ email, password }) {
    try {
      const data = await loginUser({ email, password });
      const { token, name } = data.loginResult;

      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      
      this._view.onLoginSuccess({ token, name });
      try {
      const subRes = await PushHelper.subscribe('BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk', token);
      console.log('📲 Push subscribed:', subRes);
      }  catch (err) {
      console.warn('❌ Gagal subscribe push:', err);
        }
      } catch (err) {
      this._view.showMessage(`❌ ${err.message}`, true);
    }
  }
}

export default LoginPresenter; 
