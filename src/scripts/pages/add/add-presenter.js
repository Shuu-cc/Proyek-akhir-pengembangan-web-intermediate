
class AddPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    this._stream = null;
    this._photoBlob = null;
  }

  async init() {
    this._view.onClickCamera(this._startCamera.bind(this));
    this._view.onClickCapture(this._capturePhoto.bind(this));
    this._view.onSubmit(this._handleSubmit.bind(this));
    this._view.onBack(() => window.location.hash = '#/');

    this._view.initMap((lat, lon) => {
      this._view.updateLatLon(lat.toFixed(6), lon.toFixed(6));
    });
  }

  async _startCamera() {
    try {
      this._stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this._view.showCamera(this._stream);
    } catch (err) {
      this._view.showMessage(`❌ Gagal akses kamera: ${err.message}`, true);
    }
  }

  async _capturePhoto() {
    this._photoBlob = await this._view.captureImage();
    this._view.hideCamera();
    if (this._stream) this._stream.getTracks().forEach(t => t.stop());
  }

  async _handleSubmit({ description, file, lat, lon }) {
    const photo = this._photoBlob || file;
    if (!description || !photo) {
      this._view.showMessage('❗ Deskripsi dan foto wajib diisi!', true);
      return;
    }

    try {
      await this._model.submitStory({ description, photo, lat, lon });
      this._view.showMessage('✅ Story berhasil ditambahkan!');
      setTimeout(() => (window.location.hash = '#/'), 1500);
    } catch (err) {
      this._view.showMessage(`❌ ${err.message}`, true);
    }
  }
}

export default AddPresenter;


