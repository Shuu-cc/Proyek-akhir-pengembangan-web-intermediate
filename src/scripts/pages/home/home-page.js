import HomePresenter from './home-presenter.js';
import MapView from '../../components/map/map-view.js';


class HomePage {
  async render() {
    return `
      <section class="home">
        <h2>Daftar Cerita</h2>
        <ul id="story-list"></ul>
        <div id="map" style="height: 500px; margin-top: 20px;"></div>
      </section>
    `;
  }

  async afterRender() {
    this.storyListContainer = document.querySelector('#story-list');
    this.mapContainer = document.querySelector('#map');

    const presenter = new HomePresenter({ view: this });
    await presenter.init();
  }

  showStories(stories) {
    this.storyListContainer.innerHTML = '';

    stories.forEach((story) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="story-image-container">
          <img src="${story.photoUrl}" alt="Foto dari cerita oleh ${story.name}" width="100">
        </div>
        <div class="story-content">
          <p><strong>Nama:</strong> ${story.name}</p>
          <p><strong>Deskripsi:</strong> ${story.description}</p>
          <p><strong>Tanggal:</strong> ${new Date(story.createdAt).toLocaleDateString()}</p>
        </div>
      `;
      this.storyListContainer.appendChild(li);
    });
  }

  showMap(stories) {
    MapView.render(this.mapContainer, stories);
  }

  showError(message) {
    this.storyListContainer.innerHTML = `<p class="error">❌ ${message}</p>`;
  }

  showEmptyMessage() {
    this.storyListContainer.innerHTML = `<p>Tidak ada cerita ditemukan.</p>`;
  }
}

export default HomePage;
