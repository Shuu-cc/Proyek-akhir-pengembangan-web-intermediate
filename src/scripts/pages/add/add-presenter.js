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
    this._view.onBack(() => {
      this._stopCamera();
      this._view.navigateToHome();
  });

    this._view.initMap((lat, lon) => {
      this._view.updateLatLon(lat.toFixed(6), lon.toFixed(6));
    });

     window.addEventListener('hashchange', this._stopCamera.bind(this));
  }

  async _startCamera() {
    try {
      if (this._stream) {
        this._stream.getTracks().forEach((t) => t.stop());
        this._stream = null;
      }
      this._stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this._view.showCamera(this._stream);
    } catch (err) {
      this._view.showError(`❌ Gagal akses kamera: ${err.message}`);
    }
  }

  async _capturePhoto() {
    this._photoBlob = await this._view.captureImage();
    this._view.hideCamera();
    this._stopCamera();
  }

  async _handleSubmit({ description, file, lat, lon }) {
    const photo = this._photoBlob || file;
    if (!description || !photo) {
      this._view.showError('❗ Deskripsi dan foto wajib diisi!');
      return;
    }

    try {
      await this._model.submitStory({ description, photo, lat, lon });
      this._view.onStorySuccess(); 
    } catch (err) {
      this._view.showError(`❌ ${err.message}`);
    }
  }
  _stopCamera() {
    if (this._stream) {
      this._stream.getTracks().forEach((t) => t.stop());
      this._stream = null;
    }
  }
  destroy() {
    this._stopCamera();
  }
}

export default AddPresenter;


