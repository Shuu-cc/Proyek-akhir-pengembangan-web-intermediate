import AddPresenter from './add-presenter.js';
import SelectLocationMap from '../../components/map/select-location-map.js';
import AddModel from './add-model.js';

class AddPage {
  async render() {
    return `
      <section class="add">
        <h2>Tambah Cerita</h2>
        <button id="back-home" style="margin-bottom: 10px;">⬅ Kembali ke Beranda</button>

        <form id="add-form" enctype="multipart/form-data">
          <label for="description">Deskripsi</label>
          <textarea id="description" placeholder="Deskripsi cerita..." required></textarea>

          <label for="photo">Unggah Foto</label>
          <input type="file" id="photo" accept="image/*" />

          <small>Pilih file dari galeri atau gunakan kamera di bawah.</small>

          <button type="button" id="start-camera" style="background:goldenrod;color:white;margin-top:5px;">Aktifkan Kamera</button>
          <video id="camera" autoplay playsinline width="300" style="display:none;margin-top:10px;"></video>

          <button type="button" id="capture" style="display:none;margin-top:5px;">📸 Ambil Gambar</button>
          <canvas id="preview" width="300" style="display:none;"></canvas>

          <label for="latitude">Latitude (opsional)</label>
          <input type="text" id="latitude" readonly />

          <label for="longitude">Longitude (opsional)</label>
          <input type="text" id="longitude" readonly />

          <div id="map" style="height: 300px; margin-top: 10px;"></div>

          <button type="submit" style="background:#007bff;color:white;margin-top:10px;">Tambah Story</button>
        </form>

        <div id="message" style="margin-top: 10px;"></div>
      </section>
    `;
  }

  async afterRender() {
    this._bindElements();
    this._presenter = new AddPresenter({ view: this, model: new AddModel() });
    await this._presenter.init();
  }

  
  destroy() {
    this._presenter?.destroy();
  }

  _bindElements() {
    this.form = document.querySelector('#add-form');
    this.message = document.querySelector('#message');
    this.description = document.querySelector('#description');
    this.photoInput = document.querySelector('#photo');
    this.latInput = document.querySelector('#latitude');
    this.lonInput = document.querySelector('#longitude');
    this.mapContainer = document.querySelector('#map');
    this.cameraBtn = document.querySelector('#start-camera');
    this.captureBtn = document.querySelector('#capture');
    this.video = document.querySelector('#camera');
    this.canvas = document.querySelector('#preview');
    this.backBtn = document.querySelector('#back-home');
  }


  onClickCamera(callback) {
    this.cameraBtn.addEventListener('click', callback);
  }

  onClickCapture(callback) {
    this.captureBtn.addEventListener('click', callback);
  }

  onSubmit(callback) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback({
        description: this.description.value.trim(),
        file: this.photoInput.files[0],
        lat: this.latInput.value,
        lon: this.lonInput.value,
      });
    });
  }

  onBack(callback) {
    this.backBtn.addEventListener('click', callback);
  }

  initMap(onPick) {
    SelectLocationMap.render(this.mapContainer, onPick);
  }

  updateLatLon(lat, lon) {
    this.latInput.value = lat;
    this.lonInput.value = lon;
  }

    showError(text) {
    this.message.textContent = text;
    this.message.style.color = 'red';
  }

  onStorySuccess() {
    this.message.textContent = '✅ Story berhasil ditambahkan!';
    this.message.style.color = 'green';
    setTimeout(() => {
      this.navigateToHome();
    }, 1000);
  }

  navigateToHome() {
    window.location.hash = '#/';
  }


  showCamera(stream) {
    this.video.srcObject = stream;
    this.video.style.display = 'block';
    this.captureBtn.style.display = 'inline-block';
  }

  hideCamera() {
    this.video.style.display = 'none';
  }

  captureImage() {
    this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.display = 'block';
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
    });
  }

  showMessage(text, isError = false) {
    this.message.textContent = text;
    this.message.style.color = isError ? 'red' : 'green';
  }
}


export default AddPage;
