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
    this.mapContainer = document.querySelector('#map');
    this._storyList = document.querySelector('#story-list');


    const presenter = new HomePresenter({ view: this });
    await presenter.init();
  }

  showStories(stories) {
  this._storyList.innerHTML = '';

  stories.forEach((story) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="story-image-container">
        <img src="${story.photoUrl}" alt="Foto dari ${story.name}" width="100">
      </div>
      <div class="story-content">
        <p><strong>${story.name}</strong></p>
        <p>${story.description}</p>
        <p>${new Date(story.createdAt).toLocaleDateString()}</p>
        <button class="fav-btn" data-id="${story.id}">❤️ Favorit</button>
      </div>
    `;
    this._storyList.appendChild(li);
  });

  this._storyList.querySelectorAll('.fav-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      const story = stories.find((s) => s.id === id);
      if (story) {
        await this._presenter.addFavorite(story);
        alert('✅ Disimpan ke favorit!');
      }
    });
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
